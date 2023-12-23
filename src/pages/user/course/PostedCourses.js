import { useEffect, useState } from 'react';
import Sidebar from '../../../components/nav/Sidebar';
import axios from 'axios';
import CourseCard from '../../../components/cards/CourseCard';
import { useAuth } from '../../../context/auth';

export default function PostedCourses() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth?.token) fetchPostedCourses();
    }, [auth?.token]);

    const fetchPostedCourses = async () => {
        try {
            const { data } = await axios.get(`/posted-courses`);
            console.log('course:', data);
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
            <Sidebar></Sidebar>
            <h1 className="display-1 bg-primary text-light p-5">Khóa học đã đăng</h1>

            {!courses?.length ? (
                <div className="d-flex justify-content-center alin-items-center vh-100">
                    <h2>
                        Hello {auth.user?.name ? auth.user?.name : auth.user?.username}, <br></br>
                        You have not posted any courses yet!
                    </h2>
                </div>
            ) : (
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">STT</th>
                                <th scope="col">Tên khóa học</th>
                                <th scope="col">Trình độ</th>
                                <th scope="col">Thời gian tạo</th>
                                <th scope="col">Sửa</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses?.map((course, index) => (
                                <tr className="table-primary" key={index}>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="courseIds[]"
                                                value={course._id}
                                            />
                                        </div>
                                    </td>
                                    <th scope="row">{index}</th>
                                    <td>{course.title}</td>
                                    <td>{course.level}</td>
                                    <td>{course.createdAt}</td>
                                    <td>
                                        <a href={`/user/course/${course.slug}`}>Sửa</a>
                                    </td>
                                    <td>
                                        <a
                                            href=""
                                            data-bs-toggle="modal"
                                            data-bs-target="#delete-course-modal"
                                            data-bs-id="{{this._id}}"
                                        >
                                            Xóa
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Confirm Deleting Modal  */}
                    <div
                        className="modal fade"
                        id="delete-course-modal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-danger" id="exampleModalLabel">
                                        Xóa khóa học
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">Bạn có chắc chắn muốn xóa khóa học này không?</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Hủy
                                    </button>
                                    <button id="btn-delete-course" type="button" className="btn btn-danger">
                                        Xóa bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
