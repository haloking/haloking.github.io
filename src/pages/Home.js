import { useAuth } from '../context/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/cards/CourseCard';
import Slider from '../components/sliders/slider';

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
        <div className="container-fluid px-0">
            {/* <h1 className="default-top-margin display-1 text-secondary p-5">English Education for Everyone</h1> */}
            <h1 className="default-top-margin text-center text-lg-start pt-4 pb-3 ms-lg-5 display-3 text-secondary fw-bolder">
                English Education for Everyone
            </h1>

            <div className="d-flex justify-content-center justify-content-lg-start ms-lg-5">
                <button className="btn btn-primary btn-custom rounded-pill mb-5">Tìm hiểu</button>
            </div>

            <Slider></Slider>

            {loggedIn && isEnrolled ? (
                <>
                    <h2> Khóa học của tôi </h2>
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
            <h2 className="text-center text-lg-start pt-4 pb-3 ms-lg-5 display-5 fw-bolder" id="posted-courses">
                Các khóa học
            </h2>
            {/* <h1 className="display-4 fw-bolder text-center text-lg-start">Các khóa học</h1> */}

            <div>
                <div className="container row">
                    {courses?.map((course) => (
                        <CourseCard course={course} key={course._id} />
                    ))}
                </div>
            </div>

            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        </div>
    );
}
