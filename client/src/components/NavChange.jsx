import React, { useState } from 'react';
import '../styles/nav/navChange.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchedProductList,
  updateSearchedWord,
  resetSearchedWord,
} from '../actions/searchAction';
import { logout } from '../actions/userActions';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function NavChange() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { isLogin } = userState;
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.searchReducer);
  const { searchedWord } = searchState;
  const handleSearchInput = (event) => {
    // setInputValue(event.target.value);
    console.log('서치워드 디스패치 하기 전', event.target.value);
    dispatch(updateSearchedWord(event.target.value));
    console.log('인풋창변화 후 searchedWord', searchState.searchedWord);
  };
  const searchRequest = () => {
    console.log('서치리퀘스트 함수 안 searchedWord', searchedWord);
    if (searchedWord !== '') {
      // handleSearchRequest();
      // setSearchedWord(inputValue);
      console.log('안으로 들어오나? searchedWord는', searchedWord);
      axios
        .get('/products', { params: { query: `${searchedWord}` } })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(getSearchedProductList(items, pages.itemCount));
          dispatch(resetSearchedWord());
          console.log('searchedWord', searchedWord);
          setOpenSearchModal(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleInputPress = (event) => {
    if (event.key === 'Enter') {
      console.log('엔터 후 서치리퀘스트실행');
      searchRequest();
    }
  };

  const logoutHandler = () => {
    axios.get('/auth/logout').then(() => {
      dispatch(logout(false));
    });
  };

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
            onChange={(e) => handleSearchInput(e)}
            onKeyPress={(e) => handleInputPress(e)}
            type="text"
            className="search-input"
          />

          <div
            className="icon_search"
            onClick={searchRequest}
            onKeyPress={searchRequest}
            role="button"
            tabIndex={0}
          >
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
