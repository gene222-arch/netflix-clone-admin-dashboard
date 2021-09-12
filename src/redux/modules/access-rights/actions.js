import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_ACCESS_RIGHTS_START,
    FETCH_ALL_ACCESS_RIGHTS_SUCCESS,
    FETCH_ALL_ACCESS_RIGHTS_FAILED,
    FIND_ACCESS_RIGHT_BY_ID_START,
    FIND_ACCESS_RIGHT_BY_ID_SUCCESS,
    FIND_ACCESS_RIGHT_BY_ID_FAILED,
    CREATE_ACCESS_RIGHT_START,
    CREATE_ACCESS_RIGHT_SUCCESS,
    CREATE_ACCESS_RIGHT_FAILED,
    UPDATE_ACCESS_RIGHT_START,
    UPDATE_ACCESS_RIGHT_SUCCESS,
    UPDATE_ACCESS_RIGHT_FAILED,
    DELETE_ACCESS_RIGHTS_START,
    DELETE_ACCESS_RIGHTS_SUCCESS,
    DELETE_ACCESS_RIGHTS_FAILED,
    CLEAR_ACCESS_RIGHT_ERRORS
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllAccessRightsStart = (payload) => ({
    type: FETCH_ALL_ACCESS_RIGHTS_START,
    payload
});

export const fetchAllAccessRightsSuccess = (payload) => ({
    type: FETCH_ALL_ACCESS_RIGHTS_SUCCESS,
    payload
});

export const fetchAllAccessRightsFailed = (payload) => ({
    type: FETCH_ALL_ACCESS_RIGHTS_FAILED,
    payload
});


/** Find By ID action */
export const findAccessRightByIDStart = (payload) => ({
    type: FIND_ACCESS_RIGHT_BY_ID_START,
    payload
});

export const findAccessRightByIDSuccess = (payload) => ({
    type: FIND_ACCESS_RIGHT_BY_ID_SUCCESS,
    payload
});

export const findAccessRightByIDFailed = (payload) => ({
    type: FIND_ACCESS_RIGHT_BY_ID_FAILED,
    payload
});


/** Create AccessRight action */
export const createAccessRightStart = (payload) => ({
    type: CREATE_ACCESS_RIGHT_START,
    payload
});

export const createAccessRightSuccess = (payload) => ({
    type: CREATE_ACCESS_RIGHT_SUCCESS,
    payload
});

export const createAccessRightFailed = (payload) => ({
    type: CREATE_ACCESS_RIGHT_FAILED,
    payload
});

/** Update AccessRight action */
export const updateAccessRightStart = (payload) => ({
    type: UPDATE_ACCESS_RIGHT_START,
    payload
});

export const updateAccessRightSuccess = (payload) => ({
    type: UPDATE_ACCESS_RIGHT_SUCCESS,
    payload
});

export const updateAccessRightFailed = (payload) => ({
    type: UPDATE_ACCESS_RIGHT_FAILED,
    payload
});

export const toggleAccessRightEnabledFailed = (payload) => ({
    type: TOGGLE_ACCESS_RIGHT_ENABLED_FAILED,
    payload
});

/** Delete Access Right action */
export const deleteAccessRightsStart = (payload) => ({
    type: DELETE_ACCESS_RIGHTS_START,
    payload
});

export const deleteAccessRightsSuccess = (payload) => ({
    type: DELETE_ACCESS_RIGHTS_SUCCESS,
    payload
});

export const deleteAccessRightsFailed = (payload) => ({
    type: DELETE_ACCESS_RIGHTS_FAILED,
    payload
});

/** Clear AccessRight errors */

export const clearAccessRightErrors = (payload) => ({
    type: CLEAR_ACCESS_RIGHT_ERRORS,
    payload
});
