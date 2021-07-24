import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_MOVIES_START,
    FETCH_ALL_MOVIES_SUCCESS,
    FETCH_ALL_MOVIES_FAILED,
    FIND_MOVIE_BY_ID_START,
    FIND_MOVIE_BY_ID_SUCCESS,
    FIND_MOVIE_BY_ID_FAILED,
    CREATE_MOVIE_START,
    CREATE_MOVIE_SUCCESS,
    CREATE_MOVIE_FAILED,
    UPDATE_MOVIE_START,
    UPDATE_MOVIE_SUCCESS,
    UPDATE_MOVIE_FAILED,
    DELETE_MOVIES_START,
    DELETE_MOVIES_SUCCESS,
    DELETE_MOVIES_FAILED,
    CLEAR_MOVIE_ERRORS,
    UPDATE_MOVIE_ERROR_STATE
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllMoviesStart = (payload) => ({
    type: FETCH_ALL_MOVIES_START,
    payload
});

export const fetchAllMoviesSuccess = (payload) => ({
    type: FETCH_ALL_MOVIES_SUCCESS,
    payload
});

export const fetchAllMoviesFailed = (payload) => ({
    type: FETCH_ALL_MOVIES_FAILED,
    payload
});


/** Find By ID action */
export const findMovieByIDStart = (payload) => ({
    type: FIND_MOVIE_BY_ID_START,
    payload
});

export const findMovieByIDSuccess = (payload) => ({
    type: FIND_MOVIE_BY_ID_SUCCESS,
    payload
});

export const findMovieByIDFailed = (payload) => ({
    type: FIND_MOVIE_BY_ID_FAILED,
    payload
});


/** Create Movie action */
export const createMovieStart = (payload) => ({
    type: CREATE_MOVIE_START,
    payload
});

export const createMovieSuccess = (payload) => ({
    type: CREATE_MOVIE_SUCCESS,
    payload
});

export const createMovieFailed = (payload) => ({
    type: CREATE_MOVIE_FAILED,
    payload
});

/** Update Movie action */
export const updateMovieStart = (payload) => ({
    type: UPDATE_MOVIE_START,
    payload
});

export const updateMovieSuccess = (payload) => ({
    type: UPDATE_MOVIE_SUCCESS,
    payload
});

export const updateMovieFailed = (payload) => ({
    type: UPDATE_MOVIE_FAILED,
    payload
});

/** Delete Movie action */
export const deleteMoviesStart = (payload) => ({
    type: DELETE_MOVIES_START,
    payload
});

export const deleteMoviesSuccess = (payload) => ({
    type: DELETE_MOVIES_SUCCESS,
    payload
});

export const deleteMoviesFailed = (payload) => ({
    type: DELETE_MOVIES_FAILED,
    payload
});


/** Clear Movie error action */
export const clearMovieErrors = (payload) => ({
    type: CLEAR_MOVIE_ERRORS,
    payload
});

/** Update Movie state action */
export const updateMovieErrorState = (payload) => ({
    type: UPDATE_MOVIE_ERROR_STATE,
    payload
});




