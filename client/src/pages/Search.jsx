/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductList,
  setProductList,
  setSearchType,
} from '../actions/searchAction';
import '../styles/Search.scss';
import NavChange from '../components/NavChange';
import SearchProductList from '../components/SearchProductList';
import TopButton from '../components/TopButton';
import Skeleton from '../components/Skeleton';

const parseQuery = (queryString) => {
  const query = {};
  const pairs = (
    queryString[0] === '?' ? queryString.substr(1) : queryString
  ).split('&');
  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

let query = '';
let type = 'search';
let init = false;

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const rootRef = useRef(null);
  const searchState = useSelector((state) => state.searchReducer);
  const { productList, productCount } = searchState;
  const [searchOrder, setSearchOrder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [target, setTarget] = useState(null);
  const [queryPage, setQueryPage] = useState(0);
  const [pageTotal, setPageTotal] = useState(2);

  const onObserver = (bool) => {
    const observerTarget = document.getElementById('observer');
    observerTarget.style.display = bool ? 'block' : 'none';
  };

  useEffect(() => {
    // 뒤로가기 거나 아니거나
    // location.search = url 디코딩 후 쿼리, 타입을 뽑아냄
    console.log('서치페이지 sessionStorage', sessionStorage);
    console.log('서치페이지 window.history', window.history);
    const parsedQuery = parseQuery(location.search);
    query = parsedQuery.query;
    type = parsedQuery.type;
    if (
      window.history.state?.queryPage &&
      productList.length &&
      history.action === 'POP'
    ) {
      // 기존 제품정보가 남아있고 뒤로가기를 통해서 온것이라면 페이지, 정렬 정보를 복구한다.
      init = true;
      setPageTotal(window.history.state.pageTotal);
      setQueryPage(window.history.state.queryPage);
      setSearchOrder(window.history.state.searchOrder);
      setSearchType(window.history.state.searchType);
    } else {
      // 그게 아니라면 초기화
      onObserver(false);
      dispatch(setProductList([], 0));
      setPageTotal(1);
      setQueryPage(1);
      setSearchOrder('views');
      setSearchType('search');
    }
  }, []);

  useEffect(() => {
    // 같은페이지 내에서 검색 다시 했을 때
    // 주소가 바뀌었으니 새로운 검색을 한것임. 전부 초기화
    if (history.action === 'PUSH') {
      // 뒤로가기가 아닐 때만 초기화
      onObserver(false);
      const parsedQuery = parseQuery(location.search);
      query = parsedQuery.query;
      type = parsedQuery.type;
      dispatch(setProductList([], 0));
      setPageTotal(1);
      if (queryPage === 1) {
        getMoreProducts();
      }
      setQueryPage(1);
    }
  }, [location.search]);

  // --------------- handle products order by view or reviews
  const handleOrderBtn = async (e) => {
    onObserver(false);
    const order = e.target.value;
    dispatch(setProductList([], 0));
    setSearchOrder(order);
    setQueryPage(1);
  };

  // --------------- infinite scroll
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const one = entries[0];
        if (one.isIntersecting) {
          setQueryPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0, root: rootRef.current, rootMargin: '0px 0px 0px 0px' },
    ),
  );

  const getMoreProducts = async () => {
    setIsLoading(true);
    const axiosConfig = {
      method: 'get',
      url: '/products/all/items',
      params: {
        page: queryPage,
        order: searchOrder,
        type,
      },
      loading: false,
    };
    if (query) {
      axiosConfig.params.query = query;
      axiosConfig.params.type = type;
      axiosConfig.url = '/products';
    }
    const response = await axios(axiosConfig);
    if (!response.data.items.length && queryPage === 1) {
      dispatch(setProductList(false, 0));
      setIsLoading(false);
      return;
    }
    dispatch(
      addProductList(response.data.items, response.data.pages.itemCount),
    );
    setPageTotal(response.data.pages.total);
    onObserver(true);
    setIsLoading(false);
  };

  useEffect(() => {
    // 페이지, 정렬 바뀌면 히스토리에 같이 저장.
    window.history.replaceState({ queryPage, searchOrder, pageTotal }, 'page');
    if (queryPage <= pageTotal && queryPage && searchOrder) {
      if (init) {
        init = false;
        return;
      }
      getMoreProducts();
    }
  }, [queryPage, searchOrder]);

  useEffect(() => {
    const currentEl = target;
    const currentObserver = observer.current;
    if (currentEl) {
      currentObserver.observe(currentEl);
    }
    return () => {
      if (currentEl) {
        currentObserver.unobserve(currentEl);
      }
    };
  }, [target]);

  const makeDigitComma = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <NavChange />
      <TopButton />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img">
            <img src="/images/search_man.png" alt="man" />
          </div>
          <div className="Search_bottom" ref={rootRef}>
            <div className="Search_title">
              <div>
                {!query ? '전체 건강기능식품' : `"${query}" 검색 결과`}
                <span>{`${makeDigitComma(productCount)} 건`}</span>
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
              <SearchProductList />
              {queryPage <= pageTotal - 1 ? <Skeleton /> : null}
              <div id="observer" ref={setTarget} className="targetEl">
                {/* {isLoading && <Skeleton />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
