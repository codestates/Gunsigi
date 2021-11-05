/* eslint-disable no-param-reassign */
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { outMypage } from '../actions/inoutMypageAction';
import { setProductList } from '../actions/searchAction';
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
      // bookmark.className = 'Product_heart_change';
      dispatch(setProductList(productList.map((product) => {
        if (product.id === productId) product.isBookmarked = true;
        return product;
      })));
    });
  };
  const deleteBookmark = (productId) => {
    axios({
      method: 'DELETE',
      url: '/bookmarks',
      data: { productId },
      loading: false,
    }).then(() => {
      // bookmark.className = 'Product_heart';
      dispatch(setProductList(productList.map((product) => {
        if (product.id === productId) product.isBookmarked = false;
        return product;
      })));
    });
  };

  const handleNotification = () => {
    const notification = document.getElementById('IsLogin_container');
    if (!isLogin) {
      notification.style.right = '20px';
      setTimeout(() => {
        notification.style.right = '-250px';
      }, 1500);
      // dispatch(setLoginModal(true));
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

  return (
    <>
      {!searchedProductList ? (
        productList.map((item, i) => {
          return i === productList.length - 1 &&
            !isLoading &&
            queryPage <= pageTotal ? (
            <div
              onClick={handleClickProduct}
              role="link"
              tabIndex={0}
              onKeyPress={handleClickProduct}
              id={item.id}
              key="theLast"
              ref={setTarget}
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
          ) : (
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
          );
        })
      ) : !searchedProductList.length ? (
        <div className="noSearchList">
          <img alt="!" src="/icons/icon_warn.svg" />
          <p>일치하는 검색 결과가 없습니다</p>
          <p>Sorry, No Results found</p>
        </div>
      ) : (
        searchedProductList.map((item, i) => {
          return i === searchedProductList.length - 1 &&
            !isLoading &&
            queryPage <= pageTotal ? (
            <div
              onClick={handleClickProduct}
              role="link"
              tabIndex={0}
              onKeyPress={handleClickProduct}
              id={item.id}
              key="theLast"
              ref={setTarget}
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
          ) : (
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
          );
        })
      )}
    </>
  );
}

export default SearchProductList;
