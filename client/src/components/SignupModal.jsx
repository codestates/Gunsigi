import React, { useRef, useEffect } from 'react';
import '../styles/LoginSignup/SignupModal.scss';
import { useDispatch } from 'react-redux';
import Login from './login, signup/Login';
import Signup from './login, signup/Signup';
import { setSignupModal } from '../actions/modalAction';
import { stopScroll, clearStopScroll } from '../utils/ModalScrollPrevent';

function SignupModal() {
  const dispatch = useDispatch();
  const closeSignupEl = useRef(null);

  // 스크롤 방지
  useEffect(() => {
    stopScroll();
    return () => {
      clearStopScroll();
    };
  }, []);

  const closeSignupHandler = (e) => {
    if (e.target === closeSignupEl.current) {
      dispatch(setSignupModal(false));
    }
  };

  const LoginSignupChange = (e) => {
    const loginSignupImg = document.getElementById(
      'SignupModal_img_Login_Signup',
    );
    const login = document.getElementById('SignupModal_Login_change');
    const signup = document.getElementById('SignupModal_Signup_change');

    if (e.target.innerText === '로그인') {
      loginSignupImg.style.left = '370px';
      loginSignupImg.style.borderRadius = '0 6px 6px 0';
      login.style.display = 'none';
      signup.style.display = 'flex';
    }
    if (e.target.innerText === '회원가입') {
      loginSignupImg.style.left = '0px';
      loginSignupImg.style.borderRadius = '6px 0 0 6px';
      login.style.display = 'flex';
      signup.style.display = 'none';
    }
  };

  return (
    <div
      aria-hidden="true"
      onClick={(e) => closeSignupHandler(e)}
      ref={closeSignupEl}
      className="SignupModal_container"
    >
      <div className="SignupModal">
        <div className="SignupModal_in">
          <div id="SignupModal_img_Login_Signup">
            <div className="img">
              <div id="SignupModal_Signup_change">
                <div>아직 회원가입을 안하셨나요?</div>
                <button onClick={(e) => LoginSignupChange(e)} type="button">
                  회원가입
                </button>
              </div>
              <div id="SignupModal_Login_change">
                <div>이미 회원가입을 하셨나요?</div>
                <button onClick={(e) => LoginSignupChange(e)} type="button">
                  로그인
                </button>
              </div>
            </div>
          </div>

          <div className="SignupModal_Login">
            <Login />
          </div>
          <div className="SignupModal_Signup">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
