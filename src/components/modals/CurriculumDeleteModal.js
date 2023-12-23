export default function CurriculumDeleteModal() {
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
