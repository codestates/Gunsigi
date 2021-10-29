import React, { useState } from 'react';
import '../styles/nav/Nav.scss';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function Nav() {
  const isLogin = false;
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const openSearchModalHandler = () => {
    setIsOpenSearchModal(!isOpenSearchModal);
  };

  return (
<<<<<<< HEAD
    <>
      {isOpenSearchModal ? <SearchModal /> : null}
      {openLogin ? <LoginModal setOpenLogin={setOpenLogin} /> : null}
      {openSignup ? <SignupModal setOpenSignup={setOpenSignup} /> : null}
      <div className="nav">
        <Link to="/">
          <div className="nav_logo">
            <img alt="gunsigi logo" src="/logo_gunsigi.png" />
          </div>
        </Link>
        <div className="nav_right">
          <Link to="/search">
            <div
              onClick={() => openSearchModalHandler()}
              aria-hidden="true"
              className="icon_search"
            >
              <img src="/icons/icon_magnify.svg" alt="magnifier" />
            </div>
          </Link>
          {!isLogin ? (
            <>
              <div
                aria-hidden="true"
                onClick={() => {
                  setOpenLogin(true);
                }}
                className="login"
              >
                로그인
              </div>
              <div
                aria-hidden="true"
                onClick={() => setOpenSignup(true)}
                className="signup"
              >
                회원가입
              </div>
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
=======
    <div className="nav">
      <Link to="/">
        <div className="nav_logo">
          <img alt="gunsigi logo" src="/logo_gunsigi.png" />
        </div>
      </Link>
      <div className="nav_right">
        <button className="icon_search" type="button">
          <img src="/icons/icon_magnify.svg" alt="magnifier" />
        </button>
        {!isLogin ? (
          <>
            <button className="login" type="button">
              로그인
            </button>
            <button className="signup" type="button">
              회원가입
            </button>
          </>
        ) : (
          <>
            <Link to="/mypage">
              <button className="mypage" type="button">
                마이페이지
              </button>
            </Link>
            <button className="logout" type="button">
              로그아웃
            </button>
          </>
        )}
>>>>>>> 5a1bb3d (fix: introTwo,nav,navChange 버튼,효과 수정)
      </div>
    </>
  );
}

export default Nav;
