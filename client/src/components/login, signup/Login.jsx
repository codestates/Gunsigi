import React from 'react';
import '../../styles/LoginSignup/Login.scss';

function Login() {
  return (
    <div className="Login_container">
      <div className="Login_in">
        <div className="title">로그인</div>
        <div className="input">
          <input type="email" placeholder="이메일" />
          <div className="password">
            <input type="password" placeholder="비밀번호" />
            <div>이메일과 비밀번호를 다시 한번 확인해주세요</div>
          </div>
        </div>
        <div className="icon">
          <img src="google_Logo.png" alt="google" />
          <img src="kakao_Logo.png" alt="kakao" />
        </div>
        <button type="button">로그인</button>
      </div>
    </div>
  );
}

export default Login;
