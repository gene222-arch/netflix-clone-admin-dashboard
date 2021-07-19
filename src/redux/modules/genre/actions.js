import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_GENRES_START,
    FETCH_ALL_GENRES_SUCCESS,
    FETCH_ALL_GENRES_FAILED,
    FIND_GENRE_BY_ID_START,
    FIND_GENRE_BY_ID_SUCCESS,
    FIND_GENRE_BY_ID_FAILED,
    CREATE_GENRE_START,
    CREATE_GENRE_SUCCESS,
    CREATE_GENRE_FAILED,
    UPDATE_GENRE_START,
    UPDATE_GENRE_SUCCESS,
    UPDATE_GENRE_FAILED,
    TOGGLE_GENRE_ENABLED_START,
    TOGGLE_GENRE_ENABLED_SUCCESS,
    TOGGLE_GENRE_ENABLED_FAILED,
    DELETE_GENRES_START,
    DELETE_GENRES_SUCCESS,
    DELETE_GENRES_FAILED,
    CLEAR_GENRE_ERRORS,
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllGenresStart = (payload) => ({
    type: FETCH_ALL_GENRES_START,
    payload
});

export const fetchAllGenresSuccess = (payload) => ({
    type: FETCH_ALL_GENRES_SUCCESS,
    payload
});

export const fetchAllGenresFailed = (payload) => ({
    type: FETCH_ALL_GENRES_FAILED,
    payload
});


/** Find By ID action */
export const findGenreByIDStart = (payload) => ({
    type: FIND_GENRE_BY_ID_START,
    payload
});

export const findGenreByIDSuccess = (payload) => ({
    type: FIND_GENRE_BY_ID_SUCCESS,
    payload
});

export const findGenreByIDFailed = (payload) => ({
    type: FIND_GENRE_BY_ID_FAILED,
    payload
});


/** Create Genre action */
export const createGenreStart = (payload) => ({
    type: CREATE_GENRE_START,
    payload
});

export const createGenreSuccess = (payload) => ({
    type: CREATE_GENRE_SUCCESS,
    payload
});

export const createGenreFailed = (payload) => ({
    type: CREATE_GENRE_FAILED,
    payload
});

/** Update Genre action */
export const updateGenreStart = (payload) => ({
    type: UPDATE_GENRE_START,
    payload
});

export const updateGenreSuccess = (payload) => ({
    type: UPDATE_GENRE_SUCCESS,
    payload
});

export const updateGenreFailed = (payload) => ({
    type: UPDATE_GENRE_FAILED,
    payload
});

/** Toggle enabled action */
export const toggleGenreEnabledStart = (payload) => ({
    type: TOGGLE_GENRE_ENABLED_START,
    payload
});

export const toggleGenreEnabledSuccess = (payload) => ({
    type: TOGGLE_GENRE_ENABLED_SUCCESS,
    payload
});

export const toggleGenreEnabledFailed = (payload) => ({
    type: TOGGLE_GENRE_ENABLED_FAILED,
    payload
});

/** Delete Genre action */
export const deleteGenresStart = (payload) => ({
    type: DELETE_GENRES_START,
    payload
});

export const deleteGenresSuccess = (payload) => ({
    type: DELETE_GENRES_SUCCESS,
    payload
});

export const deleteGenresFailed = (payload) => ({
    type: DELETE_GENRES_FAILED,
    payload
});


/** Clear Genre error action */
export const clearGenreErrors = (payload) => ({
    type: CLEAR_GENRE_ERRORS,
    payload
});



