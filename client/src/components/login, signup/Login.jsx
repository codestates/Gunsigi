import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import loginState from '../../actions/userAction';
import { setLoginModal } from '../../actions/modalAction';
import Google from '../Google';
import Kakao from '../Kakao';
import '../../styles/LoginSignup/Login.scss';

function Login() {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const [isLoginErr, setIsLoginErr] = useState(false);

  // * onChange 변화 감지 핸들러
  const handleFormChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
    setErrorMsg('');
  };

  // * 로그인 요청 핸들러
  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post('/auth/signin', loginForm)
      .then(() => {
        dispatch(loginState(true));
        dispatch(setLoginModal(false));
        setIsLoginErr(false);
      })
      .catch((err) => {
        try {
          const { status } = err.response;
          if (status >= 400 && status < 500) {
            setErrorMsg('이메일과 비밀번호를 다시 한번 확인해주세요');
            setIsLoginErr(true);
            setTimeout(() => {
              setIsLoginErr(false);
            }, 800);
            setTimeout(() => setErrorMsg(''), 5000);
          } else {
            setErrorMsg('통신에 문제가 발생했습니다');
          }
        } catch (error) {
          setErrorMsg('통신에 문제가 발생했습니다');
          console.log(error);
        }
      });
  };

  // * input 엔터키 누르면 요청해주는 핸들러
  const handeleEnterForm = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

  return (
    <div className="Login_container">
      <div className="Login_in">
        <div className="title">로그인</div>
        <div className="input">
          <input
            className={!isLoginErr ? 'Login_input' : 'Login_input input_change'}
            type="email"
            placeholder="이메일"
            name="email"
            value={loginForm.email}
            onChange={handleFormChange}
            onKeyUp={handeleEnterForm}
          />
          <div className="password">
            <input
              className={
                !isLoginErr ? 'Login_input' : 'Login_input input_change'
              }
              type="password"
              placeholder="비밀번호"
              name="password"
              value={loginForm.password}
              onChange={handleFormChange}
              onKeyUp={handeleEnterForm}
            />
            <div>{errorMsg}</div>
          </div>
        </div>
        <div className="icon">
          <Google />
          <Kakao />
        </div>
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
