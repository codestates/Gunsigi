import { SET_LOGIN_MODAL, SET_SIGNUP_MODAL } from './types';

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
