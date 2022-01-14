import {
  ADD_ALL_PRODUCT_LIST,
  SET_ALL_PRODUCT_LIST,
  SET_SEARCHED_WORD,
  RESET_SEARCHED_WORD,
  SET_CURRENT_PAGE,
  SET_SEARCH_ORDER,
} from './types';

export const addProductList = (productList, productCount, totalPage) => ({
  type: ADD_ALL_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
    totalPage,
  },
});

export const setProductList = (productList, productCount, totalPage) => ({
  type: SET_ALL_PRODUCT_LIST,
  payload: {
    productList,
    productCount,
    totalPage,
  },
});

export const setSearchedWord = (word) => ({
  type: SET_SEARCHED_WORD,
  payload: {
    word,
  },
});

export const setSearchOrder = (order) => ({
  type: SET_SEARCH_ORDER,
  payload: {
    order,
  },
});

export const setCurrentPage = (currentPage, totalPage) => {
  let startPage = currentPage - 5;
  let endPage = currentPage + 4;
  if (currentPage < 1) currentPage = 1;
  if (currentPage >= totalPage) currentPage = totalPage;
  if (currentPage < 5) {
    startPage = 0;
    endPage = 9;
  }
  if (currentPage > totalPage - 4 && totalPage >= 9) {
    startPage = totalPage - 9;
  }
  return {
    type: SET_CURRENT_PAGE,
    payload: {
      currentPage,
      startPage,
      endPage,
    },
  };
};

export const resetSearchedWord = () => ({ type: RESET_SEARCHED_WORD });
