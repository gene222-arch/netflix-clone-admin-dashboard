import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/genre';

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
    restoreGenresSuccess,
    restoreGenresFailed,
    toggleGenreEnabledSuccess,
    toggleGenreEnabledFailed,
    deleteGenresSuccess,
    deleteGenresFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_DELETE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_GENRES_START,
    FIND_GENRE_BY_ID_START,
    CREATE_GENRE_START,
    UPDATE_GENRE_START,
    RESTORE_GENRES_START,
    TOGGLE_GENRE_ENABLED_START,
    DELETE_GENRES_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllGenresSaga(payload)
{
    try {
        const { data: genres } = yield call(API.fetchAllAsync, payload.trashedOnly);
        yield put(fetchAllGenresSuccess({ genres }));
    } catch ({ message }) {
        yield put(fetchAllGenresFailed({ message }));
    }
}

function* findGenreByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: genre } = yield call(API.findByIDAsync, id);

        yield put(findGenreByIDSuccess({ genre }));
    } catch ({ message }) {
        yield put(findGenreByIDFailed({ message }));
    }
}

function* createGenreSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createGenreSuccess({ genre: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_GENRE));
    } catch ({ status, message }) {
        yield put(createGenreFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateGenreSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateGenreSuccess({ genre: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_GENRE));
    } catch ({ message, status }) {
        yield put(updateGenreFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* restoreGenresSaga(payload)
{
    try {
        const { message, status } = yield call(API.restoreAsync, payload);

        yield put(restoreGenresSuccess());
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_GENRE));
    } catch ({ message, status }) {
        yield put(restoreGenresFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* toggleGenreEnabledSaga(payload)
{
    try {
        const { id } = payload;
        
        yield put(toggleGenreEnabledSuccess({ id }));
        const { message, status } = yield call(API.updateEnabledStatusAsync, id);
        
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(toggleGenreEnabledFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteGenresSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteGenresSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteGenresFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}


/**
 * Watchers
 */
function* fetchAllGenresWatcher()
{
    while (true) {
        const { payload } = yield take(FETCH_ALL_GENRES_START);
        yield call(fetchAllGenresSaga, payload);
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

function* restoreGenresWatcher()
{
    while (true) {
        const { payload } = yield take(RESTORE_GENRES_START);
        yield call(restoreGenresSaga, payload);
    }
}

function* toggleGenreEnabledWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_GENRE_ENABLED_START);
        yield call(toggleGenreEnabledSaga, payload);
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
        restoreGenresWatcher(),
        toggleGenreEnabledWatcher(),
        deleteGenresWatcher()
    ]);
}