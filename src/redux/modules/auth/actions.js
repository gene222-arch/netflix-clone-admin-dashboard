import ACTION_TYPES from './action.types';


const { 
    ADD_PROFILE_START,
    ADD_PROFILE_SUCCESS,
    ADD_PROFILE_FAILED,

    AUTH_USER_START,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILED,

    CANCEL_SUBSCRIPTION_START,
    CANCEL_SUBSCRIPTION_SUCCESS,
    CANCEL_SUBSCRIPTION_FAILED,
    
    DELETE_PROFILE_BY_ID_START,
    DELETE_PROFILE_BY_ID_SUCCESS,
    DELETE_PROFILE_BY_ID_FAILED,

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

    CLEAR_ERRORS
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

export const addProfileStart = (payload) => ({
    type: ADD_PROFILE_START,
    payload
});

export const addProfileSuccess = (payload) => ({
    type: ADD_PROFILE_SUCCESS,
    payload
});

export const addProfileFailed = (payload) => ({
    type: ADD_PROFILE_FAILED,
    payload
});

export const cancelSubscriptionStart = () => ({
    type: CANCEL_SUBSCRIPTION_START
});

export const cancelSubscriptionSuccess = (payload) => ({
    type: CANCEL_SUBSCRIPTION_SUCCESS,
    payload
});

export const cancelSubscriptionFailed = (payload) => ({
    type: CANCEL_SUBSCRIPTION_FAILED,
    payload
});

export const deleteProfileByIdStart = (payload) => ({
    type: DELETE_PROFILE_BY_ID_START,
    payload
});

export const deleteProfileByIdSuccess = (payload) => ({
    type: DELETE_PROFILE_BY_ID_SUCCESS,
    payload
});

export const deleteProfileByIdFailed = (payload) => ({
    type: DELETE_PROFILE_BY_ID_FAILED,
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


export const loginViaToken = (payload) => ({
    type: LOGIN_VIA_TOKEN,
    payload
});


/** Manage Profile Lock */
export const manageProfileLockStart = (payload) => ({
    type: MANAGE_PROFILE_LOCK_START,
    payload
});

export const manageProfileLockSuccess = (payload) => ({
    type: MANAGE_PROFILE_LOCK_SUCCESS,
    payload
});

export const manageProfileLockFailed = (payload) => ({
    type: MANAGE_PROFILE_LOCK_FAILED,
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


/**
 * Reset password
 */

export const verifyEmailStart = (payload) => ({
    type: VERIFY_EMAIL_START,
    payload
});

export const verifyEmailSuccess = (payload) => ({
    type: VERIFY_EMAIL_SUCCESS
});

export const verifyEmailFailed = (payload) => ({
    type: VERIFY_EMAIL_FAILED,
    payload
});

export const selectProfileStart = (payload) => ({
    type: SELECT_PROFILE_START,
    payload
});

export const selectProfileSuccess = (payload) => ({
    type: SELECT_PROFILE_SUCCESS,
    payload
});

export const selectProfileFailed = (payload) => ({
    type: SELECT_PROFILE_FAILED,
    payload
});

export const updateUserDetails = (payload) => ({
    type: UPDATE_USER_DETAILS,
    payload
});

export const updateSubscriptionDetails = (payload) => ({
    type: UPDATE_SUBSCRIPTION_DETAILS,
    payload
});

export const updatePaymentAuthorizationStatus = (payload) => ({
    type: UPDATE_PAYMENT_AUTHORIZATION_STATUS,
    payload
});

/** Clear Errors */
export const clearErrors = (payload) => ({
    type: CLEAR_ERRORS,
    payload
});