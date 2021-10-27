import React from 'react';
import '../styles/nav/nav.scss';
import { Link } from 'react-router-dom';

function Nav() {
  const isLogin = true;
  return (
    <div className="nav">
      <Link to="/">
        <div className="nav_logo">
          <img alt="gunsigi logo" src="/logo_gunsigi.png" />
        </div>
      </Link>
      <div className="nav_right">
        <div className="icon_search">
          <img src="/icons/icon_magnify.svg" alt="magnifier" />
        </div>
        {!isLogin ? (
          <>
            <div className="login">로그인</div>
            <div className="signup">회원가입</div>
          </>
        ) : (
          <>
            <Link to="/mypage">
              <div className="mypage">마이페이지</div>
            </Link>
            <div className="logout">로그아웃</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
