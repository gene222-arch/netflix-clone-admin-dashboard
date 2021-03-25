
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './root.reducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware();

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const store = createStore(
	rootReducer, 
	compose(
		applyMiddleware(sagaMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

sagaMiddleware.run(rootSaga);

export default store;