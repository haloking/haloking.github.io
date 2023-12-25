import Sidebar from '../../../components/nav/Sidebar';
import CourseForm from '../../../components/form/CourseForm';

export default function CourseCreate() {
    return (
        <div className=" container-fluid default-top-margin">
            <Sidebar></Sidebar>
            <h1 className="display-1 bg-primary text-light p-5">Tạo Khóa học</h1>
            <div className="container mt-2">
                <CourseForm />
            </div>
        </div>
    );
}
