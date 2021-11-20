import ACTION_TYPES from './action.types';
import storage from 'redux-persist/lib/storage'

const { 
    ADD_PROFILE_START,
    ADD_PROFILE_SUCCESS,
    ADD_PROFILE_FAILED,

    AUTH_USER_START,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILED,

    BROADCAST_CREATE_PROFILE,
    BROADCAST_DELETE_PROFILE_BY_ID,
    BROADCAST_UPDATE_PROFILE,

    CANCEL_SUBSCRIPTION_START,
    CANCEL_SUBSCRIPTION_SUCCESS,
    CANCEL_SUBSCRIPTION_FAILED,

    DELETE_PROFILE_BY_ID_START,
    DELETE_PROFILE_BY_ID_SUCCESS,
    DELETE_PROFILE_BY_ID_FAILED,

    DELETE_SELECTED_PROFILE,

    DISABLE_PROFILES_START,
    DISABLE_PROFILES_SUCCESS,
    DISABLE_PROFILES_FAILED,

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

    UPDATE_USER_DETAILS,

    VERIFY_EMAIL_START,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILED,

    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,

    LOGIN_VIA_TOKEN,

    UPDATE_SUBSCRIPTION_DETAILS,

    UPDATE_PAYMENT_AUTHORIZATION_STATUS,

    UPDATE_PROFILE_BY_ID_START,
    UPDATE_PROFILE_BY_ID_SUCCESS,
    UPDATE_PROFILE_BY_ID_FAILED,

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
    id: '',
    user_id: '',
    name: '',
    avatar: null,
    is_for_kids: false,
    is_profile_locked: false,
    pin_code: ''
};

const SUBSCRIPTION_DETAILS_DEFAULT_PROPS = {
    id: '',
    user_id: '',
    type: '',
    cost: '',
    is_first_subscription: false,
    is_cancelled: false,
    is_expired: false,
    subscribed_at: null,
    expired_at: null,
    cancelled_at: null,
    status: 'subscribed'
};

const initialState = 
{
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT,
    permissions: null,
    payment_authorization_status: 'disabled',
    user: null,
    subscription_details: SUBSCRIPTION_DETAILS_DEFAULT_PROPS,
    selectedProfile: PROFILE_PROPS,
    profile: PROFILE_PROPS,
    profiles: [],
    isLoading: false,
    error: ERROR_DEFAULT,
    role: null
};


