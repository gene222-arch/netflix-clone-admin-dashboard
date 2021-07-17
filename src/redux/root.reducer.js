/** Libraries */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
/** Module Reducers */
import alertReducer from './modules/alert/reducer'
import authReducer from './modules/auth/reducer'
import authorReducer from './modules/author/reducer'
import mainLayoutReducer from './modules/main-layout/reducer'

const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['alert', 'mainLayout', 'router', 'author']
};

const rootReducer = {
    /** Global reducers */
    router: connectRouter(history),
    alert: alertReducer,

    /** reducers */
    auth: authReducer,
    author: authorReducer,
    mainLayout: mainLayoutReducer
};

export default persistCombineReducers(persistConfig, rootReducer);