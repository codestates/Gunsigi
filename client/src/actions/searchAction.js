import {
  ADD_ALL_PRODUCT_LIST,
  SET_ALL_PRODUCT_LIST,
  ADD_SEARCHED_PRODUCT_LIST,
  SET_SEARCHED_PRODUCT_LIST,
  RESET_SEARCHED_PRODUCT_LIST,
  SET_SEARCHED_WORD,
  RESET_SEARCHED_WORD,
  SET_SEARCH_TYPE,
  RESET_SEARCH_TYPE,
  SET_SEARCH_PAGE,
  RESET_SEARCH_PAGE,
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

export const addSearchedProductList = (productList, productCount) => ({
  type: ADD_SEARCHED_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
  },
});

export const setSearchedProductList = (productList, productCount) => ({
  type: SET_SEARCHED_PRODUCT_LIST,
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

export const setSearchPage = (page) => ({
  type: SET_SEARCH_PAGE,
  payload: { page },
});

export const resetSearchPage = () => ({ type: RESET_SEARCH_PAGE });
