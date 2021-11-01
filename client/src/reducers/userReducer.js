import {
  SET_LOGIN_STATE,
  SET_LOGOUT_STATE,
  SET_SIGNUP_STATE,
} from '../actions/types';

const userInit = {
  isLogin: false,
};

const userReducer = (state = userInit, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return Object.assign(state, {
        isLogin: action.payload.isLogin,
      });

    case SET_LOGOUT_STATE:
      return Object.assign(state, {
        isLogin: action.payload.isLogin,
      });

    case SET_SIGNUP_STATE:
      return Object.assign(state, {
        isLogin: action.payload.isLogin,
      });

    default:
      return state;
  }
};

export default userReducer;
