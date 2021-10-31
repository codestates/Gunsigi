import {
  SET_LOGIN_STATE,
  SET_LOGOUT_STATE,
  SET_SIGNUP_STATE,
} from '../actions/types';

const userInit = {
  userInfo: {
    id: 0,
    email: '',
    profileImage: '',
    nickname: '',
    type: '',
    reviewsCount: 0,
    bookmarskCount: 0,
  },
  accessToken: '',
  isLogin: false,
};

const userReducer = (state = userInit, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return Object.assign(state, {
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        isLogin: action.payload.isLogin,
      });

    case SET_LOGOUT_STATE:
      return Object.assign(state, {
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        isLogin: action.payload.isLogin,
      });

    case SET_SIGNUP_STATE:
      return Object.assign(state, {
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        isLogin: action.payload.isLogin,
      });

    default:
      return state;
  }
};

export default userReducer;
