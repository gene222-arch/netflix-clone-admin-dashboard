import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_DIRECTORS_START,
    FETCH_ALL_DIRECTORS_SUCCESS,
    FETCH_ALL_DIRECTORS_FAILED,
    FIND_DIRECTOR_BY_ID_START,
    FIND_DIRECTOR_BY_ID_SUCCESS,
    FIND_DIRECTOR_BY_ID_FAILED,
    CREATE_DIRECTOR_START,
    CREATE_DIRECTOR_SUCCESS,
    CREATE_DIRECTOR_FAILED,
    UPDATE_DIRECTOR_START,
    UPDATE_DIRECTOR_SUCCESS,
    UPDATE_DIRECTOR_FAILED,
    RESTORE_DIRECTORS_START,
    RESTORE_DIRECTORS_SUCCESS,
    RESTORE_DIRECTORS_FAILED,
    TOGGLE_DIRECTOR_ENABLED_START,
    TOGGLE_DIRECTOR_ENABLED_SUCCESS,
    TOGGLE_DIRECTOR_ENABLED_FAILED,
    DELETE_DIRECTORS_START,
    DELETE_DIRECTORS_SUCCESS,
    DELETE_DIRECTORS_FAILED,
    CLEAR_DIRECTOR_ERRORS
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllDirectorsStart = (payload) => ({
    type: FETCH_ALL_DIRECTORS_START,
    payload
});

export const fetchAllDirectorsSuccess = (payload) => ({
    type: FETCH_ALL_DIRECTORS_SUCCESS,
    payload
});

export const fetchAllDirectorsFailed = (payload) => ({
    type: FETCH_ALL_DIRECTORS_FAILED,
    payload
});


/** Find By ID action */
export const findDirectorByIDStart = (payload) => ({
    type: FIND_DIRECTOR_BY_ID_START,
    payload
});

export const findDirectorByIDSuccess = (payload) => ({
    type: FIND_DIRECTOR_BY_ID_SUCCESS,
    payload
});

export const findDirectorByIDFailed = (payload) => ({
    type: FIND_DIRECTOR_BY_ID_FAILED,
    payload
});


/** Create Director action */
export const createDirectorStart = (payload) => ({
    type: CREATE_DIRECTOR_START,
    payload
});

export const createDirectorSuccess = (payload) => ({
    type: CREATE_DIRECTOR_SUCCESS,
    payload
});

export const createDirectorFailed = (payload) => ({
    type: CREATE_DIRECTOR_FAILED,
    payload
});

/** Update Director action */
export const updateDirectorStart = (payload) => ({
    type: UPDATE_DIRECTOR_START,
    payload
});

export const updateDirectorSuccess = (payload) => ({
    type: UPDATE_DIRECTOR_SUCCESS,
    payload
});

export const updateDirectorFailed = (payload) => ({
    type: UPDATE_DIRECTOR_FAILED,
    payload
});

export const restoreDirectorsStart = (payload) => ({
    type: RESTORE_DIRECTORS_START,
    payload
});

export const restoreDirectorsSuccess = (payload) => ({
    type: RESTORE_DIRECTORS_SUCCESS,
    payload
});

export const restoreDirectorsFailed = (payload) => ({
    type: RESTORE_DIRECTORS_FAILED,
    payload
});

/** Toggle enabled action */
export const toggleDirectorEnabledStart = (payload) => ({
    type: TOGGLE_DIRECTOR_ENABLED_START,
    payload
});

export const toggleDirectorEnabledSuccess = (payload) => ({
    type: TOGGLE_DIRECTOR_ENABLED_SUCCESS,
    payload
});

export const toggleDirectorEnabledFailed = (payload) => ({
    type: TOGGLE_DIRECTOR_ENABLED_FAILED,
    payload
});

/** Delete Director action */
export const deleteDirectorsStart = (payload) => ({
    type: DELETE_DIRECTORS_START,
    payload
});

export const deleteDirectorsSuccess = (payload) => ({
    type: DELETE_DIRECTORS_SUCCESS,
    payload
});

export const deleteDirectorsFailed = (payload) => ({
    type: DELETE_DIRECTORS_FAILED,
    payload
});


/** Clear Director errors */
export const clearDirectorErrors = (payload) => ({
    type: CLEAR_DIRECTOR_ERRORS,
    payload
});