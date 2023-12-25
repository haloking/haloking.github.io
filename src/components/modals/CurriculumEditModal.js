import { useState } from 'react';

export default function CurriculumEditModal({ handleEditCurriculum }) {
    const [title, setTitle] = useState('');

    document.addEventListener('DOMContentLoaded', function () {
        const editCurriculumModal = document.getElementById('edit-curriculum-modal');
        const btnEditCurriculum = document.getElementById('btn-edit-curriculum');

        const inputUpdatedCurriculumTitle = document.getElementById('curriculum-name');
        console.log(editCurriculumModal);
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
    });

    return (
        <>
            {/* Popup Edit Curriculum Modal */}
            <div
                className="modal fade"
                id="edit-curriculum-modal"
                tabIndex="-1"
                aria-labelledby="editCurriculumModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editCurriculumModalLabel">
                                Sửa chương bài học
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
                                        placeholder="Nhập tên chương bài học"
                                        className="form-control"
                                        id="curriculum-name"
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
                                id="btn-edit-curriculum"
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
