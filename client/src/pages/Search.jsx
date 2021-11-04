/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { outMypage } from '../actions/inoutMypageAction';
import {
  resetSearchedWord,
  setProductList,
  setSearchedProductList,
  setSearchPage,
} from '../actions/searchAction';
import { setLoginModal } from '../actions/modalAction';
import NavChange from '../components/NavChange';
import Product from '../components/Product';
import '../styles/Search.scss';
import IsLogin from '../components/IsLogin';

function Search() {
  // const scrollArea = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchOrder, setSearchOrder] = useState('views');
  const userState = useSelector((state) => state.userReducer);
  const { isLogin } = userState;
  const searchState = useSelector((state) => state.searchReducer);
  const {
    productList,
    productCount,
    searchedProductList,
    searchedProductCount,
    searchedWord,
    searchType,
    searchPage,
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
  // useEffect(() => {
  //   setSearchOrder('views');
  //   axios
  //     .get('/products/all/items', {
  //       params: { order: 'views' },
  //     })
  //     .then((res) => {
  //       const { items, pages } = res.data;
  //       dispatch(setProductList(items, pages.itemCount));
  //     });
  // }, []);

  useEffect(
    () => () => {
      window.scrollTo(0, 0);
      setSearchOrder('views');
      // dispatch(resetSearchedWord());
    },
    [],
  );

  let page = 0;
  let total = 1;
  let lock = false;

  // useEffect(() => {
  //   console.log('change productList');
  //   lock = false;
  // }, [productList]);

  // ------ bookmark add, delete, notification
  const addBookmark = (productId, bookmark) => {
    axios({
      method: 'POST',
      url: '/bookmarks',
      data: { productId },
      loading: false,
    }).then(() => {
      bookmark.className = 'Product_heart_change';
    });
  };
  const deleteBookmark = (productId, bookmark) => {
    axios({
      method: 'DELETE',
      url: '/bookmarks',
      data: { productId },
      loading: false,
    }).then(() => {
      bookmark.className = 'Product_heart';
    });
  };

  const handleNotification = () => {
    const notification = document.getElementById('IsLogin_container');
    if (!isLogin) {
      // notification.style.right = '20px';
      // setTimeout(() => {
      //   notification.style.right = '-250px';
      // }, 1500);
      dispatch(setLoginModal(true));
    }
  };

  const handleClickProduct = (e) => {
    const bookmark = e.target;
    const bookmarkClass = e.target.className;
    const productId = e.currentTarget.id;

    if (!isLogin && bookmarkClass === 'Product_heart') {
      handleNotification();
    } else if (isLogin && bookmarkClass === 'Product_heart') {
      addBookmark(productId, bookmark);
    } else if (isLogin && bookmarkClass === 'Product_heart_change') {
      deleteBookmark(productId, bookmark);
    } else {
      dispatch(outMypage());
      history.push(`/product-detail/${productId}`);
    }
  };

  // -------- infinite scroll -------------
  const getMoreItem = async () => {
    // 조건 !searchedProductList - productList바꿀건지, searchedProductList
    console.log('before ' , page, total);
    if (page > total) return;
    if (!searchedProductList) {
      setIsLoading(true);
      console.log('axios요청 전 리덕스페이지', page);
      await axios
        .get('/products/all/items', {
          params: {
            order: searchOrder,
            page: page + 1,
          },
          loading: false,
        })
        .then((res) => {
          // console.log(res.data.items);
          // const newList = productList.slice().concat(res.data.items);
          const newList = [...productList, ...res.data.items];
          const newPage = searchPage + 1;
          console.log('new List ', newList.length);
          page += 1;
          total = res.data.pages.total;
          dispatch(setSearchPage(newPage));
          dispatch(setProductList(newList, res.data.pages.itemCount));
          setIsLoading(false);
          lock = false;
          console.log('요청 성공 후 searchPage', page, total);
        });
    }
  };

  const onIntersect = async ([entry], observer) => {
    console.log('get event , ', lock);
    if (entry.isIntersecting && !isLoading && !lock) {
      lock = true;
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
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
      <IsLogin />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img" />
          <div className="Search_bottom">
            <div className="Search_title">
              <div>
                {!searchedProductList
                  ? '전체 건강기능식품'
                  : `"${searchedWord}" 검색 결과`}
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
                  <div
                    onClick={handleClickProduct}
                    role="link"
                    tabIndex={0}
                    onKeyPress={handleClickProduct}
                    id={item.id}
                  >
                    <Product
                      key={item.id}
                      name={item.name}
                      reviews={item.reviewsCount}
                      img={item.image}
                      score={item.score}
                      bookmark={item.isBookmarked}
                    />
                  </div>
                ))
              ) : !searchedProductList.length ? (
                <div className="noSearchList">
                  <img alt="!" src="/icons/icon_warn.svg" />
                  <p>일치하는 검색 결과가 없습니다</p>
                  <p>Sorry, No Results found</p>
                </div>
              ) : (
                searchedProductList.map((item) => (
                  <div
                    onClick={handleClickProduct}
                    role="link"
                    tabIndex={0}
                    onKeyPress={handleClickProduct}
                    id={item.id}
                  >
                    <Product
                      key={item.id}
                      name={item.name}
                      reviews={item.reviewsCount}
                      img={item.image}
                      score={item.score}
                      bookmark={item.isBookmarked}
                    />
                  </div>
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
