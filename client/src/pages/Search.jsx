/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { outMypage } from '../actions/inoutMypageAction';
import {
  resetSearchedWord,
  setProductList,
  setSearchedProductList,
  setSearchType,
} from '../actions/searchAction';
import NavChange from '../components/NavChange';
import Product from '../components/Product';
import '../styles/Search.scss';

function Search() {
  const dispatch = useDispatch();
  const [searchOrder, setSearchOrder] = useState('views');
  const searchState = useSelector((state) => state.searchReducer);
  const {
    productList,
    productCount,
    searchedProductList,
    searchedProductCount,
    searchedWord,
    searchType,
  } = searchState;
  // todo: 처음 전체 제품리스트를 받아온다 - 조회순 (조회순 class명 체인지)
  // todo: 인풋창에 검색을 하면 해당 인풋대로 서버에 요청 query=
  // todo: 리뷰순 클릭시, 리뷰순으로 재요청
  // todo: 100개 이후에는 무한 스크롤 구현 page,size
  // todo: 탑버튼 구현
  useEffect(() => {
    axios
      .get('/products/all/items', {
        params: { order: 'views' },
      })
      .then((res) => {
        const { items, pages } = res.data;
        dispatch(setProductList(items, pages.itemCount));
      });
  }, []);

  useEffect(
    () => () => {
      window.scrollTo(0, 0);
      dispatch(resetSearchedWord());
    },
    [],
  );

  const handleOrderBtn = (e) => {
    // 조건 1 : !searchedProductList
    // 조건 2 : target.value
    const order = e.target.value;
    if (!searchedProductList) {
      axios
        .get('/products/all/items', {
          params: { order },
        })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(setProductList(items, pages.itemCount));
          setSearchOrder(order);
        });
    } else {
      axios
        .get('/products', {
          params: { query: searchedWord, type: searchType, order },
        })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(setSearchedProductList(items, pages.itemCount));
          setSearchOrder(order);
        });
    }
  };

  return (
    <>
      <NavChange />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img" />
          <div className="Search_bottom">
            <div className="Search_title">
              <div>
                {!searchedProductList
                  ? '전체 건강기능식품'
                  : '검색된 건강기능식품'}
                <span>
                  {!searchedProductList
                    ? `(${productCount})`
                    : `(${searchedProductCount})`}
                </span>
              </div>
              <div className="Sequence">
                <button
                  className={
                    searchOrder === 'views' ? 'textColor_change' : 'textColor'
                  }
                  onClick={handleOrderBtn}
                  type="button"
                  value="views"
                >
                  조회순
                </button>
                <button type="button" className="textColor_change">
                  |
                </button>
                <button
                  className={
                    searchOrder === 'views' ? 'textColor' : 'textColor_change'
                  }
                  onClick={handleOrderBtn}
                  type="button"
                  value="reviews"
                >
                  리뷰순
                </button>
              </div>
            </div>
            <div className="Search_products">
              {!searchedProductList
                ? productList.map((item) => (
                    <Link to={`product-detail/${item.id}`}>
                      <Product
                        key={item.id}
                        name={item.name}
                        reviews={item.reviewsCount}
                        img={item.image}
                        score={item.score}
                        bookmark={item.isBookmarked}
                      />
                    </Link>
                  ))
                : searchedProductList.map((item) => (
                    <Link to={`product-detail/${item.id}`}>
                      <Product
                        key={item.id}
                        name={item.name}
                        reviews={item.reviewsCount}
                        img={item.image}
                        score={item.score}
                        bookmark={item.isBookmarked}
                      />
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
