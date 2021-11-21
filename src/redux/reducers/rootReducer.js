import {combineReducers} from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import transactionsReducer from './transactionsReducer';
import timeReducer from './timeReducer';

export default combineReducers({
  authState: authReducer,
  userState: userReducer,
  catState: categoryReducer,
  transactionsState: transactionsReducer,
  timeState: timeReducer,
});
