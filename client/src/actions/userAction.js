import {
  SET_LOGIN_STATE,
  SET_NICKNAME,
  SET_PROFILE_IMG,
  SET_MY_PRODUCTS,
  SET_MY_PRODUCTS_CNT,
  SET_MY_REVIEWS,
  SET_MY_REVIEWS_CNT,
} from './types';

export const setLoginState = (trueOrFalse) => ({
  type: SET_LOGIN_STATE,
  payload: {
    isLogin: trueOrFalse,
  },
});

export const setNickname = (nicknameString) => ({
  type: SET_NICKNAME,
  payload: {
    nickName: nicknameString,
  },
});

export const setProfileImg = (imgSrc) => ({
  type: SET_PROFILE_IMG,
  payload: {
    profileImg: imgSrc,
  },
});

export const setMyProducts = (myProductsArr) => ({
  type: SET_MY_PRODUCTS,
  payload: {
    myProducts: myProductsArr,
  },
});

export const setMyProductsCnt = (myProductsCntNum) => ({
  type: SET_MY_PRODUCTS_CNT,
  payload: {
    myProductsCnt: myProductsCntNum,
  },
});

export const setMyReview = (reviews) => ({
  type: SET_MY_REVIEWS,
  payload: {
    myReviews: reviews,
  },
});

export const setMyReviewCnt = (reviewsCnt) => ({
  type: SET_MY_REVIEWS_CNT,
  payload: {
    reviewsCount: reviewsCnt,
  },
});
