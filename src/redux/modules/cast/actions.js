import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_CASTS_START,
    FETCH_ALL_CASTS_SUCCESS,
    FETCH_ALL_CASTS_FAILED,
    FIND_CAST_BY_ID_START,
    FIND_CAST_BY_ID_SUCCESS,
    FIND_CAST_BY_ID_FAILED,
    CREATE_CAST_START,
    CREATE_CAST_SUCCESS,
    CREATE_CAST_FAILED,
    UPDATE_CAST_START,
    UPDATE_CAST_SUCCESS,
    UPDATE_CAST_FAILED,
    TOGGLE_CAST_ENABLED_START,
    TOGGLE_CAST_ENABLED_SUCCESS,
    TOGGLE_CAST_ENABLED_FAILED,
    DELETE_CASTS_START,
    DELETE_CASTS_SUCCESS,
    DELETE_CASTS_FAILED
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllCastsStart = (payload) => ({
    type: FETCH_ALL_CASTS_START,
    payload
});

export const fetchAllCastsSuccess = (payload) => ({
    type: FETCH_ALL_CASTS_SUCCESS,
    payload
});

export const fetchAllCastsFailed = (payload) => ({
    type: FETCH_ALL_CASTS_FAILED,
    payload
});


/** Find By ID action */
export const findCastByIDStart = (payload) => ({
    type: FIND_CAST_BY_ID_START,
    payload
});

export const findCastByIDSuccess = (payload) => ({
    type: FIND_CAST_BY_ID_SUCCESS,
    payload
});

export const findCastByIDFailed = (payload) => ({
    type: FIND_CAST_BY_ID_FAILED,
    payload
});


/** Create Cast action */
export const createCastStart = (payload) => ({
    type: CREATE_CAST_START,
    payload
});

export const createCastSuccess = (payload) => ({
    type: CREATE_CAST_SUCCESS,
    payload
});

export const createCastFailed = (payload) => ({
    type: CREATE_CAST_FAILED,
    payload
});

/** Update Cast action */
export const updateCastStart = (payload) => ({
    type: UPDATE_CAST_START,
    payload
});

export const updateCastSuccess = (payload) => ({
    type: UPDATE_CAST_SUCCESS,
    payload
});

export const updateCastFailed = (payload) => ({
    type: UPDATE_CAST_FAILED,
    payload
});

/** Toggle enabled action */
export const toggleCastEnabledStart = (payload) => ({
    type: TOGGLE_CAST_ENABLED_START,
    payload
});

export const toggleCastEnabledSuccess = (payload) => ({
    type: TOGGLE_CAST_ENABLED_SUCCESS,
    payload
});

export const toggleCastEnabledFailed = (payload) => ({
    type: TOGGLE_CAST_ENABLED_FAILED,
    payload
});

/** Delete Cast action */
export const deleteCastsStart = (payload) => ({
    type: DELETE_CASTS_START,
    payload
});

export const deleteCastsSuccess = (payload) => ({
    type: DELETE_CASTS_SUCCESS,
    payload
});

export const deleteCastsFailed = (payload) => ({
    type: DELETE_CASTS_FAILED,
    payload
});

