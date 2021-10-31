import React, { useState } from 'react';
import '../styles/nav/navChange.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function NavChange() {
  // isLogin 리덕스 상태 설정필요
  const states = useSelector((state) => state.userReducer);
  const { isLogin } = states;
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  return (
    <>
      <div className="navChange">
        {openLogin ? <LoginModal setOpenLogin={setOpenLogin} /> : null}
        {openSignup ? <SignupModal setOpenSignup={setOpenSignup} /> : null}
        {openSearchModal ? (
          <SearchModal setOpenSearchModal={setOpenSearchModal} />
        ) : null}
        <Link to="/">
          <div className="nav_logo">
            <img alt="gunsigi logo" src="/logo_gunsigi.png" />
          </div>
        </Link>
        <div className="nav_mid">
          <input
            onClick={() => setOpenSearchModal(true)}
            type="text"
            className="search-input"
          />

          <div className="icon_search">
            <img src="/icons/icon_magnify.svg" alt="magnifier" />
          </div>
        </div>
        <div className="nav_right">
          {!isLogin ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setOpenLogin(true);
                }}
                className="login"
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => setOpenSignup(true)}
                className="signup"
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              <Link to="/mypage">
                <button type="button" className="mypage">
                  마이페이지
                </button>
              </Link>
              <button type="button" className="logout">
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavChange;
