import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/LoginSignup/LoginModal.scss';
import Login from './login, signup/Login';
import Signup from './login, signup/Signup';
import { setLoginModal } from '../actions/modalAction';

function LoginModal() {
  const dispatch = useDispatch();
  const openLoginEl = useRef(null);

  const closeLoginHandler = (e) => {
    if (e.target === openLoginEl.current) {
      dispatch(setLoginModal(false));
    }
  };

  const LoginSignupChange = (e) => {
    const loginSignupImg = document.getElementById(
      'LoginModal_img_Login_Signup',
    );
    const login = document.getElementById('LoginModal_Login_change');
    const signup = document.getElementById('LoginModal_Signup_change');

    if (e.target.innerText === '회원가입') {
      loginSignupImg.style.right = '370px';
      loginSignupImg.style.borderRadius = '6px 0 0 6px';
      login.style.display = 'flex';
      signup.style.display = 'none';
    }
    if (e.target.innerText === '로그인') {
      loginSignupImg.style.right = '0px';
      loginSignupImg.style.borderRadius = '0 6px 6px 0';
      login.style.display = 'none';
      signup.style.display = 'flex';
    }
  };

  return (
    <div
      aria-hidden="true"
      onClick={(e) => {
        closeLoginHandler(e);
      }}
      ref={openLoginEl}
      className="LoginModal_container"
    >
      <div className="LoginModal">
        <div className="LoginModal_in">
          <div id="LoginModal_img_Login_Signup">
            <div className="img">
              <div id="LoginModal_Signup_change">
                <div>아직 회원가입을 안하셨나요?</div>
                <button onClick={(e) => LoginSignupChange(e)} type="button">
                  회원가입
                </button>
              </div>
              <div id="LoginModal_Login_change">
                <div>이미 회원가입을 하셨나요?</div>
                <button onClick={(e) => LoginSignupChange(e)} type="button">
                  로그인
                </button>
              </div>
            </div>
          </div>

          <div className="LoginModal_Login">
            <Login />
          </div>
          <div className="LoginModal_Signup">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
