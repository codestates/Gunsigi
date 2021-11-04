import {
  SET_LOGIN_STATE,
  SET_NICKNAME,
  SET_PROFILE_IMG,
} from '../actions/types';

const userInit = {
  isLogin: false,
  nickName: '',
  profileImg: '',
};

const userReducer = (state = userInit, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return { ...state, isLogin: action.payload.isLogin };

    case SET_NICKNAME:
      return { ...state, nickName: action.payload.nickName };

    case SET_PROFILE_IMG:
      return { ...state, profileImg: action.payload.profileImg };

    default:
      return state;
  }
};

export default userReducer;
