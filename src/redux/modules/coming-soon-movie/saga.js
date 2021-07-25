import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/coming.soon.movie';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllComingSoonMoviesSuccess,
    fetchAllComingSoonMoviesFailed,
    findComingSoonMovieByIDSuccess,
    findComingSoonMovieByIDFailed,
    createComingSoonMovieSuccess,
    createComingSoonMovieFailed,
    updateComingSoonMovieSuccess,
    updateComingSoonMovieFailed,
    deleteComingSoonMoviesSuccess,
    deleteComingSoonMoviesFailed,
    toggleComingSoonMovieReleaseSuccess,
    toggleComingSoonMovieReleaseFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_DELETE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_COMING_SOON_MOVIES_START,
    FIND_COMING_SOON_MOVIE_BY_ID_START,
    CREATE_COMING_SOON_MOVIE_START,
    UPDATE_COMING_SOON_MOVIE_START,
    TOGGLE_COMING_SOON_MOVIE_RELEASE_START,
    DELETE_COMING_SOON_MOVIES_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllComingSoonMoviesSaga()
{
    try {
        const { data: comingSoonMovies } = yield call(API.fetchAllAsync);
        yield put(fetchAllComingSoonMoviesSuccess({ comingSoonMovies }));
    } catch ({ message }) {
        yield put(fetchAllComingSoonMoviesFailed({ message }));
    }
}

function* findComingSoonMovieByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: comingSoonMovie } = yield call(API.findByIDAsync, id);

        yield put(findComingSoonMovieByIDSuccess({ comingSoonMovie }));
    } catch ({ message }) {
        yield put(findComingSoonMovieByIDFailed({ message }));
    }
}

function* createComingSoonMovieSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createComingSoonMovieSuccess({ comingSoonMovie: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES));
    } catch ({ status, message }) {
        yield put(createComingSoonMovieFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateComingSoonMovieSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateComingSoonMovieSuccess({ comingSoonMovie: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES));
    } catch ({ message, status }) {
        yield put(updateComingSoonMovieFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteComingSoonMoviesSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteComingSoonMoviesSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteComingSoonMoviesFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}

function* toggleComingSoonMovieReleaseSaga(payload)
{
    try {
        const { id } = payload;
        
        yield put(toggleComingSoonMovieReleaseSuccess({ id }));
        const { message, status } = yield call(API.updateStatusAsync, id);
        
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(toggleComingSoonMovieReleaseFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

/**
 * Watchers
 */
function* fetchAllComingSoonMoviesWatcher()
{
    while (true) {
        yield take(FETCH_ALL_COMING_SOON_MOVIES_START);
        yield call(fetchAllComingSoonMoviesSaga);
    }
}

function* findComingSoonMovieByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_COMING_SOON_MOVIE_BY_ID_START);
        yield call(findComingSoonMovieByIDSaga, payload);
    }
}

function* createComingSoonMovieWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_COMING_SOON_MOVIE_START);
        yield call(createComingSoonMovieSaga, payload);
    }
}

function* updateComingSoonMovieWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_COMING_SOON_MOVIE_START);
        yield call(updateComingSoonMovieSaga, payload);
    }
}

function* deleteComingSoonMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_COMING_SOON_MOVIES_START);
        yield call(deleteComingSoonMoviesSaga, payload);
    }
}

function* toggleComingSoonMovieReleaseWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_COMING_SOON_MOVIE_RELEASE_START);
        yield call(toggleComingSoonMovieReleaseSaga, payload);
    }
}


/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllComingSoonMoviesWatcher(),
        findComingSoonMovieByIDWatcher(),
        createComingSoonMovieWatcher(),
        updateComingSoonMovieWatcher(),
        deleteComingSoonMoviesWatcher(),
        toggleComingSoonMovieReleaseWatcher()
    ]);
}