import React, { useEffect } from 'react';
import axios from 'axios';
import { stopScrollMypage, clearStopScroll } from '../utils/ModalScrollPrevent';
import '../styles/Mypage/WithdrawalModal.scss';

function WithdrawalModal({ handleWithdrawlModal }) {
  // * 스크롤 방지
  useEffect(() => {
    stopScrollMypage();
    return () => {
      clearStopScroll();
    };
  }, []);

  // * 회원 탈퇴 요청
  const handleWithdrawalRequest = (event) => {
    event.preventDefault();

    axios.delete('/users').then(() => {
      window.localStorage.clear();
      window.location.reload();
    });
  };

  return (
    <div
      className="modal_wrapper"
      onClick={handleWithdrawlModal}
      aria-hidden="true"
    >
      <div
        className="modal_contents"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <span>회원 탈퇴하시겠습니까?</span>
        <p>
          삭제된 계정은 다시 복구할 수 없고
          <br />
          계정의 리뷰나 즐겨찾기 항목은 완전히
          <br />
          삭제된다는 점을 기억해주세요
        </p>
        <div className="buttons_container">
          <button
            className="no"
            type="button"
            onClick={handleWithdrawlModal}
            aria-hidden="true"
          >
            아니오
          </button>
          <button
            className="yes"
            type="button"
            onClick={handleWithdrawalRequest}
            aria-hidden="true"
          >
            네
          </button>
        </div>
      </div>
      <div
        className="withdrawl_img_container"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <img src="logo_gunsigi.png" alt="logo" />
      </div>
    </div>
  );
}

export default WithdrawalModal;
