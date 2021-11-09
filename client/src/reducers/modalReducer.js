import {
  SET_LOGIN_MODAL,
  SET_SIGNUP_MODAL,
  SET_ISLOGIN_FALSE_OR_TRUE,
  SET_FORGOT_PASSWORD,
  SET_SUCCESS_SEND_EMAIL,
  SET_EMAIL_CHECK_MODAL,
} from '../actions/types';

const modalInit = {
  isOpenLogin: false,
  isOpenSingup: false,
  isLoginTrueOrFalse: false,
  isOpenforgotPassword: false,
  isSuccessSendEmail: false,
  isOpenEmailCheck: false,
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

    case SET_FORGOT_PASSWORD:
      return {
        ...state,
        isOpenforgotPassword: action.payload.forgotPassord,
      };

    case SET_SUCCESS_SEND_EMAIL:
      return {
        ...state,
        isSuccessSendEmail: action.payload.successSendEmail,
      };

    case SET_EMAIL_CHECK_MODAL:
      return {
        ...state,
        isOpenEmailCheck: action.payload.isOpenEmailCheck,
      };

    default:
      return state;
  }
};

export default modalReducer;
