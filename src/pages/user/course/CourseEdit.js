import { useEffect, useState } from 'react';
import Sidebar from '../../../components/nav/Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import CourseEditForm from '../../../components/form/CourseEditForm';

export default function CourseEdit() {
    // state
    const [course, setCourse] = useState({});
    const [curriculums, setCurriculums] = useState([]);

    // hooks
    const params = useParams();

    useEffect(() => {
        if (params?.slug) {
            fetchCourse();
            fetchCurriculums();
        }
    }, [params?.slug]);

    const fetchCourse = async () => {
        try {
            const { data } = await axios.get(`/course/${params.slug}`);
            // console.log(params.slug);
            console.log('course:', data);
            setCourse(data); // {course: {}, related: []}
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCurriculums = async () => {
        try {
            const { data } = await axios.get(`/course/curriculum/${params?.slug}`);
            console.log('curriculums:', data);

            setCurriculums(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className=" container-fluid default-top-margin">
            <Sidebar />
            <h1 className="display-1 bg-primary text-light p-5">Chỉnh sửa khóa học</h1>

            <CourseEditForm
                curriculums={curriculums}
                setCurriculums={setCurriculums}
                course={course}
                setCourse={setCourse}
            />

            {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        </div>
    );
}
