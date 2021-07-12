/** Libraries */
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

/** Root sagas, reducers */
import rootReducer from './root.reducer'
import rootSaga from './rootSaga'


export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export const configureStore = (preloadedState) =>
{
	const store = createStore(
		rootReducer(history), 
		preloadedState,
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

	return store;
}

