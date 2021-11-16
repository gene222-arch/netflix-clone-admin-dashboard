/** Libraries */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistStore } from 'redux-persist'

/** Root sagas, reducers */
import rootReducer from './root.reducer'
import rootSaga from './rootSaga'


const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory(); // Allow redirection in saga

const middlewares = applyMiddleware(
	routerMiddleware(history),
	sagaMiddleware,
	/** ...other middlewares */
);

const enhancers = compose(
	middlewares,
	(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) && 
	window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
	rootReducer, 
	{},
	enhancers
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { history, store, persistor }
