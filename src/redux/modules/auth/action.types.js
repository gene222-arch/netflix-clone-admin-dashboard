const ACTION_TYPES = 
{
    ADD_PROFILE_START: 'ADD_PROFILE_START',
    ADD_PROFILE_SUCCESS: 'ADD_PROFILE_SUCCESS',
    ADD_PROFILE_FAILED: 'ADD_PROFILE_FAILED',

    AUTH_USER_START: 'AUTH_USER_START',
    AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS',
    AUTH_USER_FAILED: 'AUTH_USER_FAILED',

    BROADCAST_CREATE_PROFILE: 'CREATE_PROFILE',
    BROADCAST_DELETE_PROFILE_BY_ID: 'DELETE_PROFILE_BY_ID',
    BROADCAST_UPDATE_PROFILE: 'BROADCAST_UPDATE_PROFILE',

    CANCEL_SUBSCRIPTION_START: 'CANCEL_SUBSCRIPTION_START',
    CANCEL_SUBSCRIPTION_SUCCESS: 'CANCEL_SUBSCRIPTION_SUCCESS',
    CANCEL_SUBSCRIPTION_FAILED: 'CANCEL_SUBSCRIPTION_FAILED',

    DELETE_PROFILE_BY_ID_START: 'DELETE_PROFILE_BY_ID_START',
    DELETE_PROFILE_BY_ID_SUCCESS: 'DELETE_PROFILE_BY_ID_SUCCESS',
    DELETE_PROFILE_BY_ID_FAILED: 'DELETE_PROFILE_BY_ID_FAILED',

    DELETE_SELECTED_PROFILE: 'DELETE_SELECTED_PROFILE',

    DISABLE_PROFILES_START: 'DISABLE_PROFILES_START',
    DISABLE_PROFILES_SUCCESS: 'DISABLE_PROFILES_SUCCESS',
    DISABLE_PROFILES_FAILED: 'DISABLE_PROFILES_FAILED',

    FORGOT_PASSWORD_START: 'FORGOT_PASSWORD_START',
    FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED',
    
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',

    LOGIN_VIA_TOKEN: 'LOGIN_VIA_TOKEN',

    LOGOUT_START: 'LOGOUT_START',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILED: 'LOGOUT_FAILED',

    MANAGE_PROFILE_LOCK_START: 'MANAGE_PROFILE_LOCK_START',
    MANAGE_PROFILE_LOCK_SUCCESS: 'MANAGE_PROFILE_LOCK_SUCCESS',
    MANAGE_PROFILE_LOCK_FAILED: 'MANAGE_PROFILE_LOCK_FAILED',

    REGISTER_START: 'REGISTER_START',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILED: 'REGISTRATION_FAILED',

    RESET_PASSWORD_START: 'RESET_PASSWORD_START',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED',

    SELECT_PROFILE_START: 'SELECT_PROFILE_START',
    SELECT_PROFILE_SUCCESS: 'SELECT_PROFILE_SUCCESS',
    SELECT_PROFILE_FAILED: 'SELECT_PROFILE_FAILED',

    UPDATE_USER_DETAILS: 'UPDATE_USER_DETAILS',

    UPDATE_SUBSCRIPTION_DETAILS: 'UPDATE_SUBSCRIPTION_DETAILS',

    UPDATE_PAYMENT_AUTHORIZATION_STATUS: 'UPDATE_PAYMENT_AUTHORIZATION_STATUS',

    UPDATE_PROFILE_BY_ID_START: 'UPDATE_PROFILE_BY_ID_START',
    UPDATE_PROFILE_BY_ID_SUCCESS: 'UPDATE_PROFILE_BY_ID_SUCCESS',
    UPDATE_PROFILE_BY_ID_FAILED: 'UPDATE_PROFILE_BY_ID_FAILED',

    VERIFY_EMAIL_START: 'VERIFY_EMAIL_START',
    VERIFY_EMAIL_SUCCESS: 'VERIFY_EMAIL_SUCCESS',
    VERIFY_EMAIL_FAILED: 'VERIFY_EMAIL_FAILED',

    CLEAR_ERRORS: 'CLEAR_ERRORS'
};

export default ACTION_TYPES;