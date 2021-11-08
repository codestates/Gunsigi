/* eslint-disable no-param-reassign */
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../actions/modalAction';
import { useHistory } from 'react-router-dom';
import { outMypage } from '../actions/inoutMypageAction';
import { setProductList } from '../actions/searchAction';
import Product from './Product';

function SearchProductList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchState = useSelector((state) => state.searchReducer);
  const { productList } = searchState;
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
      dispatch(
        setProductList(
          productList.map((product) => {
            if (product.id === productId) product.isBookmarked = true;
            return product;
          }),
        ),
      );
    });
  };

  const deleteBookmark = (productId) => {
    axios({
      method: 'DELETE',
      url: '/bookmarks',
      data: { productId },
      loading: false,
    }).then(() => {
      dispatch(
        setProductList(
          productList.map((product) => {
            if (product.id === productId) product.isBookmarked = false;
            return product;
          }),
        ),
      );
    });
  };

  const handleNotification = () => {
    if (!isLogin) {
      dispatch(setIsLogin(true));
    }
  };
  const handleClickProduct = (e) => {
    const bookmarkClass = e.target.className;
    const productId = e.currentTarget.id;

    if (!isLogin && bookmarkClass === 'Product_heart') {
      handleNotification();
    } else if (isLogin && bookmarkClass === 'Product_heart') {
      addBookmark(parseInt(productId, 10));
    } else if (isLogin && bookmarkClass === 'Product_heart_change') {
      deleteBookmark(parseInt(productId, 10));
    } else {
      dispatch(outMypage());
      history.push(`/product-detail/${productId}`);
    }
  };

  if (productList) {
    return (
      <>
        {productList.map((item, idx) => (
          <div
            onClick={handleClickProduct}
            onKeyPress={handleClickProduct}
            role="link"
            tabIndex={0}
            id={item.id}
            key={`p${idx}`}
          >
            <Product
              name={item.name}
              reviews={item.reviewsCount}
              img={item.image}
              score={item.score}
              bookmark={item.isBookmarked}
            />
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="noSearchList">
      <div className="content">
        <img alt="warning icon" src="/icons/icon_warn.svg" />
        <p>일치하는 검색 결과가 없습니다</p>
        <p>Sorry, No Results found</p>
      </div>
    </div>
  );
}

export default SearchProductList;
