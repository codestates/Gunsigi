import React, { useRef, useState } from 'react';
import '../styles/nav/navChange.scss';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchedProductList,
  resetSearchedProductList,
  setSearchedWord,
  resetSearchedWord,
  setSearchType,
} from '../actions/searchAction';
import loginState from '../actions/userAction';
import { setLoginModal, setSignupModal } from '../actions/modalAction';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { inMypage } from '../actions/inoutMypageAction';

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

  // 인풋창에서 특정값을 입력하고 엔터를 치거나 검색아이콘을 누르면,
  //   검색결과리스트가 있을때, 검색페이지로 이동, 검색된 목록을 보여준다
  //   검색 리스트가 [] 거나, 서버 응답이 400대, 에러일때, 시각적 피드백
  // 인풋창을 비운채로 엔터를 누르면, 전체 목록 조회순 (기본)이 보이도록
  // 어느페이지에서든 스크롤이 항상 위로 오도록
  // 다른 페이지에 갔다가 서치페이지에 오면 서치리스트는 초기화되어야하지만, 네브체인지에서 서치페이지로갈때 초기화되어서는 안됨
  //
  const handleSearchInput = (event) => {
    dispatch(setSearchedWord(event.target.value));
  };
  const searchRequest = () => {
    if (inputEl.current.value !== '') {
      axios
        .get('/products', { params: { query: `${searchedWord}` } })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(setSearchedProductList(items, pages.itemCount));
          dispatch(setSearchType('search'));
          // dispatch(resetSearchedWord());
          setOpenSearchModal(false);
          inputEl.current.blur();
          inputEl.current.value = '';
          history.push('/search');
          window.scrollTo(0, 0);
        })
        .catch(() => {
          // alert('찾으시는 제품이 없습니다');
        });
    } else {
      dispatch(resetSearchedProductList());
      dispatch(resetSearchedWord());
      setOpenSearchModal(false);
      inputEl.current.blur();
      history.push('/search');
      window.scrollTo(0, 0);
    }
  };
  const handleInputPress = (event) => {
    if (event.key === 'Enter') {
      searchRequest();
    }
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
            placeholder="검색어를 입력해 주세요"
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
              <Link onClick={() => dispatch(inMypage())} to="/mypage">
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
