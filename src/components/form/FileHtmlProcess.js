import axios from 'axios';

import { BsFiletypeTxt } from 'react-icons/bs';

export default function FileHtmlProcess({ course, setCourse }) {
    const handleUpload = async (e) => {
        // get the selected file from the input
        const file = e.target.files[0];

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
                .post('/upload-file-html', formData, config)
                .then(({ data }) => {
                    // handle the response, data contains _id of the tapescript
                    console.log('Data:', data);

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

    return (
        <div className="form-control">
            <label className="btn btn-link">
                Select Html file to process into Txt file <BsFiletypeTxt />
                <input onChange={handleUpload} type="file" accept=".html" hidden disabled={course.uploading} />
            </label>
        </div>
    );
}
