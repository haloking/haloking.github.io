import { useEffect, useState } from 'react';
import Sidebar from '../../../components/nav/Sidebar';
import axios from 'axios';
import CourseCard from '../../../components/cards/CourseCard';
import { useAuth } from '../../../context/auth';

export default function EnrolledCourses() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth?.token) fetchEnrolledCourses();
    }, [auth?.token]);

    const fetchEnrolledCourses = async () => {
        try {
            const { data } = await axios.get(`/enrolled-courses`);
            console.log(data);
            setCourses(data);
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
        <div className=" container-fluid default-top-margin">
            <Sidebar />
            <h1 className="display-1 bg-primary text-light p-5">Khóa học của tôi</h1>
            {!courses?.length ? (
                <div className="d-flex justify-content-center alin-items-center vh-100">
                    <h2>
                        Hello {auth.user?.name ? auth.user?.name : auth.user?.username}, <br></br>
                        You have not enrolled any courses yet!
                    </h2>
                </div>
            ) : (
                <>
                    <div className="container mt-2 text-center">
                        <h1>{courses.length} Enrolled courses</h1>
                    </div>

                    <div className="container">
                        <div className="row">
                            {courses?.map((course) => (
                                <CourseCard course={course} key={course._id} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
