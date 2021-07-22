import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers/index';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const enhancer = applyMiddleware(sagaMiddleware, logger);
export const store = createStore(reducers, enhancer);
sagaMiddleware.run(rootSaga);
