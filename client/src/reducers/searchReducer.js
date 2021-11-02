import {
  ALL_PRODUCT_LIST,
  SEARCHED_PRODUCT_LIST,
  RESET_SEARCHED_PRODUCT_LIST,
  SET_SEARCHED_WORD,
  RESET_SEARCHED_WORD,
  SET_SEARCH_TYPE,
  RESET_SEARCH_TYPE,
} from '../actions/types';

const searchInit = {
  productList: [],
  productCount: 0,
  searchedProductList: false,
  searchedProductCount: 0,
  searchedWord: '',
  searchType: 'search',
};

const searchReducer = (state = searchInit, action) => {
  switch (action.type) {
    case ALL_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload.productList,
        productCount: action.payload.productCount,
      };

    case SEARCHED_PRODUCT_LIST:
      return {
        ...state,
        searchedProductList: action.payload.productList,
        searchedProductCount: action.payload.productCount,
      };

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

    default:
      return state;
  }
};

export default searchReducer;
