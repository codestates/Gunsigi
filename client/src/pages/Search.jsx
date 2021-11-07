/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { outMypage } from '../actions/inoutMypageAction';
import {
  resetSearchPage,
  addProductList,
  setProductList,
  addSearchedProductList,
  setSearchedProductList,
  setSearchPage,
} from '../actions/searchAction';
import '../styles/Search.scss';
import NavChange from '../components/NavChange';
import IsLogin from '../components/IsLogin';
import IsLoadingSmall from '../components/IsLoadingSmall';
import SearchProductList from '../components/SearchProductList';
import TopButton from '../components/TopButton';

function Search() {
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

  // ---- 다시 무한 스크롤 관련 스테이트 만
  const [isLoading, setIsLoading] = useState(false);
  // 리덕스의 productList
  const [target, setTarget] = useState(null); // 왜 되는지?
  const [queryPage, setQueryPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const rootRef = useRef(null);
  useEffect(async () => {
    setIsLoading(true);
    if (!searchedProductCount) {
      const response = await axios.get('/products/all/items', {
        params: { page: queryPage, order: searchOrder },
        loading: false,
      });
      dispatch(
        setProductList(response.data.items, response.data.pages.itemCount),
      );
      setPageTotal(response.data.pages.total);
    } else {
      const response = await axios.get('/products', {
        params: {
          query: `${searchedWord}`,
          order: searchOrder,
          page: queryPage,
        },
        loading: false,
      });
      dispatch(
        setSearchedProductList(
          response.data.items,
          response.data.pages.itemCount,
        ),
      );
      setPageTotal(response.data.pages.total);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // setSearchOrder('views');
    console.log('서치오더 변화', searchOrder);
  }, [searchOrder]);

  // ----- handle products order by views, reviews
  const handleOrderBtn = async (e) => {
    const order = e.target.value;
    if (!searchedProductList) {
      dispatch(setProductList([], 0));
    } else {
      dispatch(setSearchedProductList([], 0));
    }
    setSearchOrder(order);
    setQueryPage(1);
  };

  // -------- infinite scroll -------------
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const one = entries[0];
        if (one.isIntersecting) {
          setQueryPage((prev) => prev + 1);
        }
      },
      { root: rootRef.current, threshold: 1 },
    ),
  );

  const getMoreProducts = async () => {
    // 전체 vs 검색어
    setIsLoading(true);
    if (!searchedProductList) {
      const response = await axios.get('/products/all/items', {
        params: { page: queryPage, order: searchOrder },
        loading: false,
      });
      dispatch(
        addProductList(response.data.items, response.data.pages.itemCount),
      );
      setPageTotal(response.data.pages.total);
    } else {
      setIsLoading(true);
      const response = await axios.get('/products', {
        params: {
          query: `${searchedWord}`,
          order: searchOrder,
          page: queryPage,
        },
        loading: false,
      });
      dispatch(
        addSearchedProductList(
          response.data.items,
          response.data.pages.itemCount,
        ),
      );
      setPageTotal(response.data.pages.total);
    }
    setIsLoading(false);
  };

  // 유즈이펙트에 쿼리페이지, 서치오더를 디펜던시 에 넣으면 되는데, set & add 를 첫번째에만 구분해줘야 함
  useEffect(() => {
    if (queryPage <= pageTotal && queryPage > 1) {
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

  return (
    <>
      <NavChange setQueryPage={setQueryPage} searchOrder={searchOrder} />
      <IsLogin />
      <TopButton />
      <div className="Search_conatiner">
        <div className="Search_in">
          <div className="Search_img" />
          <div className="Search_bottom">
            <div className="Search_title">
              <div>
                {!searchedProductList
                  ? `전체 건강기능식품 ${queryPage}`
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
              <SearchProductList
                isLoading={isLoading}
                queryPage={queryPage}
                pageTotal={pageTotal}
                setTarget={setTarget}
              />
            </div>
            <div className="targetEl">{isLoading && <IsLoadingSmall />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
