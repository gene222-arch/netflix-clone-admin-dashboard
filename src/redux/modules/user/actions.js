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


/** Fetch All action */
export const fetchAllUsersStart = (payload) => ({
    type: FETCH_ALL_USERS_START,
    payload
});

export const fetchAllUsersSuccess = (payload) => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload
});

export const fetchAllUsersFailed = (payload) => ({
    type: FETCH_ALL_USERS_FAILED,
    payload
});

/** Update User Email */
export const updateUserEmailStart = (payload) => ({
    type: UPDATE_USER_EMAIL_START,
    payload
});

export const updateUserEmailSuccess = (payload) => ({
    type: UPDATE_USER_EMAIL_SUCCESS,
    payload
});

export const updateUserEmailFailed = (payload) => ({
    type: UPDATE_USER_EMAIL_FAILED,
    payload
});


/** Update User Password */
export const updateUserPasswordStart = (payload) => ({
    type: UPDATE_USER_PASSWORD_START,
    payload
});

export const updateUserPasswordSuccess = (payload) => ({
    type: UPDATE_USER_PASSWORD_SUCCESS,
    payload
});

export const updateUserPasswordFailed = (payload) => ({
    type: UPDATE_USER_PASSWORD_FAILED,
    payload
});

/** Clear User errors */

export const clearUserErrors = (payload) => ({
    type: CLEAR_USER_ERRORS,
    payload
});
