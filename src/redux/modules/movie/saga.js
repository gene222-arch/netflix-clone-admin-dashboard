import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/movie';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllMoviesSuccess,
    fetchAllMoviesFailed,
    findMovieByIDSuccess,
    findMovieByIDFailed,
    createMovieSuccess,
    createMovieFailed,
    updateMovieSuccess,
    updateMovieFailed,
    restoreMoviesSuccess,
    restoreMoviesFailed,
    deleteMoviesSuccess,
    deleteMoviesFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_DELETE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_MOVIES_START,
    FIND_MOVIE_BY_ID_START,
    CREATE_MOVIE_START,
    UPDATE_MOVIE_START,
    RESTORE_MOVIES_START,
    TOGGLE_MOVIE_ENABLED_START,
    DELETE_MOVIES_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllMoviesSaga()
{
    try {
        const { data: movies } = yield call(API.fetchAllAsync);
        yield put(fetchAllMoviesSuccess({ movies }));
    } catch ({ message }) {
        yield put(fetchAllMoviesFailed({ message }));
    }
}

function* findMovieByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: movie } = yield call(API.findByIDAsync, id);

        yield put(findMovieByIDSuccess({ movie }));
    } catch ({ message }) {
        yield put(findMovieByIDFailed({ message }));
    }
}

function* createMovieSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createMovieSuccess({ movie: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_MOVIES));
    } catch ({ status, message }) {
        yield put(createMovieFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateMovieSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateMovieSuccess({ movie: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_MOVIES));
    } catch ({ message, status }) {
        yield put(updateMovieFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* restoreMoviesSaga(payload)
{
    try {
        const { message, status } = yield call(API.restoreAsync, payload);

        yield put(restoreMoviesSuccess());
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_MOVIES));
    } catch ({ message, status }) {
        yield put(restoreMoviesFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteMoviesSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteMoviesSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteMoviesFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}


/**
 * Watchers
 */
function* fetchAllMoviesWatcher()
{
    while (true) {
        yield take(FETCH_ALL_MOVIES_START);
        yield call(fetchAllMoviesSaga);
    }
}

function* findMovieByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_MOVIE_BY_ID_START);
        yield call(findMovieByIDSaga, payload);
    }
}

function* createMovieWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_MOVIE_START);
        yield call(createMovieSaga, payload);
    }
}

function* updateMovieWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_MOVIE_START);
        yield call(updateMovieSaga, payload);
    }
}

function* restoreMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(RESTORE_MOVIES_START);
        yield call(restoreMoviesSaga, payload);
    }
}

function* deleteMoviesWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_MOVIES_START);
        yield call(deleteMoviesSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllMoviesWatcher(),
        findMovieByIDWatcher(),
        createMovieWatcher(),
        updateMovieWatcher(),
        restoreMoviesWatcher(),
        restoreMoviesSaga(),
        deleteMoviesWatcher()
    ]);
}