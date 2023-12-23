// import Resizer from 'react-image-file-resizer';
import axios from 'axios';
// import { Avatar } from 'antd';

import { BsFiletypeTxt } from 'react-icons/bs';

export default function FileTxtUpload({ course, setCourse, curriculums, setCurriculums, curriculumSlug, indexLesson }) {
    const handleUpload = async (e) => {
        // get the selected file from the input
        const file = e.target.files[0];
        console.log(e.target.files);

        if (file) {
            setCourse({ ...course, uploading: true });

            // create a new FormData object and append the file to it
            const formData = new FormData();
            formData.append('file', file);

            // config before posting
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            await axios
                .post('/upload-file-txt', formData, config)
                .then(({ data }) => {
                    // handle the response, data contains _id of the tapescript
                    console.log('tapescriptId:', data);

                    setCurriculums((prev) => {
                        // get position of the clicked curriculum based on the slug of the curriculum
                        const index = curriculums.findIndex((c) => c.slug === curriculumSlug);

                        const newCurriculums = [...prev];
                        newCurriculums[index].lessons[indexLesson].tapescript = data;

                        // save to local storage
                        const jsonCurriculums = JSON.stringify(newCurriculums);
                        localStorage.setItem('curriculums', jsonCurriculums);

                        return newCurriculums;
                    });
                    setCourse({ ...course, uploading: false });
                })
                .catch((err) => {
                    // handle errors
                    console.log('file upload err => ', err);
                    setCourse({ ...course, uploading: false });
                });

            // console.log(file);
            // console.log(file.name);
        } else {
            setCourse({ ...course, uploading: false });
        }
    };

    const handleDelete = async (file) => {};

    return (
        <label className="btn btn-link">
            {course.uploading ? 'Uploading...' : course.removing ? 'Removing...' : <BsFiletypeTxt />}
            <input onChange={handleUpload} type="file" accept=".txt" hidden disabled={course.uploading} />
        </label>
    );
}
