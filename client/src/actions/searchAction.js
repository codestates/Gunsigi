import {
  ADD_ALL_PRODUCT_LIST,
  SET_ALL_PRODUCT_LIST,
  SET_SEARCHED_WORD,
  RESET_SEARCHED_WORD,
} from './types';

export const addProductList = (productList, productCount) => ({
  type: ADD_ALL_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
  },
});

export const setProductList = (productList, productCount) => ({
  type: SET_ALL_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
  },
});

export const setSearchedWord = (word) => ({
  type: SET_SEARCHED_WORD,
  payload: {
    word,
  },
});

export const resetSearchedWord = () => ({ type: RESET_SEARCHED_WORD });
