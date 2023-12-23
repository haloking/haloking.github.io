import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CourseView() {
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

    return (
        <>
            <h1 className="default-top-margin display-1 bg-primary text-light p-5">{course.title} Landing Page</h1>
            <a href={`/learning/listening/${params?.slug}`}>Vào học bây giờ</a>
            {/* {params.slug} */}
        </>
    );
}
