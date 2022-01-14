import {
  ADD_ALL_PRODUCT_LIST,
  SET_ALL_PRODUCT_LIST,
  SET_SEARCHED_WORD,
  RESET_SEARCHED_WORD,
  SET_CURRENT_PAGE,
} from '../actions/types';

const searchInit = {
  productList: [],
  productCount: 0,
  searchedWord: '',
  totalPage: 1,
  startPage: 0,
  endPage: 9,
  currentPage: 1,
};

const searchReducer = (state = searchInit, action) => {
  switch (action.type) {
    case ADD_ALL_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload.productList,
        productCount: action.payload.productCount,
        totalPage: action.payload.totalPage,
      };

    case SET_ALL_PRODUCT_LIST: {
      let productCount;
      if (action.payload.productCount === undefined) {
        productCount = state.productCount;
      } else productCount = action.payload.productCount;
      let { productList } = action.payload;
      if (Array.isArray(productList)) {
        productList = [...action.payload.productList];
      }
      return {
        ...state,
        productList,
        productCount,
      };
    }

    case SET_SEARCHED_WORD:
      return { ...state, searchedWord: action.payload.word };

    case RESET_SEARCHED_WORD:
      return { ...state, searchedWord: '' };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        startPage: action.payload.startPage,
        endPage: action.payload.endPage,
      };

    default:
      return state;
  }
};

export default searchReducer;
