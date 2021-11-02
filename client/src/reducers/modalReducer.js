import { SET_LOGIN_MODAL, SET_SIGNUP_MODAL } from '../actions/types';

const modalInit = {
  isOpenLogin: false,
  isOpenSingup: false,
};

const modalReducer = (state = modalInit, action) => {
  switch (action.type) {
    case SET_LOGIN_MODAL:
      return { ...state, isOpenLogin: action.payload.isOpenLogin };

    case SET_SIGNUP_MODAL:
      return { ...state, isOpenSingup: action.payload.isOpenSingup };

    default:
      return state;
  }
};

export default modalReducer;
