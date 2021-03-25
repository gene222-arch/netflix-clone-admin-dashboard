import { combineReducers } from 'redux';

/** Reducers */
import authenticatedUserReducer from './modules/auth/reducer'
import bugTrackerReducer from './modules/bug-tracker/reducer';
import postReducer from './modules/posts/reducer'
import userReducer from './modules/users/reducer'


const rootReducer = combineReducers({
    bug: bugTrackerReducer,
    post: postReducer,
    user: authenticatedUserReducer,
    users: userReducer,
});

export default rootReducer;