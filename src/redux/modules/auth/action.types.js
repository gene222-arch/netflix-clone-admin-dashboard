const ACTION_TYPES = 
{
    AUTH_USER_START: 'AUTH_USER_START',
    AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS',
    AUTH_USER_FAILED: 'AUTH_USER_FAILED',

    FORGOT_PASSWORD_START: 'FORGOT_PASSWORD_START',
    FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED',

    RESET_PASSWORD_START: 'RESET_PASSWORD_START',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED',

    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',

    REGISTER_START: 'REGISTER_START',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILED: 'REGISTRATION_FAILED',

    LOGOUT_START: 'LOGOUT_START',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILED: 'LOGOUT_FAILED',

    MANAGE_PROFILE_LOCK_START: 'MANAGE_PROFILE_LOCK_START',
    MANAGE_PROFILE_LOCK_SUCCESS: 'MANAGE_PROFILE_LOCK_SUCCESS',
    MANAGE_PROFILE_LOCK_FAILED: 'MANAGE_PROFILE_LOCK_FAILED',

    VERIFIY_EMAIL_START: 'VERIFIY_EMAIL_START',
    VERIFIY_EMAIL_SUCCESS: 'VERIFIY_EMAIL_SUCCESS',
    VERIFY_EMAIL_FAILED: 'VERIFY_EMAIL_FAILED',

    SELECT_PROFILE_START: 'SELECT_PROFILE_START',
    SELECT_PROFILE_SUCCESS: 'SELECT_PROFILE_SUCCESS',
    SELECT_PROFILE_FAILED: 'SELECT_PROFILE_FAILED',

    UPDATE_USER_DETAILS: 'UPDATE_USER_DETAILS',

    LOGIN_VIA_TOKEN: 'LOGIN_VIA_TOKEN',

    CLEAR_ERRORS: 'CLEAR_ERRORS'
};

export default ACTION_TYPES;