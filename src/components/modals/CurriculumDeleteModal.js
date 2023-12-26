export default function CurriculumDeleteModal({ handleDeleteCurriculum }) {
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
    return (
        <>
            {/* Popup Confirm Delete Curriculum Modal */}
            <div
                className="modal fade"
                id="delete-curriculum-modal"
                tabIndex="-1"
                aria-labelledby="curriculumModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger" id="curriculumModalLabel">
                                Xóa chương bài học
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">Bạn có chắc chắn muốn xóa chương này không?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Hủy
                            </button>
                            <button
                                id="btn-delete-curriculum"
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
