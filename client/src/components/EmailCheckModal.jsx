import React from 'react';
import { useDispatch } from 'react-redux';
import { setEmailCheckModal } from '../actions/modalAction';
import '../styles/EmailCheckModal.scss';

function EmailCheckModal() {
  const dispatch = useDispatch();

  return (
    <div
      className="email-check_container"
      onClick={() => dispatch(setEmailCheckModal(false))}
      aria-hidden="true"
    >
      <div
        className="email-check_inside"
        onClick={(e) => e.stopPropagation(e)}
        aria-hidden="true"
      >
        <img src="/logo_gunsigi.png" alt="logo" />
        <div className="text">
          <h3>인증 메일이 발송되었습니다</h3>
          <span>가입하신 이메일에서 인증을 진행해주세요</span>
        </div>
        <button
          type="button"
          onClick={() => dispatch(setEmailCheckModal(false))}
          aria-hidden="true"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default EmailCheckModal;
