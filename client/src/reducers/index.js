import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';
import inoutMypage from './inoutMypage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userReducer,
  inoutMypage,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
