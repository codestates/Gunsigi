import React, { useEffect, useState } from 'react';
import '../styles/PasswordSetting.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setforgotPassword, successSendEmail } from '../actions/modalAction';
import { stopScroll, clearStopScroll } from '../utils/ModalScrollPrevent';
import CloseButton from './CloseButton';

function PasswordSetting() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [notEmail, setNotEmail] = useState(false);

  //! 스크롤 방지
  useEffect(() => {
    stopScroll();
    return () => {
      clearStopScroll();
    };
  }, []);

  //! 모달 닫는 핸들러
  const handleCloseModalClick = () => {
    dispatch(setforgotPassword(false));
  };

  //! 비밀번호 재요청 이메일 전송
  const emailDeliveryRequest = () => {
    axios({
      method: 'POST',
      data: { email },
      url: '/auth/forget',
      loading: false,
    })
      .then(() => {
        dispatch(successSendEmail(true));
        dispatch(setforgotPassword(false));
        setTimeout(() => {
          dispatch(successSendEmail(false));
        }, 1500);
      })
      .catch(() => setNotEmail(true));
  };

  return (
    <div
      aria-hidden="true"
      onClick={handleCloseModalClick}
      className="PasswordSetting_container"
    >
      <div
        className="PasswordSetting_in"
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={handleCloseModalClick} />
        <div className="PasswordSetting">
          <img src="/images/lock.png" alt="lock" />
          <div className="forgot">
            <div className="title">비밀번호를 잊으셨나요?</div>
            <div className="text">
              <div>가입하신 이메일로 비밀번호를</div>
              <div>재설정 할 수 있는 링크를 보내드립니다</div>
            </div>
            <div className="input-email">
              <input
                className={notEmail ? 'input-change' : 'input'}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && emailDeliveryRequest()}
                type="email"
                placeholder="이메일"
              />
              <div className={notEmail ? 'none-email-change' : 'none-email'}>
                가입되지 않은 이메일입니다, 다시 확인해 주세요
              </div>
            </div>
          </div>
          <button
            onClick={() => emailDeliveryRequest()}
            type="button"
            className="link_btn"
          >
            링크 보내기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordSetting;
