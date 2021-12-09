import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/LoginSignup/LoginModal.scss';
import Login from './login, signup/Login';
import Signup from './login, signup/Signup';
import { setLoginModal } from '../actions/modalAction';
import { stopScroll, clearStopScroll } from '../utils/ModalScrollPrevent';

function LoginModal() {
  const dispatch = useDispatch();
  // 스크롤 방지
  useEffect(() => {
    stopScroll();
    return () => {
      clearStopScroll();
    };
  }, []);

  const handleCloseLogin = () => {
    dispatch(setLoginModal(false));
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
        handleCloseLogin(e);
      }}
      className="LoginModal_container"
    >
      <div
        className="LoginModal"
        aria-hidden="true"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
            <Login handleCloseLogin={handleCloseLogin} />
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
