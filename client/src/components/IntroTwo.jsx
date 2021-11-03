import React from 'react';
import axios from 'axios';
import '../styles/landing/introTwo.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setSearchedProductList,
  setSearchType,
  setSearchedWord,
} from '../actions/searchAction';
import { keywordContents } from '../assets/Main';

function IntroTwo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSearchKeyword = (e) => {
    const keyword = e.currentTarget.value;
    axios
      .get('/products', {
        params: {
          query: keyword,
          type: 'keyword',
        },
      })
      .then((res) => {
        const { items, pages } = res.data;
        dispatch(setSearchedWord(keyword));
        dispatch(setSearchedProductList(items, pages.itemCount));
        dispatch(setSearchType('keyword'));
        history.push('/search');
        window.scrollTo(0, 0);
      });
  };

  return (
    <div className="introTwo">
      <div className="container">
        <div className="row">
          <div className="col-sm-1 col-md-1 col-lg-1 text-area">
            <h2>
              어떤 건강기능식품을
              <br />
              찾고 계시나요?
            </h2>
            <p>
              건식이가 대표 건강기능식품을 모아서
              <br />
              여러분에게 소개해 드립니다
              <br />
              클릭하면 해당 건강기능식품 리스트로 이동합니다
            </p>
          </div>
          {keywordContents.map((el) => (
            <div className="col-sm-1 col-md-1 col-lg-1" key={el.id}>
              <button
                className="keyword"
                onClick={handleSearchKeyword}
                value={el.title}
                type="button"
              >
                <p className="text">{el.title}</p>
                <img src={el.src} alt="keyword" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IntroTwo;
