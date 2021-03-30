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


/**
 * Fetch the authenticated user and permissions
 * 
 * @returns { object }
 */

export const authUser = () => ({
    type: AUTH_USER_START
});

export const authUserSuccess = (payload) => ({
    type: AUTH_USER_SUCCESS,
    payload
});

export const authUserFailed = (payload) => ({
    type: AUTH_USER_FAILED,
    payload
});


/**
 * Reset password
 */

export const forgotPassword = (payload) => ({
    type: FORGOT_PASSWORD_START,
    payload
});

export const forgotPasswordSuccess = () => ({
    type: FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFailed = (payload) => ({
    type: FORGOT_PASSWORD_FAILED,
    payload
});

/**
 * Signing in/Login
 */
export const login = (payload) => ({
    type: LOGIN_START,
    payload
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailed = (payload) => ({
    type: LOGIN_FAILED,
    payload
});


/**
 * Signing out/Logout
 */

export const logoutStart = () => ({
    type: LOGOUT_START
});

export const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload
});

export const logoutFailed = (payload) => ({
    type: LOGOUT_FAILED,
    payload
});


/**
 * Registration
 */
 export const register = (payload) => ({
    type: REGISTER_START,
    payload
});

export const registrationSuccess = (payload) => ({
    type: REGISTRATION_SUCCESS,
    payload
});

export const registrationFailed = (payload) => ({
    type: REGISTRATION_FAILED,
    payload
});


/**
 * Reset password
 */

 export const resetPassword = (payload) => ({
    type: RESET_PASSWORD_START,
    payload
});

export const resetPasswordSuccess = (payload) => ({
    type: RESET_PASSWORD_SUCCESS
});

export const resetPasswordFailed = (payload) => ({
    type: RESET_PASSWORD_FAILED,
    payload
});