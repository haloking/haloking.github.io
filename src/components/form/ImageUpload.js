import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { Avatar } from 'antd';

export default function ImageUpload({ course, setCourse }) {
    const handleUpload = (e) => {
        let files = e.target.files;
        files = [...files];
        if (files?.length) {
            setCourse({ ...course, uploading: true });
            files.map((f) => {
                // upload
                new Promise((resolve) => {
                    Resizer.imageFileResizer(
                        f,
                        1080,
                        720,
                        'JPEG',
                        100,
                        0,
                        async (uri) => {
                            try {
                                const { data } = await axios.post('/upload-image', {
                                    image: uri,
                                });
                                console.log(data);
                                console.log(uri);

                                setCourse((prev) => ({
                                    ...prev,
                                    photos: [data, ...prev.photos],
                                    thumbnail: data.Location,
                                    uploading: false,
                                }));
                            } catch (err) {
                                console.log('photo upload err => ', err);
                                setCourse({ ...course, uploading: false });
                            }
                        },
                        'base64',
                    );
                });
            });
        } else {
            setCourse({ ...course, uploading: false });
        }
    };

    const handleDelete = async (file) => {
        const answer = window.confirm('Delete image?');
        if (!answer) return;
        setCourse({ ...course, removing: true });
        try {
            const { data } = await axios.post('/remove-image', file);
            if (data?.ok) {
                setCourse((prev) => ({
                    ...prev,
                    photos: prev.photos.filter((p) => p.Key !== file.Key),
                    removing: false,
                }));
            }
        } catch (err) {
            console.log(err);
            setCourse({ ...course, removing: false });
        }
    };

    return (
        <>
            <div className="d-flex mt-4">
                <label className="btn btn-secondary">
                    {course.uploading ? 'Uploading...' : course.removing ? 'Removing...' : 'Upload photos'}
                    <input
                        onChange={handleUpload}
                        type="file"
                        accept="image/*"
                        // multiple
                        hidden
                        disabled={course.uploading}
                    />
                </label>
                {course.photos?.map((photo, index) => (
                    <Avatar
                        key={index}
                        src={photo?.Location}
                        shape="square"
                        size={46}
                        className="mx-1"
                        onClick={() => handleDelete(photo)}
                    />
                ))}
            </div>
        </>
    );
}
