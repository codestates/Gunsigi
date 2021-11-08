import {
  SET_LOGIN_MODAL,
  SET_SIGNUP_MODAL,
  SET_ISLOGIN_FALSE_OR_TRUE,
} from '../actions/types';

const modalInit = {
  isOpenLogin: false,
  isOpenSingup: false,
  isLoginTrueOrFalse: false,
};

const modalReducer = (state = modalInit, action) => {
  switch (action.type) {
    case SET_LOGIN_MODAL:
      return { ...state, isOpenLogin: action.payload.isOpenLogin };

    case SET_SIGNUP_MODAL:
      return { ...state, isOpenSingup: action.payload.isOpenSingup };

    case SET_ISLOGIN_FALSE_OR_TRUE:
      return {
        ...state,
        isLoginTrueOrFalse: action.payload.isLoginTrueOrFalse,
      };

    default:
      return state;
  }
};

export default modalReducer;
