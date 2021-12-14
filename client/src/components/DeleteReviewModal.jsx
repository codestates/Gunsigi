import React, { useEffect } from 'react';
import { stopScrollMypage, clearStopScroll } from '../utils/ModalScrollPrevent';
import '../styles/Mypage/DeleteReviewModal.scss';

function DeleteReviewModal({ handleDeleteReviewModal }) {
  // * 스크롤 방지
  useEffect(() => {
    stopScrollMypage();
    return () => {
      clearStopScroll();
    };
  }, []);

  return (
    <div
      className="modal_wrapper"
      onClick={() => handleDeleteReviewModal(false)}
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
            onClick={() => handleDeleteReviewModal(false)}
            aria-hidden="true"
          >
            아니오
          </button>
          <button
            className="yes"
            type="button"
            onClick={() => handleDeleteReviewModal('delete')}
            aria-hidden="true"
          >
            네
          </button>
        </div>
      </div>
      <div
        className="delete_img_container"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      />
    </div>
  );
}

export default DeleteReviewModal;
