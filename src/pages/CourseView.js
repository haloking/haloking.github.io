import { useState, useEffect } from 'react';

import { useAuth } from '../context/auth';
import { useIsLearning } from '../context/isLearning';

import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseView() {
    // context
    const [isLearning, setIsLearning] = useIsLearning();

    // state
    const [course, setCourse] = useState({});

    // hooks
    const params = useParams();
    useEffect(() => {
        if (params?.slug) {
            fetchCourse();
        }
        // console.log(params?.slug);
    }, [params?.slug]);

    const fetchCourse = async () => {
        try {
            const { data } = await axios.get(`/course/${params?.slug}`);
            // console.log(data);

            setCourse(data);
        } catch (err) {
            console.log(err);
        }
    };

    // const handleLearing = () => {
    //     setIsLearning(true);
    //     localStorage.setItem('isLearning', JSON.stringify(true));
    // };

    return (
        <>
            <h1 className="default-top-margin display-1 bg-secondary text-light p-5">{course.title}</h1>
            <div className="container-fluid">
                <a className="btn btn-outline-primary rounded-pill mt-3" href={`/learning/listening/${params?.slug}`}>
                    Vào học ngay
                </a>
            </div>
            {/* {params.slug} */}
        </>
    );
}
