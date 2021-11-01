import { SET_LOGIN_STATE, SET_LOGOUT_STATE, SET_SIGNUP_STATE } from './types';

export const login = (trueOrFalse) => ({
  type: SET_LOGIN_STATE,
  payload: {
    isLogin: trueOrFalse,
  },
});

export const logout = (trueOrFalse) => ({
  type: SET_LOGOUT_STATE,
  payload: {
    isLogin: trueOrFalse,
  },
});

export const signup = (trueOrFalse) => ({
  type: SET_SIGNUP_STATE,
  payload: {
    isLogin: trueOrFalse,
  },
});
