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

    MANAGE_PROFILE_LOCK_START,
    MANAGE_PROFILE_LOCK_SUCCESS,
    MANAGE_PROFILE_LOCK_FAILED,

    REGISTER_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,

    RESET_PASSWORD_START,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    VERIFIY_EMAIL_START,
    VERIFIY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILED,

    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,

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

const PROFILE_PROPS = {
    user_id: '',
    name: '',
    avatar: null,
    is_for_kids: false,
    is_profile_locked: false,
    pin_code: ''
};

const initialState = 
{
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT,
    permissions: null,
    user: null,
    selectedProfile: PROFILE_PROPS,
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
        case MANAGE_PROFILE_LOCK_START:
        case REGISTER_START:
        case FORGOT_PASSWORD_START:
        case RESET_PASSWORD_START:
        case SELECT_PROFILE_START:
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

        case MANAGE_PROFILE_LOCK_SUCCESS:
            const { user_profile_id, pin_code, is_profile_locked } = payload;

            const newProfiles = state
                .profiles
                .map(profile => (
                    profile.id === user_profile_id
                        ? { ...profile, is_profile_locked, pin_code }
                        : profile
                ))
            
            return {
                ...state,
                profiles: newProfiles,
                isLoading,
                error
            }

        case SELECT_PROFILE_SUCCESS:

            return {
                ...state,
                isLoading,
                error, 
                selectedProfile: payload.profile
            }
            
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
        case REGISTRATION_SUCCESS: 
        case VERIFIY_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading,
                error,
            };
            
        case FORGOT_PASSWORD_FAILED:
        case MANAGE_PROFILE_LOCK_FAILED:
        case REGISTRATION_FAILED:         
        case RESET_PASSWORD_FAILED:
        case SELECT_PROFILE_FAILED:
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
