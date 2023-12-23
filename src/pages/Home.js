import { useAuth } from '../context/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/cards/CourseCard';

export default function Home() {
    // context
    const [auth, setAuth] = useAuth();

    // state
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    const loggedIn = auth.user !== null && auth.token !== '';

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (auth?.token) fetchEnrolledCourses();
    }, [auth?.token]);

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('/courses');
            console.log('All courses:', data);
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const { data } = await axios.get(`/enrolled-courses`);
            console.log('Enrolled Courses:', data);
            setEnrolledCourses(data);
            if (data.length > 0) setIsEnrolled(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '-7%' }}>
                <div className="display-1">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="default-top-margin display-1 bg-primary text-light p-5">English Education for Everyone</h1>

            {loggedIn && isEnrolled ? (
                <>
                    <h3> Khóa học của tôi </h3>
                    <div>
                        <div className="row">
                            {enrolledCourses?.map((course) => (
                                <CourseCard course={course} key={course._id} />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}

            <h3> Các khóa học </h3>
            <div>
                <div className="row">
                    {courses?.map((course) => (
                        <CourseCard course={course} key={course._id} />
                    ))}
                </div>
            </div>

            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        </div>
    );
}
