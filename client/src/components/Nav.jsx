import React, { useState } from 'react';
import '../styles/nav/nav.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import loginState from '../actions/userAction';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { isLogin } = userState;
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const openSearchModalHandler = () => {
    setIsOpenSearchModal(!isOpenSearchModal);
  };

  const logoutHandler = (event) => {
    event.preventDefault();

    axios.get('/auth/logout').then(() => {
      dispatch(loginState(false));
      history.push('/');
    });
  };

  return (
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
              <button
                type="button"
                aria-hidden="true"
                onClick={() => {
                  setOpenLogin(true);
                }}
                className="login"
              >
                로그인
              </button>
              <button
                type="button"
                aria-hidden="true"
                onClick={() => setOpenSignup(true)}
                className="signup"
              >
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
              <button className="logout" type="button" onClick={logoutHandler}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
