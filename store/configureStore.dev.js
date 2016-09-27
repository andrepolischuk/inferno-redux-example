import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import api from '../middleware/api';
import rootReducer from '../reducers';

const createStoreWithMiddlewares = compose(
  applyMiddleware(thunk, api, createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddlewares(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}
