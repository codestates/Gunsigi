import { IN_MYPAGE, OUT_MYPAGE } from '../actions/types';

const inoutMypage = (state = false, action) => {
  switch (action.type) {
    case IN_MYPAGE:
      return true;

    case OUT_MYPAGE:
      return false;

    default:
      return state;
  }
};

export default inoutMypage;
