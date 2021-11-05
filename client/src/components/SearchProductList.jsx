/* eslint-disable no-param-reassign */
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { outMypage } from '../actions/inoutMypageAction';
import {
  setProductList,
  setSearchedProductList,
} from '../actions/searchAction';
import Product from './Product';

function SearchProductList({ isLoading, queryPage, pageTotal, setTarget }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchState = useSelector((state) => state.searchReducer);
  const { productList, searchedProductList } = searchState;
  const userState = useSelector((state) => state.userReducer);
  const { isLogin } = userState;

  // ------ bookmark add, delete, notification
  const addBookmark = (productId) => {
    axios({
      method: 'POST',
      url: '/bookmarks',
      data: { productId },
      loading: false,
    }).then(() => {
      if (!searchedProductList) {
        console.log('전체검색 북마크 추가');
        dispatch(
          setProductList(
            productList.map((product) => {
              if (product.id === productId) product.isBookmarked = true;
              return product;
            }),
          ),
        );
      } else {
        console.log('검색어 검색 북마크 추가');
        dispatch(
          setSearchedProductList(
            searchedProductList.map((product) => {
              if (product.id === productId) product.isBookmarked = true;
              return product;
            }),
          ),
        );
      }
    });
  };

  const deleteBookmark = (productId) => {
    axios({
      method: 'DELETE',
      url: '/bookmarks',
      data: { productId },
      loading: false,
    }).then(() => {
      if (!searchedProductList) {
        dispatch(
          setProductList(
            productList.map((product) => {
              if (product.id === productId) product.isBookmarked = false;
              return product;
            }),
          ),
        );
      } else {
        dispatch(
          setSearchedProductList(
            searchedProductList.map((product) => {
              if (product.id === productId) product.isBookmarked = false;
              return product;
            }),
          ),
        );
      }
    });
  };

  const handleNotification = () => {
    const notification = document.getElementById('IsLogin_container');
    if (!isLogin) {
      notification.style.right = '20px';
      setTimeout(() => {
        notification.style.right = '-250px';
      }, 1500);
    }
  };
  const handleClickProduct = (e) => {
    const bookmark = e.target;
    const bookmarkClass = e.target.className;
    const productId = e.currentTarget.id;

    if (!isLogin && bookmarkClass === 'Product_heart') {
      handleNotification();
    } else if (isLogin && bookmarkClass === 'Product_heart') {
      addBookmark(parseInt(productId, 10), bookmark);
    } else if (isLogin && bookmarkClass === 'Product_heart_change') {
      deleteBookmark(parseInt(productId, 10), bookmark);
    } else {
      dispatch(outMypage());
      history.push(`/product-detail/${productId}`);
    }
  };

  if (!searchedProductList) {
    return (
      <>
        {productList.map((item, i) => {
          return i === productList.length - 1 &&
            !isLoading &&
            queryPage <= pageTotal ? (
            <div
              onClick={handleClickProduct}
              onKeyPress={handleClickProduct}
              role="link"
              tabIndex={0}
              id={item.id}
              key={`all${i}`}
              ref={setTarget}
            >
              <Product
                name={item.name}
                reviews={item.reviewsCount}
                img={item.image}
                score={item.score}
                bookmark={item.isBookmarked}
              />
            </div>
          ) : (
            <div
              onClick={handleClickProduct}
              onKeyPress={handleClickProduct}
              role="link"
              tabIndex={0}
              id={item.id}
              key={`all${i}two`}
            >
              <Product
                name={item.name}
                reviews={item.reviewsCount}
                img={item.image}
                score={item.score}
                bookmark={item.isBookmarked}
              />
            </div>
          );
        })}
      </>
    );
  }
  if (!searchedProductList.length) {
    return (
      <div className="noSearchList">
        <img alt="!" src="/icons/icon_warn.svg" />
        <p>일치하는 검색 결과가 없습니다</p>
        <p>Sorry, No Results found</p>
      </div>
    );
  }
  return (
    <>
      {searchedProductList.map((item, i) => {
        return i === searchedProductList.length - 1 &&
          !isLoading &&
          queryPage <= pageTotal ? (
          <div
            onClick={handleClickProduct}
            onKeyPress={handleClickProduct}
            role="link"
            tabIndex={0}
            id={item.id}
            key={`s${i}`}
            ref={setTarget}
          >
            <Product
              name={item.name}
              reviews={item.reviewsCount}
              img={item.image}
              score={item.score}
              bookmark={item.isBookmarked}
            />
          </div>
        ) : (
          <div
            onClick={handleClickProduct}
            onKeyPress={handleClickProduct}
            role="link"
            tabIndex={0}
            id={item.id}
            key={`s${i}two`}
          >
            <Product
              name={item.name}
              reviews={item.reviewsCount}
              img={item.image}
              score={item.score}
              bookmark={item.isBookmarked}
            />
          </div>
        );
      })}
    </>
  );
}

export default SearchProductList;