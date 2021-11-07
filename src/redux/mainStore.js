import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '_redux/reducers/rootReducer';

const initialState = {};

const middleware = [thunk];

const mainStore = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default mainStore;
