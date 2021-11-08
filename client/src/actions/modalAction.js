import {
  SET_LOGIN_MODAL,
  SET_SIGNUP_MODAL,
  SET_ISLOGIN_FALSE_OR_TRUE,
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
