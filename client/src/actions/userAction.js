import { SET_LOGIN_STATE } from './types';

export default (trueOrFalse) => ({
  type: SET_LOGIN_STATE,
  payload: {
    isLogin: trueOrFalse,
  },
});
