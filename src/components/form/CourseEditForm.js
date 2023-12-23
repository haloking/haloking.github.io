import { useState } from 'react';

import ImageUpload from './ImageUpload';
import FileTxtUpload from './FileTxtUpload';
import FileAudioUpload from './FileAudioUpload';
import FileHtmlProcess from './FileHtmlProcess';

import CurrencyInput from 'react-currency-input-field';
import LessonEditModal from '../modals/LessonEditModal';
import CurriculumEditModal from '../modals/CurriculumEditModal';
import LessonDeleteModal from '../modals/LessonDeleteModal';
import CurriculumDeleteModal from '../modals/CurriculumDeleteModal';

import { BsPencilSquare } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { BsPlusSquareDotted } from 'react-icons/bs';

import toast from 'react-hot-toast';
import axios from 'axios';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

import { useAuth } from '../../context/auth';

import { useNavigate } from 'react-router-dom';

export default function CourseEditForm({ curriculums, setCurriculums, course, setCourse }) {
    const navigate = useNavigate();

    // state for add new curricumlum
    const [curriculum, setCurriculum] = useState({
        title: '',
    });

    // context
    const [auth, setAuth] = useAuth();

    // submit form
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            setCourse({ ...course, loading: true });

            // const courseData = course;
            // courseData.curriculumsSlug = [];

            // curriculums?.map((curriculum, index) => {
            //     courseData.curriculumsSlug.push(curriculum.slug);
            // });

            const { data } = await axios.put('/course', { objs: [course, curriculums] });

            if (data?.error) {
                toast.error(data.error);
                setCourse({ ...course, loading: false });
            } else {
                // data {user, course}
                // update user in context
                setAuth({ ...auth, user: data.user });

                // update user in local storage
                const fromLS = JSON.parse(localStorage.getItem('auth'));
                fromLS.user = data.user;
                localStorage.setItem('auth', JSON.stringify(fromLS));

                // remove curriculums in local storage
                localStorage.removeItem('curriculums');

                toast.success('Course created successfully');
                setCourse({ ...course, loading: false });

                // reload page on redirect
                // window.location.href = '/dashboard';
                window.location.href = '/user/posted-courses';
            }
        } catch (err) {
            console.log(err);
            setCourse({ ...course, loading: false });
        }
    };

    // Thêm chương mục
    const handleAddSection = () => {
        setCurriculums((prev) => {
            const newCurriculum = curriculum;
            newCurriculum.lessons = [];
            newCurriculum.lessonsSlug = [];
            newCurriculum.slug = slugify(`${newCurriculum.title}-${nanoid(6)}`, { lower: true });

            const newCurriculums = [...prev, newCurriculum];
            // save to local storage
            const jsonCurriculums = JSON.stringify(newCurriculums);
            localStorage.setItem('curriculums', jsonCurriculums);
            setCurriculum({ ...curriculum, title: '' });
            return newCurriculums;
        });
    };

    // Thêm bài học mới vào chương mục
    const handleAddLesson = (slug) => {
        setCurriculums((prev) => {
            // get position of the clicked curriculum based on the slug of the curriculum
            const index = curriculums.findIndex((c) => c.slug === slug);
            // create a new object of lesson
            const title = 'New Lecture';
            const slugLesson = slugify(`${title}-${nanoid(10)}`, { lower: true });
            const newLesson = {
                title,
                slug: slugLesson,
            };
            // add new lesson to the lessons array of the clicked curriculum
            // const newCurriculum = prev[index];
            // newCurriculum.lessons.push(newLesson);
            // const newCurriculums = [...prev];
            // newCurriculums[index] = newCurriculum;
            const newCurriculums = [...prev];
            newCurriculums[index].lessons.push(newLesson);
            newCurriculums[index].lessonsSlug.push(slugLesson);
            // save to local storage
            const jsonCurriculums = JSON.stringify(newCurriculums);
            localStorage.setItem('curriculums', jsonCurriculums);
            return newCurriculums;
        });
    };

    // Xóa chương mục
    const handleDeleteCurriculum = (index) => {
        setCurriculums((prev) => {
            const newCurriculums = [...prev];
            newCurriculums.splice(index, 1);

            // save to local storage
            const jsonCurriculums = JSON.stringify(newCurriculums);
            localStorage.setItem('curriculums', jsonCurriculums);

            return newCurriculums;
        });
    };

    // Xóa bài học khỏi chương mục
    const handleDeleteLesson = (slug, indexLesson) => {
        setCurriculums((prev) => {
            // get position of the clicked curriculum based on the slug of the curriculum
            const index = curriculums.findIndex((c) => c.slug === slug);

            const newCurriculums = [...prev];
            newCurriculums[index].lessons.splice(indexLesson, 1);

            // save to local storage
            const jsonCurriculums = JSON.stringify(newCurriculums);
            localStorage.setItem('curriculums', jsonCurriculums);

            return newCurriculums;
        });
    };

    // Sửa bài học trong chương mục
    const handleEditLesson = (slug, indexLesson, updatedTitle) => {
        setCurriculums((prev) => {
            // get position of the clicked curriculum based on the slug of the curriculum
            const index = curriculums.findIndex((c) => c.slug === slug);

            const newCurriculums = [...prev];
            newCurriculums[index].lessons[indexLesson].title = updatedTitle;
            const updatedSlug = slugify(`${updatedTitle}-${nanoid(10)}`, { lower: true });
            newCurriculums[index].lessons[indexLesson].slug = updatedSlug;

            newCurriculums[index].lessonsSlug[indexLesson] = updatedSlug;

            console.log('Updated title: ', updatedTitle);

            // save to local storage
            const jsonCurriculums = JSON.stringify(newCurriculums);
            localStorage.setItem('curriculums', jsonCurriculums);

            return newCurriculums;
        });
    };

    // Sửa chương mục
    const handleEditCurriculum = (index, updatedTitle) => {
        setCurriculums((prev) => {
            // get position of the clicked curriculum based on the slug of the curriculum
            // const index = curriculums.findIndex((c) => c.slug === slug);

            const newCurriculums = [...prev];
            newCurriculums[index].title = updatedTitle;
            newCurriculums[index].slug = slugify(`${updatedTitle}-${nanoid(6)}`, { lower: true });

            console.log('Updated title: ', updatedTitle);

            // save to local storage
            const jsonCurriculums = JSON.stringify(newCurriculums);
            localStorage.setItem('curriculums', jsonCurriculums);

            return newCurriculums;
        });
    };

    // handle delete curriculum modal
    const deleteCurriculumModal = document.getElementById('delete-curriculum-modal');
    const btnDeleteCurriculum = document.getElementById('btn-delete-curriculum');

    if (deleteCurriculumModal) {
        deleteCurriculumModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            const index = button.getAttribute('data-bs-id');

            btnDeleteCurriculum.onclick = function () {
                console.log(index);

                handleDeleteCurriculum(index);
            };
        });
    }

    // handle edit curriculum modal
    const editCurriculumModal = document.getElementById('edit-curriculum-modal');
    const btnEditCurriculum = document.getElementById('btn-edit-curriculum');

    const inputUpdatedCurriculumTitle = document.getElementById('curriculum-name');

    if (editCurriculumModal) {
        editCurriculumModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            const index = button.getAttribute('data-bs-id');

            const currentTitle = button.getAttribute('current-title');

            editCurriculumModal.addEventListener('hide.bs.modal', function (event) {
                const updatedTitle = inputUpdatedCurriculumTitle.getAttribute('value');

                btnEditCurriculum.onclick = function () {
                    console.log(index);
                    console.log('Current title: ', currentTitle);
                    console.log('Updated title: ', updatedTitle);

                    handleEditCurriculum(index, updatedTitle);
                };
            });
        });
    }

    // handle delete lesson modal
    const deleteLessonModal = document.getElementById('delete-lesson-modal');
    const btnDeleteLesson = document.getElementById('btn-delete-lesson');

    if (deleteLessonModal) {
        deleteLessonModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            const slug = button.getAttribute('data-bs-id');
            const indexLesson = button.getAttribute('index');

            btnDeleteLesson.onclick = function () {
                console.log(slug);
                console.log(indexLesson);

                handleDeleteLesson(slug, indexLesson);
            };
        });
    }

    // handle edit lesson modal
    const editLessonModal = document.getElementById('edit-lesson-modal');
    const btnEditLesson = document.getElementById('btn-edit-lesson');

    const inputUpdatedTitle = document.getElementById('lesson-name');

    if (editLessonModal) {
        editLessonModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            const slug = button.getAttribute('data-bs-id');
            const indexLesson = button.getAttribute('index');
            const currentTitle = button.getAttribute('current-title');

            editLessonModal.addEventListener('hide.bs.modal', function (event) {
                const updatedTitle = inputUpdatedTitle.getAttribute('value');

                btnEditLesson.onclick = function () {
                    console.log(slug);
                    console.log(indexLesson);
                    console.log('Current title: ', currentTitle);
                    console.log('Updated title: ', updatedTitle);

                    handleEditLesson(slug, indexLesson, updatedTitle);
                };
            });
        });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4">
                    <div className="mb-3 form-control">
                        <ImageUpload course={course} setCourse={setCourse} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter course title"
                        value={course.title}
                        onChange={(e) =>
                            setCourse({
                                ...course,
                                title: e.target.value,
                                slug: slugify(`${e.target.value}-${nanoid(6)}`, { lower: true }),
                            })
                        }
                        required
                    />

                    <textarea
                        className="form-control mb-3"
                        value={course.description}
                        placeholder="Write course description"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />

                    <textarea
                        className="form-control mb-3"
                        value={course.objective}
                        placeholder="Write learning objectives"
                        onChange={(e) => setCourse({ ...course, objective: e.target.value })}
                    />

                    <select className="form-select" aria-label="Default select example">
                        <option value="0">-- Chọn trình độ --</option>
                        <option value="1">Dễ</option>
                        <option value="2">Trung bình</option>
                        <option value="3">Khó</option>
                        <option value="4">Tất cả trình độ</option>
                    </select>

                    <select className="form-select" aria-label="Default select example">
                        <option value="0">-- Chọn lĩnh vực tổng quát --</option>
                        <option value="1">Tiếng Anh</option>
                        <option value="2">Toán</option>
                        <option value="3">Vật lý</option>
                        <option value="4">Hóa học</option>
                        <option value="5">Sinh học</option>
                        <option value="6">Văn học</option>
                    </select>

                    <select className="form-select" aria-label="Default select example">
                        <option value="0">-- Chọn lĩnh vực chuyên sâu --</option>
                        <option value="1">IELTS</option>
                        <option value="2">TOEIC</option>
                        <option value="3">TOEFL</option>
                    </select>

                    <div>
                        <CurrencyInput
                            placeholder="Enter price"
                            defaultValue={course.price}
                            className="form-control mb-3"
                            onValueChange={(value) => setCourse({ ...course, price: value })}
                        />
                    </div>

                    <button onClick={handleClick} className={`btn btn-primary ${course.loading ? 'disabled' : ''} `}>
                        {course.loading ? 'Đang lưu...' : 'Lưu lại'}
                    </button>
                </div>

                <div className="col-sm-8">
                    <h4 className="mt-3">Cấu trúc chương trình dạy học</h4>

                    {curriculums?.map((curriculum, index) => (
                        <div className="container bg-light mb-4 p-2" key={index}>
                            <h5>
                                {curriculum.title}
                                <a
                                    current-title={curriculum.title}
                                    className="btn btn-link"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit-curriculum-modal"
                                    data-bs-id={index}
                                >
                                    <BsPencilSquare />
                                </a>
                                <a
                                    className="btn btn-link"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete-curriculum-modal"
                                    data-bs-id={index}
                                >
                                    <BsTrash />
                                </a>
                            </h5>
                            {curriculum.lessons?.map((lesson, index) => (
                                <p key={index}>
                                    {lesson.title}
                                    <a
                                        index={index}
                                        current-title={lesson.title}
                                        className="btn btn-link"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-lesson-modal"
                                        data-bs-id={curriculum.slug}
                                    >
                                        <BsPencilSquare />
                                    </a>
                                    <a
                                        index={index}
                                        className="btn btn-link"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete-lesson-modal"
                                        data-bs-id={curriculum.slug}
                                    >
                                        <BsTrash />
                                    </a>
                                    <FileTxtUpload
                                        course={course}
                                        setCourse={setCourse}
                                        curriculums={curriculums}
                                        setCurriculums={setCurriculums}
                                        curriculumSlug={curriculum.slug}
                                        indexLesson={index}
                                    ></FileTxtUpload>
                                    <FileAudioUpload
                                        course={course}
                                        setCourse={setCourse}
                                        curriculums={curriculums}
                                        setCurriculums={setCurriculums}
                                        curriculumSlug={curriculum.slug}
                                        indexLesson={index}
                                    ></FileAudioUpload>
                                </p>
                            ))}
                            <BsPlusSquareDotted onClick={() => handleAddLesson(curriculum.slug)} />
                        </div>
                    ))}

                    {/* Add new curriculum */}
                    <div className="container">
                        <a onClick={handleAddSection} className="btn btn-light btn-sm">
                            Thêm chương mục
                        </a>
                        <input
                            value={curriculum.title}
                            onChange={(e) => setCurriculum({ ...curriculum, title: e.target.value })}
                        ></input>
                    </div>

                    {/* Popup Confirm Delete Curriculum Modal */}
                    <CurriculumDeleteModal></CurriculumDeleteModal>

                    {/* Popup Confirm Delete Lesson Modal */}
                    <LessonDeleteModal></LessonDeleteModal>

                    {/* Popup Edit Lesson Modal */}
                    <LessonEditModal></LessonEditModal>

                    {/* Popup Edit Curriculum Modal */}
                    <CurriculumEditModal></CurriculumEditModal>
                </div>

                {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
            </div>
        </div>
    );
}
