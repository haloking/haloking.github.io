import axios from 'axios';
import { Avatar } from 'antd';

import { BsFiletypeMp3 } from 'react-icons/bs';

export default function FileAudioUpload({
    course,
    setCourse,
    curriculums,
    setCurriculums,
    curriculumSlug,
    indexLesson,
}) {
    const handleUpload = async (e) => {
        // get the selected file from the input
        const file = e.target.files[0];
        console.log(file);

        if (file) {
            setCourse({ ...course, uploading: true });

            // create a new FormData object and append the file to it
            const formData = new FormData();
            formData.append('audiofile', file);

            // config before posting
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            await axios
                .post('/upload-file-audio', formData, config)
                .then(({ data }) => {
                    // handle the response, data contains url of the file
                    console.log(data);
                    console.log('url:', data.Location);

                    setCurriculums((prev) => {
                        // get position of the clicked curriculum based on the slug of the curriculum
                        const index = curriculums.findIndex((c) => c.slug === curriculumSlug);

                        // put url of audio file to lesson
                        const newCurriculums = [...prev];
                        newCurriculums[index].lessons[indexLesson].audio = data.Location;

                        // save to local storage
                        const jsonCurriculums = JSON.stringify(newCurriculums);
                        localStorage.setItem('curriculums', jsonCurriculums);

                        return newCurriculums;
                    });

                    setCourse({ ...course, uploading: false });
                })
                .catch((err) => {
                    // handle errors
                    console.log('audio file upload err => ', err);
                    setCourse({ ...course, uploading: false });
                });

            // console.log(file);
            // console.log(file.name);
        } else {
            setCourse({ ...course, uploading: false });
        }
    };

    // const handleDelete = async (file) => {
    //     const answer = window.confirm('Delete image?');
    //     if (!answer) return;
    //     setCourse({ ...course, removing: true });
    //     try {
    //         const { data } = await axios.post('/remove-image', file);
    //         if (data?.ok) {
    //             setCourse((prev) => ({
    //                 ...prev,
    //                 photos: prev.photos.filter((p) => p.Key !== file.Key),
    //                 removing: false,
    //             }));
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         setCourse({ ...course, removing: false });
    //     }
    // };

    return (
        <>
            <label className="btn btn-link">
                {course.uploading ? 'Uploading...' : course.removing ? 'Removing...' : <BsFiletypeMp3 />}
                <input
                    onChange={handleUpload}
                    type="file"
                    accept="audio/*"
                    // multiple
                    hidden
                    disabled={course.uploading}
                />
            </label>
            {/* {course.photos?.map((photo, index) => (
                    <Avatar
                        key={index}
                        src={photo?.Location}
                        shape="square"
                        size={46}
                        className="mx-1"
                        onClick={() => handleDelete(photo)}
                    />
                ))} */}
        </>
    );
}
