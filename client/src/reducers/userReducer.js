import {
  SET_LOGIN_STATE,
  SET_NICKNAME,
  SET_PROFILE_IMG,
  SET_MY_PRODUCTS,
} from '../actions/types';

const userInit = {
  isLogin: 'init',
  nickName: '',
  profileImg: '',
  myProducts: [],
};

const userReducer = (state = userInit, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return { ...state, isLogin: action.payload.isLogin };

    case SET_NICKNAME:
      return { ...state, nickName: action.payload.nickName };

    case SET_PROFILE_IMG:
      return { ...state, profileImg: action.payload.profileImg };

    case SET_MY_PRODUCTS:
      return {
        ...state,
        myProducts: action.payload.myProducts,
      };

    default:
      return state;
  }
};

export default userReducer;
