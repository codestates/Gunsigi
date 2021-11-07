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
} from '../actions/types';

const searchInit = {
  productList: [],
  productCount: 0,
  searchedProductList: false,
  searchedProductCount: 0,
  searchedWord: '',
  searchType: 'search',
  searchPage: 1,
};

const searchReducer = (state = searchInit, action) => {
  switch (action.type) {
    case ADD_ALL_PRODUCT_LIST:
      return {
        ...state,
        productList: [...state.productList, ...action.payload.productList],
        productCount: action.payload.productCount,
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
        productList,
        productCount,
      };
    }
    case ADD_SEARCHED_PRODUCT_LIST: {
      let arr = state.searchedProductList;
      if (!state.searchedProductList) {
        arr = [];
      } else {
        arr = state.searchedProductList;
      }
      return {
        ...state,
        searchedProductList: [...arr, ...action.payload.productList],
        searchedProductCount: action.payload.productCount,
      };
    }
    case SET_SEARCHED_PRODUCT_LIST: {
      let productCount;
      if (action.payload.productCount === undefined) {
        productCount = state.productCount;
      } else productCount = action.payload.productCount;
      return {
        ...state,
        searchedProductList: [...action.payload.productList],
        searchedProductCount: productCount,
      };
    }

    case RESET_SEARCHED_PRODUCT_LIST:
      return { ...state, searchedProductList: false };

    case SET_SEARCHED_WORD:
      return { ...state, searchedWord: action.payload.word };

    case RESET_SEARCHED_WORD:
      return { ...state, searchedWord: '' };

    case SET_SEARCH_TYPE:
      return { ...state, searchType: action.payload.type };

    case RESET_SEARCH_TYPE:
      return { ...state, searchType: 'search' };

    case SET_SEARCH_PAGE:
      return { ...state, searchPage: state.searchPage + 1 };

    case RESET_SEARCH_PAGE:
      return { ...state, searchPage: 1 };

    default:
      return state;
  }
};

export default searchReducer;
