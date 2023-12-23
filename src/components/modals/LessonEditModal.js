import { useState } from 'react';

export default function LessonEditModal() {
    const [title, setTitle] = useState('');

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
