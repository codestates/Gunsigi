import {
  ADD_ALL_PRODUCT_LIST,
  SET_ALL_PRODUCT_LIST,
  SET_SEARCHED_WORD,
  RESET_SEARCHED_WORD,
} from '../actions/types';

const searchInit = {
  productList: [],
  productCount: 0,
  searchedWord: '',
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

    case SET_SEARCHED_WORD:
      return { ...state, searchedWord: action.payload.word };

    case RESET_SEARCHED_WORD:
      return { ...state, searchedWord: '' };

    default:
      return state;
  }
};

export default searchReducer;
