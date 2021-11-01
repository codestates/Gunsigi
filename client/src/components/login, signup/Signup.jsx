import React from 'react';
import '../../styles/LoginSignup/Signup.scss';

function Signup() {
  return (
    <div className="Signup_container">
      <div className="Signup_in">
        <div className="title">회원가입</div>
        <div className="input">
          <div className="email">
            <input type="email" placeholder="이메일" />
            <div>이미 가입하신 이메일입니다</div>
          </div>
          <div className="nickname">
            <input type="text" placeholder="닉네임" />
            <div>닉네임을 입력해주세요</div>
          </div>
          <div className="password">
            <input type="password" placeholder="비밀번호" />
            <div className="check">
              <input type="password" placeholder="비밀번호 확인" />
              <div>비밀번호가 일치하지 않습니다</div>
            </div>
          </div>
        </div>
        <div className="icon">
          <img src="/google_Logo.png" alt="google" />
          <img src="/kakao_Logo.png" alt="kakao" />
        </div>
        <button type="button">회원가입</button>
      </div>
    </div>
  );
}

export default Signup;
