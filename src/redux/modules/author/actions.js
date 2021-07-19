import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_AUTHORS_START,
    FETCH_ALL_AUTHORS_SUCCESS,
    FETCH_ALL_AUTHORS_FAILED,
    FIND_AUTHOR_BY_ID_START,
    FIND_AUTHOR_BY_ID_SUCCESS,
    FIND_AUTHOR_BY_ID_FAILED,
    CREATE_AUTHOR_START,
    CREATE_AUTHOR_SUCCESS,
    CREATE_AUTHOR_FAILED,
    UPDATE_AUTHOR_START,
    UPDATE_AUTHOR_SUCCESS,
    TOGGLE_AUTHOR_ENABLED_START,
    TOGGLE_AUTHOR_ENABLED_SUCCESS,
    TOGGLE_AUTHOR_ENABLED_FAILED,
    UPDATE_AUTHOR_FAILED,
    DELETE_AUTHORS_START,
    DELETE_AUTHORS_SUCCESS,
    DELETE_AUTHORS_FAILED,
    CLEAR_AUTHOR_ERRORS
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllAuthorsStart = (payload) => ({
    type: FETCH_ALL_AUTHORS_START,
    payload
});

export const fetchAllAuthorsSuccess = (payload) => ({
    type: FETCH_ALL_AUTHORS_SUCCESS,
    payload
});

export const fetchAllAuthorsFailed = (payload) => ({
    type: FETCH_ALL_AUTHORS_FAILED,
    payload
});


/** Find By ID action */
export const findAuthorByIDStart = (payload) => ({
    type: FIND_AUTHOR_BY_ID_START,
    payload
});

export const findAuthorByIDSuccess = (payload) => ({
    type: FIND_AUTHOR_BY_ID_SUCCESS,
    payload
});

export const findAuthorByIDFailed = (payload) => ({
    type: FIND_AUTHOR_BY_ID_FAILED,
    payload
});


/** Create Author action */
export const createAuthorStart = (payload) => ({
    type: CREATE_AUTHOR_START,
    payload
});

export const createAuthorSuccess = (payload) => ({
    type: CREATE_AUTHOR_SUCCESS,
    payload
});

export const createAuthorFailed = (payload) => ({
    type: CREATE_AUTHOR_FAILED,
    payload
});

/** Update Author action */
export const updateAuthorStart = (payload) => ({
    type: UPDATE_AUTHOR_START,
    payload
});

export const updateAuthorSuccess = (payload) => ({
    type: UPDATE_AUTHOR_SUCCESS,
    payload
});

export const updateAuthorFailed = (payload) => ({
    type: UPDATE_AUTHOR_FAILED,
    payload
});

/** Toggle enabled action */
export const toggleAuthorEnabledStart = (payload) => ({
    type: TOGGLE_AUTHOR_ENABLED_START,
    payload
});

export const toggleAuthorEnabledSuccess = (payload) => ({
    type: TOGGLE_AUTHOR_ENABLED_SUCCESS,
    payload
});

export const toggleAuthorEnabledFailed = (payload) => ({
    type: TOGGLE_AUTHOR_ENABLED_FAILED,
    payload
});

/** Delete Author action */
export const deleteAuthorsStart = (payload) => ({
    type: DELETE_AUTHORS_START,
    payload
});

export const deleteAuthorsSuccess = (payload) => ({
    type: DELETE_AUTHORS_SUCCESS,
    payload
});

export const deleteAuthorsFailed = (payload) => ({
    type: DELETE_AUTHORS_FAILED,
    payload
});

/** Clear Author errors */

export const clearAuthorErrors = (payload) => ({
    type: CLEAR_AUTHOR_ERRORS,
    payload
});
