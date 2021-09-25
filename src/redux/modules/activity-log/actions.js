import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_ACTIVITY_LOGS_START,
    FETCH_ALL_ACTIVITY_LOGS_SUCCESS,
    FETCH_ALL_ACTIVITY_LOGS_FAILED,
    FIND_ACTIVITY_LOG_BY_ID_START,
    FIND_ACTIVITY_LOG_BY_ID_SUCCESS,
    FIND_ACTIVITY_LOG_BY_ID_FAILED,
    CREATE_ACTIVITY_LOG_START,
    CREATE_ACTIVITY_LOG_SUCCESS,
    CREATE_ACTIVITY_LOG_FAILED,
    UPDATE_ACTIVITY_LOG_START,
    UPDATE_ACTIVITY_LOG_SUCCESS,
    UPDATE_ACTIVITY_LOG_FAILED,
    DELETE_ACTIVITY_LOGS_START,
    DELETE_ACTIVITY_LOGS_SUCCESS,
    DELETE_ACTIVITY_LOGS_FAILED,
    CLEAR_ACTIVITY_LOG_ERRORS
} = ACTION_TYPES;

/** Fetch All action */
export const fetchAllActivityLogsStart = (payload) => ({
    type: FETCH_ALL_ACTIVITY_LOGS_START,
    payload
});

export const fetchAllActivityLogsSuccess = (payload) => ({
    type: FETCH_ALL_ACTIVITY_LOGS_SUCCESS,
    payload
});

export const fetchAllActivityLogsFailed = (payload) => ({
    type: FETCH_ALL_ACTIVITY_LOGS_FAILED,
    payload
});

/** Find By ID action */
export const findActivityLogByIDStart = (payload) => ({
    type: FIND_ACTIVITY_LOG_BY_ID_START,
    payload
});

export const findActivityLogByIDSuccess = (payload) => ({
    type: FIND_ACTIVITY_LOG_BY_ID_SUCCESS,
    payload
});

export const findActivityLogByIDFailed = (payload) => ({
    type: FIND_ACTIVITY_LOG_BY_ID_FAILED,
    payload
});


/** Create ActivityLog action */
export const createActivityLogStart = (payload) => ({
    type: CREATE_ACTIVITY_LOG_START,
    payload
});

export const createActivityLogSuccess = (payload) => ({
    type: CREATE_ACTIVITY_LOG_SUCCESS,
    payload
});

export const createActivityLogFailed = (payload) => ({
    type: CREATE_ACTIVITY_LOG_FAILED,
    payload
});

/** Update ActivityLog action */
export const updateActivityLogStart = (payload) => ({
    type: UPDATE_ACTIVITY_LOG_START,
    payload
});

export const updateActivityLogSuccess = (payload) => ({
    type: UPDATE_ACTIVITY_LOG_SUCCESS,
    payload
});

export const updateActivityLogFailed = (payload) => ({
    type: UPDATE_ACTIVITY_LOG_FAILED,
    payload
});

/** Delete Access Right action */
export const deleteActivityLogsStart = (payload) => ({
    type: DELETE_ACTIVITY_LOGS_START,
    payload
});

export const deleteActivityLogsSuccess = (payload) => ({
    type: DELETE_ACTIVITY_LOGS_SUCCESS,
    payload
});

export const deleteActivityLogsFailed = (payload) => ({
    type: DELETE_ACTIVITY_LOGS_FAILED,
    payload
});

/** Clear ActivityLog errors */

export const clearActivityLogErrors = (payload) => ({
    type: CLEAR_ACTIVITY_LOG_ERRORS,
    payload
});
