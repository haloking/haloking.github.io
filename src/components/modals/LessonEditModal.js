import { useState } from 'react';

export default function LessonEditModal({ handleEditLesson }) {
    const [title, setTitle] = useState('');

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
        <>
            {/* Popup Edit Lesson Modal */}
            <div
                className="modal fade"
                id="edit-lesson-modal"
                tabIndex="-1"
                aria-labelledby="editLessonModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editLessonModalLabel">
                                Sửa tên bài học
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    {/* <label for="lesson-name" className="col-form-label">
                                        Bài học:
                                    </label> */}
                                    <input
                                        type="text"
                                        value={title}
                                        placeholder="Nhập tên bài học"
                                        className="form-control"
                                        id="lesson-name"
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy
                            </button>
                            <button
                                id="btn-edit-lesson"
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
