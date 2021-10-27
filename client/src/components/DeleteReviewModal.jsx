import React from 'react';
import '../styles/Mypage/DeleteReviewModal.scss';

function DeleteReviewModal({ openDeleteHandler }) {
  return (
    <div
      className="modal_wrapper"
      onClick={openDeleteHandler}
      aria-hidden="true"
    >
      <div
        className="modal_contents"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <span>리뷰를 삭제하시겠습니까?</span>
        <p>한번 삭제한 리뷰는 되돌릴 수 없습니다</p>
        <div className="buttons_container">
          <button
            className="no"
            type="button"
            onClick={openDeleteHandler}
            aria-hidden="true"
          >
            아니오
          </button>
          <button
            className="yes"
            type="button"
            onClick={openDeleteHandler}
            aria-hidden="true"
          >
            네
          </button>
        </div>
      </div>
      <div className="delete_img_container">
        <img src="logo_gunsigi.png" alt="logo" />
      </div>
    </div>
  );
}

export default DeleteReviewModal;
