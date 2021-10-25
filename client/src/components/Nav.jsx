import React from 'react';
import '../styles/nav/nav.scss';

function Nav() {
  const isLogin = false;
  return (
    <div className="nav">
      <div className="nav_logo">
        <img alt="gunsigi logo" src="/logo_gunsigi.png" />
      </div>
      <div className="nav_right">
        <div className="icon_search">
          <img src="/icons/icon_magnify.svg" alt="magnifier" />
        </div>
        <div className="icon_my">
          <img src="/icons/icon_mypage.svg" alt="my page" />
        </div>
        {!isLogin ? (
          <>
            <div className="login">로그인</div>
            <div className="signup">회원가입</div>
          </>
        ) : (
          <>
            <div className="mypage">마이페이지</div>
            <div className="logout">로그아웃</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
