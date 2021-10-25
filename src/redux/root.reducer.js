/** Libraries */
import { connectRouter } from 'connected-react-router'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
/** Module Reducers */
import activityLogReducer from './modules/activity-log/reducer'
import accessRightReducer from './modules/access-rights/reducer'
import alertReducer from './modules/alert/reducer'
import authReducer from './modules/auth/reducer'
import authorReducer from './modules/author/reducer'
import castReducer from './modules/cast/reducer'
import comingSoonMovieReducer from './modules/coming-soon-movie/reducer'
import confirmReducer from './modules/confirm/reducer'
import dashboardReducer from './modules/dashboard/reducer'
import directorReducer from './modules/director/reducer'
import employeeReducer from './modules/employee/reducer'
import genreReducer from './modules/genre/reducer'
import mainLayoutReducer from './modules/main-layout/reducer'
import movieReducer from './modules/movie/reducer'
import userReducer from './modules/user/reducer'

const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: [],
    blacklist: ['alert', 'mainLayout', 'router', 'confirm']    
};

const reducers = {
    /** Global reducers */
    router: connectRouter(history),
    alert: alertReducer,
    confirm: confirmReducer,

    /** local reducers */
    activityLog: activityLogReducer,
    accessRight: accessRightReducer,
    auth: authReducer,
    author: authorReducer,
    cast: castReducer,
    comingSoonMovie: comingSoonMovieReducer,
    dashboard: dashboardReducer,
    director: directorReducer,
    employee: employeeReducer,
    genre: genreReducer,
    mainLayout: mainLayoutReducer,
    movie: movieReducer,
    user: userReducer
};

const appReducer = persistCombineReducers(persistConfig, reducers);

const rootReducer = (state, action) => 
{
    if (action.type === 'LOGOUT_SUCCESS') {
        storage.removeItem('persist:root');
        return appReducer(undefined, action);
    }
    
    return appReducer(state, action);
}

export default rootReducer