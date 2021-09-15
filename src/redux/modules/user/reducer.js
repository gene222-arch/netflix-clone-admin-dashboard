import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_USERS_START,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILED,
    UPDATE_USER_EMAIL_START,
    UPDATE_USER_EMAIL_SUCCESS,
    UPDATE_USER_EMAIL_FAILED,
    UPDATE_USER_PASSWORD_START,
    UPDATE_USER_PASSWORD_SUCCESS,
    UPDATE_USER_PASSWORD_FAILED,
    CLEAR_USER_ERRORS
} = ACTION_TYPES;

const USER_DEFAULT_PROPS = {

};

const initialState = {
    user: USER_DEFAULT_PROPS,
    users: [],
    isLoading: false,
    error: USER_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        users
    } = state;

    const isLoading = false;
    const error = USER_DEFAULT_PROPS;
    let UPDATED_USERS = [];
    
    switch (type) 
    {
        
        case FETCH_ALL_USERS_START:
        case UPDATE_USER_EMAIL_START:
        case UPDATE_USER_PASSWORD_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: payload.users,
                isLoading,
                error 
            }

        case UPDATE_USER_EMAIL_SUCCESS:

            UPDATED_USERS = users.map(user => {
                return user.id === payload.user_id 
                    ? { ...user, email: payload.email }
                    : user;
            });

            return {
                ...state,
                users: UPDATED_USERS,
                isLoading,
                error
            }

        case UPDATE_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }

        case CLEAR_USER_ERRORS: 
            return {
                ...state,
                error
            }

        case FETCH_ALL_USERS_FAILED:
        case UPDATE_USER_EMAIL_FAILED:
        case UPDATE_USER_PASSWORD_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
