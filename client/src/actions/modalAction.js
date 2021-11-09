import {
  SET_LOGIN_MODAL,
  SET_SIGNUP_MODAL,
  SET_ISLOGIN_FALSE_OR_TRUE,
  SET_FORGOT_PASSWORD,
  SET_SUCCESS_SEND_EMAIL,
  SET_EMAIL_CHECK_MODAL,
} from './types';

export const setLoginModal = (trueOrFalse) => ({
  type: SET_LOGIN_MODAL,
  payload: {
    isOpenLogin: trueOrFalse,
  },
});

export const setSignupModal = (trueOrFalse) => ({
  type: SET_SIGNUP_MODAL,
  payload: {
    isOpenSingup: trueOrFalse,
  },
});

export const setIsLogin = (trueOrFalse) => ({
  type: SET_ISLOGIN_FALSE_OR_TRUE,
  payload: {
    isLoginTrueOrFalse: trueOrFalse,
  },
});

export const setforgotPassword = (trueOrFalse) => ({
  type: SET_FORGOT_PASSWORD,
  payload: {
    forgotPassord: trueOrFalse,
  },
});

export const successSendEmail = (trueOrFalse) => ({
  type: SET_SUCCESS_SEND_EMAIL,
  payload: {
    successSendEmail: trueOrFalse,
  },
});

export const setEmailCheckModal = (trueOrFalse) => ({
  type: SET_EMAIL_CHECK_MODAL,
  payload: {
    isOpenEmailCheck: trueOrFalse,
  },
});
