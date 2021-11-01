import { SET_LOGIN_STATE, SET_LOGOUT_STATE, SET_SIGNUP_STATE } from './types';

export const login = (trueOrFalse, accessToken, userInfo) => ({
  type: SET_LOGIN_STATE,
  payload: {
    isLogin: trueOrFalse,
    accessToken,
    userInfo,
  },
});

export const logout = (trueOrFalse) => ({
  type: SET_LOGOUT_STATE,
  payload: {
    isLogin: trueOrFalse,
    accessToken: '',
    userInfo: '',
  },
});

export const signup = (trueOrFalse, accessToken, userInfo) => ({
  type: SET_SIGNUP_STATE,
  payload: {
    isLogin: trueOrFalse,
    accessToken,
    userInfo,
  },
});
