import ACTION_TYPES from './action.types';
import storage from 'redux-persist/lib/storage'

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

    VERIFIY_EMAIL_START,
    VERIFIY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILED,

    CLEAR_ERRORS
} = ACTION_TYPES;


const CREDENTIALS_DEFAULT = {
    email: '',
    password: '',
    remember_me: false
};

const ERROR_DEFAULT = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
};

const initialState = 
{
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT,
    permissions: null,
    user: null,
    profiles: [],
    isLoading: false,
    error: ERROR_DEFAULT,
    role: null
};


export default (state = initialState, { type, payload }) => 
{
    const isLoading = false;
    const error = ERROR_DEFAULT;

    switch (type) 
    {
        case AUTH_USER_START:
        case LOGIN_START: 
        case LOGOUT_START:
        case REGISTER_START:
        case FORGOT_PASSWORD_START:
        case RESET_PASSWORD_START:
        case VERIFIY_EMAIL_START:
            return {
                ...state,
                isLoading: true,
            };
    
        case AUTH_USER_SUCCESS:
        case LOGIN_SUCCESS: 
            const { user, role, permissions, profiles } = payload;

            return {
                ...state,
                isLoading,
                isAuthenticated: true,
                user,
                profiles,
                role,
                permissions,
                error,
            };
            
        case AUTH_USER_FAILED:
        case LOGIN_FAILED: 
            return {
                ...state,
                isLoading,
                isAuthenticated: false,
                user: null,
                error: payload.errorMessages,
            };
            
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
        case REGISTRATION_SUCCESS: 
        case VERIFIY_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading,
                error,
            };
            
        case REGISTRATION_FAILED:         
        case FORGOT_PASSWORD_FAILED:
        case RESET_PASSWORD_FAILED:
        case VERIFY_EMAIL_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.errorMessages
            };   

        case LOGOUT_SUCCESS: 
            return {
                ...state,
                isLoading,
                isAuthenticated: false,
                user: null,
                error
            };
            
        case LOGOUT_FAILED: 
            return {
                ...state,
                isLoading,
                isAuthenticated: false,
                error: payload.errorMessages
            };

        case CLEAR_ERRORS:
                return {
                    ...state,
                    isLoading,
                    error
                }
            
        default:
            return state;
    }
}
