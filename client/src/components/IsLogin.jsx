import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLoginModal,
  setSignupModal,
  setIsLogin,
} from '../actions/modalAction';
import '../styles/IsLogin.scss';

function IsLogin() {
  const isLoginBackgroundEl = useRef(null);
  const dispatch = useDispatch();

  const closeModalHadler = (e) => {
    if (e.target === isLoginBackgroundEl.current) {
      dispatch(setIsLogin(false));
    }
    if (e.target.innerText === '로그인') {
      dispatch(setIsLogin(false));
      dispatch(setLoginModal(true));
    }
    if (e.target.innerText === '회원가입') {
      dispatch(setIsLogin(false));
      dispatch(setSignupModal(true));
    }
  };

  return (
    <div
      aria-hidden="true"
      onClick={(e) => closeModalHadler(e)}
      ref={isLoginBackgroundEl}
      id="IsLogin_container"
    >
      <div className="IsLogin">
        <div className="text">
          <img src="/icons/icon_sad.svg" alt="sad" />
          <span>로그인 후 이용가능합니다</span>
        </div>
        <div className="login_signup_button">
          <button onClick={(e) => closeModalHadler(e)} type="button">
            로그인
          </button>
          <button onClick={(e) => closeModalHadler(e)} type="button">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default IsLogin;
