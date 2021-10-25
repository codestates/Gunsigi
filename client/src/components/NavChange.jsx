import React from 'react';
import '../styles/nav/navChange.scss';

function NavChange() {
  // isLogin 리덕스 상태 설정필요
  const isLogin = true;
  return (
    <div className="navChange">
      <div className="nav_logo">
        <img alt="gunsigi logo" src="/logo_gunsigi.png" />
      </div>
      <div className="nav_mid">
        <input type="text" className="search-input" />
        <div className="icon_search">
          <img src="/icons/icon_magnify.svg" alt="magnifier" />
        </div>
      </div>
      <div className="nav_right">
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
        <div className="icon_my">
          <img src="/icons/icon_mypage.svg" alt="my page" />
        </div>
      </div>
    </div>
  );
}

export default NavChange;
