import React, { useRef, useState } from 'react';
import '../styles/nav/navChange.scss';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedWord } from '../actions/searchAction';
import { setLoginState } from '../actions/userAction';
import { setLoginModal, setSignupModal } from '../actions/modalAction';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function NavChange() {
  const inputEl = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { isLogin } = userState;
  const modalState = useSelector((state) => state.modalReducer);
  const { isOpenLogin, isOpenSingup } = modalState;
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const searchState = useSelector((state) => state.searchReducer);
  const { searchedWord } = searchState;

  const handleSearchInput = (event) => {
    dispatch(setSearchedWord(event.target.value));
  };

  const searchRequest = () => {
    setOpenSearchModal(false);
    inputEl.current.blur();
    if (inputEl.current.value !== '') {
      inputEl.current.value = '';
      history.push({
        pathname: '/search',
        search: `?query=${searchedWord}&type=search`,
      });
    } else {
      history.push('/search');
    }
    window.scrollTo(0, 0);
  };

  const handleInputPress = (event) => {
    if (event.key === 'Enter') {
      searchRequest();
    }
  };

  const logoutHandler = (event) => {
    event.preventDefault();

    axios.get('/auth/logout').then(() => {
      dispatch(setLoginState(false));
      history.push('/');
    });
  };

  return (
    <>
      <div className="navChange">
        {isOpenLogin ? <LoginModal /> : null}
        {isOpenSingup ? <SignupModal /> : null}
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
            ref={inputEl}
            onClick={() => setOpenSearchModal(true)}
            onChange={(e) => handleSearchInput(e)}
            onKeyPress={(e) => handleInputPress(e)}
            type="text"
            className="search-input"
            // placeholder="검색어를 입력해 주세요"
          />

          <button className="icon_search" onClick={searchRequest} type="button">
            <img src="/icons/icon_magnify.svg" alt="magnifier" />
          </button>
        </div>
        <div className="nav_right">
          {!isLogin ? (
            <>
              <button
                type="button"
                onClick={() => dispatch(setLoginModal(true))}
                className="login"
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => dispatch(setSignupModal(true))}
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
              <button type="button" className="logout" onClick={logoutHandler}>
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
