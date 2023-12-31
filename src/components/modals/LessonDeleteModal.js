export default function LessonDeleteModal({ handleDeleteLesson }) {
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
    return (
        <>
            {/* Popup Confirm Delete Lesson Modal */}
            <div
                className="modal fade"
                id="delete-lesson-modal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger" id="exampleModalLabel">
                                Xóa bài học
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">Bạn có chắc chắn muốn xóa bài học này không?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy
                            </button>
                            <button
                                id="btn-delete-lesson"
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Xóa bỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
