import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_COMING_SOON_MOVIES_START,
    FETCH_ALL_COMING_SOON_MOVIES_SUCCESS,
    FETCH_ALL_COMING_SOON_MOVIES_FAILED,
    FIND_COMING_SOON_MOVIE_BY_ID_START,
    FIND_COMING_SOON_MOVIE_BY_ID_SUCCESS,
    FIND_COMING_SOON_MOVIE_BY_ID_FAILED,
    CREATE_COMING_SOON_MOVIE_START,
    CREATE_COMING_SOON_MOVIE_SUCCESS,
    CREATE_COMING_SOON_MOVIE_FAILED,
    UPDATE_COMING_SOON_MOVIE_START,
    UPDATE_COMING_SOON_MOVIE_SUCCESS,
    UPDATE_COMING_SOON_MOVIE_FAILED,
    DELETE_COMING_SOON_MOVIES_START,
    DELETE_COMING_SOON_MOVIES_SUCCESS,
    DELETE_COMING_SOON_MOVIES_FAILED,
    TOGGLE_COMING_SOON_MOVIE_RELEASE_START,
    TOGGLE_COMING_SOON_MOVIE_RELEASE_SUCCESS,
    TOGGLE_COMING_SOON_MOVIE_RELEASE_FAILED,
    CLEAR_COMING_SOON_MOVIE_ERRORS,
    UPDATE_COMING_SOON_MOVIE_ERROR_STATE
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllComingSoonMoviesStart = (payload) => ({
    type: FETCH_ALL_COMING_SOON_MOVIES_START,
    payload
});

export const fetchAllComingSoonMoviesSuccess = (payload) => ({
    type: FETCH_ALL_COMING_SOON_MOVIES_SUCCESS,
    payload
});

export const fetchAllComingSoonMoviesFailed = (payload) => ({
    type: FETCH_ALL_COMING_SOON_MOVIES_FAILED,
    payload
});


/** Find By ID action */
export const findComingSoonMovieByIDStart = (payload) => ({
    type: FIND_COMING_SOON_MOVIE_BY_ID_START,
    payload
});

export const findComingSoonMovieByIDSuccess = (payload) => ({
    type: FIND_COMING_SOON_MOVIE_BY_ID_SUCCESS,
    payload
});

export const findComingSoonMovieByIDFailed = (payload) => ({
    type: FIND_COMING_SOON_MOVIE_BY_ID_FAILED,
    payload
});


/** Create ComingSoonMovie action */
export const createComingSoonMovieStart = (payload) => ({
    type: CREATE_COMING_SOON_MOVIE_START,
    payload
});

export const createComingSoonMovieSuccess = (payload) => ({
    type: CREATE_COMING_SOON_MOVIE_SUCCESS,
    payload
});

export const createComingSoonMovieFailed = (payload) => ({
    type: CREATE_COMING_SOON_MOVIE_FAILED,
    payload
});

/** Update ComingSoonMovie action */
export const updateComingSoonMovieStart = (payload) => ({
    type: UPDATE_COMING_SOON_MOVIE_START,
    payload
});

export const updateComingSoonMovieSuccess = (payload) => ({
    type: UPDATE_COMING_SOON_MOVIE_SUCCESS,
    payload
});

export const updateComingSoonMovieFailed = (payload) => ({
    type: UPDATE_COMING_SOON_MOVIE_FAILED,
    payload
});

/** Delete ComingSoonMovie action */
export const deleteComingSoonMoviesStart = (payload) => ({
    type: DELETE_COMING_SOON_MOVIES_START,
    payload
});

export const deleteComingSoonMoviesSuccess = (payload) => ({
    type: DELETE_COMING_SOON_MOVIES_SUCCESS,
    payload
});

export const deleteComingSoonMoviesFailed = (payload) => ({
    type: DELETE_COMING_SOON_MOVIES_FAILED,
    payload
});

/** Toggle ComingSoonMovie action */
export const toggleComingSoonMovieReleaseStart = (payload) => ({
    type: TOGGLE_COMING_SOON_MOVIE_RELEASE_START,
    payload
});

export const toggleComingSoonMovieReleaseSuccess = (payload) => ({
    type: TOGGLE_COMING_SOON_MOVIE_RELEASE_SUCCESS,
    payload
});

export const toggleComingSoonMovieReleaseFailed = (payload) => ({
    type: TOGGLE_COMING_SOON_MOVIE_RELEASE_FAILED,
    payload
});


/** Clear ComingSoonMovie error action */
export const clearComingSoonMovieErrors = (payload) => ({
    type: CLEAR_COMING_SOON_MOVIE_ERRORS,
    payload
});

/** Update ComingSoonMovie state action */
export const updateComingSoonMovieErrorState = (payload) => ({
    type: UPDATE_COMING_SOON_MOVIE_ERROR_STATE,
    payload
});




