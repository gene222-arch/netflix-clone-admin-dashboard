import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/author';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllGenresSuccess,
    fetchAllGenresFailed,
    findGenreByIDSuccess,
    findGenreByIDFailed,
    createGenreSuccess,
    createGenreFailed,
    updateGenreSuccess,
    updateGenreFailed,
    deleteGenresSuccess,
    deleteGenresFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';

const {
    FETCH_ALL_GENRES_START,
    FIND_GENRE_BY_ID_START,
    CREATE_GENRE_START,
    UPDATE_GENRE_START,
    DELETE_GENRES_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllGenresSaga()
{
    try {
        const { data: authors } = yield call(API.fetchAllAsync);
        yield put(fetchAllGenresSuccess({ authors }));
    } catch ({ message }) {
        yield put(fetchAllGenresFailed({ message }));
    }
}

function* findGenreByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: author } = yield call(API.findByIDAsync, id);

        yield put(findGenreByIDSuccess({ author }));
    } catch ({ message }) {
        yield put(findGenreByIDFailed({ message }));
    }
}

function* createGenreSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createGenreSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_GENRE));
    } catch ({ message }) {
        yield put(createGenreFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}

function* updateGenreSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateGenreSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_GENRE));
    } catch ({ message }) {
        yield put(updateGenreFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}

function* deleteGenresSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteGenresSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message }) {
        yield put(deleteGenresFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}


/**
 * Watchers
 */
function* fetchAllGenresWatcher()
{
    while (true) {
        yield take(FETCH_ALL_GENRES_START);
        yield call(fetchAllGenresSaga);
    }
}

function* findGenreByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_GENRE_BY_ID_START);
        yield call(findGenreByIDSaga, payload);
    }
}

function* createGenreWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_GENRE_START);
        yield call(createGenreSaga, payload);
    }
}

function* updateGenreWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_GENRE_START);
        yield call(updateGenreSaga, payload);
    }
}

function* deleteGenresWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_GENRES_START);
        yield call(deleteGenresSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllGenresWatcher(),
        findGenreByIDWatcher(),
        createGenreWatcher(),
        updateGenreWatcher(),
        deleteGenresWatcher()
    ]);
}