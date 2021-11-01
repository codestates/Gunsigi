import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';
import productDetailReducer from './productDetailReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
