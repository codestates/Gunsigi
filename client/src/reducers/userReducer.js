import { SET_LOGIN_STATE } from '../actions/types';

const userInit = {
  isLogin: false,
};

const userReducer = (state = userInit, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return { ...state, isLogin: action.payload.isLogin };
    default:
      return state;
  }
};

export default userReducer;