export default (state = initialState, { type, payload }) => 
{
    const isLoading = false;
    const error = ERROR_DEFAULT;

    let currentProfiles = [ ...state.profiles ];

    switch (type) 
    {
        case ADD_PROFILE_START:
        case AUTH_USER_START:
        case CANCEL_SUBSCRIPTION_START:
        case DELETE_PROFILE_BY_ID_START:
        case DISABLE_PROFILES_START:
        case LOGIN_START: 
        case LOGOUT_START:
        case MANAGE_PROFILE_LOCK_START:
        case REGISTER_START:
        case FORGOT_PASSWORD_START:
        case RESET_PASSWORD_START:
        case SELECT_PROFILE_START:
        case VERIFY_EMAIL_START:
        case UPDATE_PROFILE_BY_ID_START:
            return {
                ...state,
                isLoading: true,
            };

        case ADD_PROFILE_SUCCESS:
            return {
                ...state,
                profiles: [
                    ...state.profiles,
                    payload.profile
                ],
                isLoading,
                error
            }
    
        case AUTH_USER_SUCCESS:
        case LOGIN_SUCCESS: 
            const { user, role, permissions, profiles } = payload;

            return {
                ...state,
                isLoading,
                isAuthenticated: true,
                user,
                profiles,
                subscription_details: payload.subscription_details,
                role,
                permissions,
                error,
            };


        case BROADCAST_CREATE_PROFILE:
            currentProfiles = [ ...state.profiles, payload.profile ];

            return {
                ...state,
                profiles: currentProfiles,
                isLoading,
                error
            }

        case BROADCAST_UPDATE_PROFILE:
            const payloadProfile = payload.profile;
            currentProfiles = currentProfiles.map(profile => profile.id === payload.profile.id ? payloadProfile : profile);

            return {
                ...state,
                profiles: currentProfiles,
                isLoading,
                error
            }

        case BROADCAST_DELETE_PROFILE_BY_ID:
            currentProfiles = currentProfiles.filter(({ id }) => id !== payload.id)

            return {
                ...state,
                profiles: currentProfiles,
                isLoading,
                error
            }
            
        case CANCEL_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                subscription_details: {
                    ...state.subscription_details,
                    ...payload.subscription_details
                },
                isLoading,
                error
            }

        case DELETE_PROFILE_BY_ID_SUCCESS:
            const filterProfiles = state.profiles.filter(({ id }) => id !== payload.profile_id);
            return {
                ...state,
                profiles: filterProfiles,
                isLoading,
                error
            }

        case DELETE_SELECTED_PROFILE:
            return {
                ...state,
                selectedProfile: PROFILE_PROPS,
                isLoading,
                error
            }

        case DISABLE_PROFILES_SUCCESS:
            const filterProfileEnabledProp = state
                .profiles
                .map(profile => (
                    payload.profileIds.include(profile.id)
                        ? { ...profile, enabled: 0 }
                        : profile
                ))

            return {
                ...state,
                profiles: filterProfileEnabledProp,
                isLoading,
                error
            }
        
        case AUTH_USER_FAILED:
        case LOGIN_FAILED: 
            return {
                ...state,
                isLoading,
                isAuthenticated: false,
                user: null,
                error: payload.errorMessages,
            };

        case LOGIN_VIA_TOKEN:

            return {
                ...state,
                isLoading,
                isAuthenticated: true,
                user: payload.user,
                profiles: payload.profiles,
                selectedProfile: payload.selectedProfile,
                subscription_details: payload.subscription_details,
                role: payload.role,
                error,
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

        case UPDATE_USER_DETAILS:
            return {
                ...state,
                user: { ...state.user, ...payload },
                isLoading,
                error 
            }
        
        case UPDATE_PROFILE_BY_ID_SUCCESS:
            const updateProfiles = state.profiles.map(profile => {
                return profile.id === payload.profile.id 
                    ? ({
                        ...profile,
                        ...payload.profile
                    })
                    : profile
            });

            const selectedProfile = state.selectedProfile.id === payload.profile.id 
                ? payload.profile 
                : state.selectedProfile;

            return {
                ...state,
                profiles: updateProfiles,
                selectedProfile,
                isLoading,
                error
            }
            
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
        case REGISTRATION_SUCCESS: 
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading,
                error,
            };
            
        case ADD_PROFILE_FAILED:
        case CANCEL_SUBSCRIPTION_FAILED:
        case DELETE_PROFILE_BY_ID_FAILED:
        case DISABLE_PROFILES_FAILED:
        case FORGOT_PASSWORD_FAILED:
        case MANAGE_PROFILE_LOCK_FAILED:
        case REGISTRATION_FAILED:         
        case RESET_PASSWORD_FAILED:
        case SELECT_PROFILE_FAILED:
        case VERIFY_EMAIL_FAILED:
        case UPDATE_PROFILE_BY_ID_FAILED:
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

        case UPDATE_SUBSCRIPTION_DETAILS: 
            return {
                ...state,
                subscription_details: {
                    ...state.subscription_details,
                    ...payload.subscription_details
                },
                payment_authorization_status: 'disabled',
                isLoading,
                error
            }

        case UPDATE_PAYMENT_AUTHORIZATION_STATUS:
                return {
                    ...state,
                    isLoading,
                    error,
                    payment_authorization_status: payload.payment_authorization_status
                }

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
