import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';

export const middlewares = [ReduxThunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(
  createStore
);

const store = createStoreWithMiddleware(rootReducer);
export default store;
