import ACTION_TYPES from './action.types';

const { 
    
    AUTH_USER_START,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILED,

    FORGOT_PASSWORD_START,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,

    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,

    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    REGISTER_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,

    RESET_PASSWORD_START,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

} = ACTION_TYPES;


const ERROR_DEFAULT = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

const initialState = 
{
    isLoading: false,
    isAuthenticated: false,
    user: null,
    permissions: null,
    error: ERROR_DEFAULT,
};


export default (state = initialState, { type, payload }) => 
{
    switch (type) 
    {
        case AUTH_USER_START:
        case LOGIN_START: 
        case LOGOUT_START:
        case REGISTER_START:
        case FORGOT_PASSWORD_START:
        case RESET_PASSWORD_START:
            return {
                ...state,
                isLoading: true,
            };
    
        case AUTH_USER_SUCCESS:
        case LOGIN_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: payload.user,
                permissions: payload.permissions,
                error: ERROR_DEFAULT,
            };
            
        case AUTH_USER_FAILED:
        case LOGIN_FAILED: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                error: payload.errorMessages,
            };
            
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT,
            };   

        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };   
            
        case REGISTRATION_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: payload.user,
                permissions: payload.permissions,
                error: ERROR_DEFAULT,
            };
            
        case REGISTRATION_FAILED: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: ERROR_DEFAULT,
                error: payload.errorMessages
            };            
            
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: ERROR_DEFAULT,
            };   

        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };   

        case LOGOUT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                error: ERROR_DEFAULT
            };
            
        case LOGOUT_FAILED: 
            return {
                ...state,
                isLoading: false,
                error: payload.errorMessages
            };
            
        default:
            return state;
    }
}
