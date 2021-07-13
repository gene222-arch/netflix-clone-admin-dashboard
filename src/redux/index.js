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

const history = createBrowserHistory();

const store = createStore(
	rootReducer, 
	{},
	compose(
		applyMiddleware(
			routerMiddleware(history),
			sagaMiddleware,
			/** ...other middlewares */
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { history, store, persistor }
