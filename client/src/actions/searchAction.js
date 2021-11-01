import {
  PRODUCT_LIST,
  SEARCH_PRODUCT_LIST,
  SEARCHED_WORD,
  RESET_SEARCHED_WORD,
} from './types';

export const getProductList = (productList, productCount) => ({
  type: PRODUCT_LIST,
  payload: {
    productList,
    productCount,
  },
});

export const getSearchedProductList = (productList, productCount) => ({
  type: SEARCH_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
  },
});

export const updateSearchedWord = (word) => ({
  type: SEARCHED_WORD,
  payload: {
    word,
  },
});

export const resetSearchedWord = () => ({ type: RESET_SEARCHED_WORD });
