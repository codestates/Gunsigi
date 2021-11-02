import {
  ALL_PRODUCT_LIST,
  SEARCHED_PRODUCT_LIST,
  RESET_SEARCHED_PRODUCT_LIST,
  SET_SEARCHED_WORD,
  RESET_SEARCHED_WORD,
  SET_SEARCH_TYPE,
  RESET_SEARCH_TYPE,
} from './types';

export const setProductList = (productList, productCount) => ({
  type: ALL_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
  },
});

export const setSearchedProductList = (productList, productCount) => ({
  type: SEARCHED_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
  },
});

export const resetSearchedProductList = () => ({
  type: RESET_SEARCHED_PRODUCT_LIST,
});

export const setSearchedWord = (word) => ({
  type: SET_SEARCHED_WORD,
  payload: {
    word,
  },
});

export const resetSearchedWord = () => ({ type: RESET_SEARCHED_WORD });

export const setSearchType = (type) => ({
  type: SET_SEARCH_TYPE,
  payload: { type },
});

export const resetSearchType = () => ({
  type: RESET_SEARCH_TYPE,
});
