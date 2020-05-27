import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import { Types, updateUsername } from '../modules/action';
import reducer from './reducer';

const saveAuthData = store => next => action => {
  if(action.type === Types.LOG_IN) {
    const { username } = action.payload;
    updateUsername({ username });
  }

  // continue processing this action
  return next(action);
}

const middlewareEnhancer = applyMiddleware(logger, saveAuthData);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, middlewareEnhancer);
  return store;
}
