/* eslint-disable no-nested-ternary */
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
  // const scrollArea = useRef(null);
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
  // const [scrollPage, setScrollPage] = useState({ prev: 0, products: 0 });
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryPage, setQueryPage] = useState(1);
  // todo: 처음 전체 제품리스트를 받아온다 - 조회순 (조회순 class명 체인지)
  // todo: 인풋창에 검색을 하면 해당 인풋대로 서버에 요청 query=
  // todo: 리뷰순 클릭시, 리뷰순으로 재요청
  // todo: 100개 이후에는 무한 스크롤 구현 page,size
  // todo: 탑버튼 구현
  useEffect(() => {
    setSearchOrder('views');
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
      setSearchOrder('views');
    },
    [],
  );

  const getMoreItem = async () => {
    // 조건 !searchedProductList - productList바꿀건지, searchedProductList
    // if (!searchedProductList) {
    //   setIsLoading(true);
    //   return axios
    //     .get('/products/all/items', {
    //       params: {
    //         order: searchOrder,
    //         page: queryPage + 1,
    //       },
    //     })
    //     .then((res) => {
    //       console.log('전체 검색 무한스크롤 요청 응답 data', res.data);
    //       // dispatch(setProductList());
    //       setIsLoading(false);
    //     });
    // }
  };
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

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

  // const handleInfiniteScroll = () => {
  //   let scrollHeight = Math.max(
  //     document.documentElement.scrollHeight,
  //     document.body.scrollHeight,
  //   );
  //   let scrollTop = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop,
  //   );
  //   let clientHeight = document.body.clientHeight;
  //   if (scrollTop + clientHeight === scrollHeight) {
  //     setScrollPage({
  //       prev: scrollPage.products,
  //       products: scrollPage.products + 30,
  //     });
  //   }
  // };

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
              {!searchedProductList ? (
                productList.map((item) => (
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
              ) : !searchedProductList.length ? (
                <div className="noSearchList">
                  <img alt="!" src="/icons/icon_warn.svg" />
                  <p>일치하는 검색 결과가 없습니다</p>
                  <p>Sorry, No Results found</p>
                </div>
              ) : (
                searchedProductList.map((item) => (
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
              )}
              <div ref={setTarget} className="targetEl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
