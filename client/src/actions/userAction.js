import {
  SET_LOGIN_STATE,
  SET_NICKNAME,
  SET_PROFILE_IMG,
} from './types';

export const setLoginState = (trueOrFalse) => ({
  type: SET_LOGIN_STATE,
  payload: {
    isLogin: trueOrFalse,
  },
});

export const setNickname = (nicknameString) => ({
  type: SET_NICKNAME,
  payload: {
    nickName: nicknameString,
  },
});

export const setProfileImg = (imgSrc) => ({
  type: SET_PROFILE_IMG,
  payload: {
    profileImg: imgSrc,
  },
});
