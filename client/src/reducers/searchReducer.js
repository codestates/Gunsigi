import {
  PRODUCT_LIST,
  RESET_SEARCHED_WORD,
  SEARCHED_WORD,
  SEARCH_PRODUCT_LIST,
} from '../actions/types';

const searchInit = {
  productList: [],
  productCount: 0,
  searchedProductList: [],
  searchedProductCount: 0,
  searchedWord: '',
};

const searchReducer = (state = searchInit, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return Object.assign(state, {
        productList: action.payload.productList,
        productCount: action.payload.productCount,
      });

    case SEARCH_PRODUCT_LIST:
      return Object.assign(state, {
        searchedProductList: action.payload.productList,
        searchedProductCount: action.payload.productCount,
      });

    case SEARCHED_WORD:
      return Object.assign(state, {
        searchedWord: action.payload.word,
      });

    case RESET_SEARCHED_WORD:
      return Object.assign(state, { searchedWord: '' });

    default:
      return state;
  }
};

export default searchReducer;
