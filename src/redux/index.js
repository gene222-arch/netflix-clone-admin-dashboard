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
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
	rootReducer, 
	{},
	enhancers
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { history, store, persistor }
