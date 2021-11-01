import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import loginState from '../../actions/userAction';
import '../../styles/LoginSignup/Login.scss';

function Login({ setOpenLogin }) {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleFormChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
    setErrorMsg('');
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post('/auth/signin', loginForm)
      .then(() => {
        dispatch(loginState(true));
        setOpenLogin(false);
      })
      .catch((err) => {
        try {
          const { status } = err.response;
          if (status >= 400 && status < 500) {
            setErrorMsg('이메일과 비밀번호를 다시 한번 확인해주세요.');
            setTimeout(() => setErrorMsg(''), 5000);
          } else {
            setErrorMsg('통신에 문제가 발생했습니다. 잠시 후 시도해주세요.');
          }
        } catch (err) {
          setErrorMsg('통신에 문제가 발생했습니다. 잠시 후 시도해주세요.');
          console.log(err);
        }
      });
  };

  return (
    <div className="Login_container">
      <div className="Login_in">
        <div className="title">로그인</div>
        <div className="input">
          <input
            type="email"
            placeholder="이메일"
            name="email"
            value={loginForm.email}
            onChange={handleFormChange}
          />
          <div className="password">
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={loginForm.password}
              onChange={handleFormChange}
            />
            <div>{errorMsg}</div>
          </div>
        </div>
        <div className="icon">
          <img src="/google_Logo.png" alt="google" />
          <img src="/kakao_Logo.png" alt="kakao" />
        </div>
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
