/** Libraries */
import { connectRouter } from 'connected-react-router'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
/** Module Reducers */
import alertReducer from './modules/alert/reducer'
import authReducer from './modules/auth/reducer'
import authorReducer from './modules/author/reducer'
import castReducer from './modules/cast/reducer'
import comingSoonMovieReducer from './modules/coming-soon-movie/reducer'
import confirmReducer from './modules/confirm/reducer'
import directorReducer from './modules/director/reducer'
import genreReducer from './modules/genre/reducer'
import mainLayoutReducer from './modules/main-layout/reducer'
import movieReducer from './modules/movie/reducer'


const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['alert', 'mainLayout', 'router', 'confirm']    
};

const reducers = {
    /** Global reducers */
    router: connectRouter(history),
    alert: alertReducer,
    confirm: confirmReducer,

    /** local reducers */
    auth: authReducer,
    author: authorReducer,
    cast: castReducer,
    comingSoonMovie: comingSoonMovieReducer,
    director: directorReducer,
    genre: genreReducer,
    mainLayout: mainLayoutReducer,
    movie: movieReducer
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