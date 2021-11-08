import { combineReducers } from 'redux';
import userReducer from './userReducer';
import inoutMypage from './inoutMypage';
import searchReducer from './searchReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  userReducer,
  inoutMypage,
  searchReducer,
  modalReducer,
});

export default rootReducer;
