import React from 'react';
import '../styles/IsLogin.scss';

function IsLogin() {
  return (
    <div id="IsLogin_container">
      <div className="IsLogin">
        <div>로그인 후 이용가능합니다</div>
        <div className="login_signup_button">
          <button type="button">로그인</button>
          <button type="button">회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default IsLogin;
