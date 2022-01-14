import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductList,
  setCurrentPage,
  setProductList,
} from '../actions/searchAction';
import '../styles/search/Search.scss';
import NavChange from '../components/NavChange';
import SearchProductList from '../components/SearchProductList';
import TopButton from '../components/TopButton';
import Skeleton from '../components/Skeleton';
import SearchPageButtons from '../components/SearchPageButtons';

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
  const { productCount, totalPage, currentPage } = searchState;
  const [searchOrder, setSearchOrder] = useState('views');

  useEffect(() => {
    // 같은페이지 내에서 검색 다시 했을 때
    // 주소가 바뀌었으니 새로운 검색을 한것임. 전부 초기화
    if (history.action === 'PUSH') {
      // 뒤로가기가 아닐 때만 초기화
      const parsedQuery = parseQuery(location.search);
      query = parsedQuery.query;
      type = parsedQuery.type;
      dispatch(setProductList([], 1, 1));
      if (currentPage === 1) {
        // eslint-disable-next-line no-use-before-define
        getMoreProducts();
      }
      dispatch(setCurrentPage(1, totalPage));
    }
  }, [location.search]);

  // pagination - 우선 전체 제품 30개씩 보여주기
  const getMoreProducts = async () => {
    const axiosConfig = {
      method: 'get',
      url: '/products/all/items',
      params: {
        page: currentPage,
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
    dispatch(
      addProductList(
        response.data.items,
        response.data.pages.itemCount,
        response.data.pages.total,
      ),
    );
  };

  useEffect(async () => {
    getMoreProducts();
  }, [searchOrder, currentPage]);

  // 조회순, 리뷰순 정렬 버튼 핸들러
  const handleOrderBtn = async (e) => {
    const order = e.target.value;
    dispatch(setProductList([], 1, 1));
    setSearchOrder(order);
    dispatch(setCurrentPage(1, totalPage));
  };

  const makeDigitComma = (num) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <NavChange />
      {/* <TopButton /> */}
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img">
            <img src="/images/search_man.webp" alt="man" />
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
            </div>
            <SearchPageButtons />
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
