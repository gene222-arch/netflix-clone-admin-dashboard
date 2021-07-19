import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/director';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllDirectorsSuccess,
    fetchAllDirectorsFailed,
    findDirectorByIDSuccess,
    findDirectorByIDFailed,
    createDirectorSuccess,
    createDirectorFailed,
    updateDirectorSuccess,
    updateDirectorFailed,
    toggleDirectorEnabledSuccess,
    toggleDirectorEnabledFailed,
    deleteDirectorsSuccess,
    deleteDirectorsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_DELETE } from '../../../config/alertMessages';
import { ERROR_MESSAGE_ON_UPDATE, ERROR_MESSAGE_ON_CREATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_DIRECTORS_START,
    FIND_DIRECTOR_BY_ID_START,
    CREATE_DIRECTOR_START,
    UPDATE_DIRECTOR_START,
    TOGGLE_DIRECTOR_ENABLED_START,
    DELETE_DIRECTORS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllDirectorsSaga()
{
    try {
        const { data: directors } = yield call(API.fetchAllAsync);
        yield put(fetchAllDirectorsSuccess({ directors }));
    } catch ({ message }) {
        yield put(fetchAllDirectorsFailed({ message }));
    }
}

function* findDirectorByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: director } = yield call(API.findByIDAsync, id);

        yield put(findDirectorByIDSuccess({ director }));
    } catch ({ message }) {
        yield put(findDirectorByIDFailed({ message }));
    }
}

function* createDirectorSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createDirectorSuccess({ director: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_DIRECTOR));
    } catch ({ message, status }) {
        yield put(createDirectorFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateDirectorSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateDirectorSuccess({ director: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_DIRECTOR));
    } catch ({ message, status }) {
        yield put(updateDirectorFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}


function* toggleDirectorEnabledSaga(payload)
{
    try {
        const { id } = payload;

        yield put(toggleDirectorEnabledSuccess({ id }));
        const { message, status } = yield call(API.updateEnabledStatusAsync, id);

        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(toggleDirectorEnabledFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteDirectorsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteDirectorsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteDirectorsFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}


/**
 * Watchers
 */
function* fetchAllDirectorsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_DIRECTORS_START);
        yield call(fetchAllDirectorsSaga);
    }
}

function* findDirectorByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_DIRECTOR_BY_ID_START);
        yield call(findDirectorByIDSaga, payload);
    }
}

function* createDirectorWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_DIRECTOR_START);
        yield call(createDirectorSaga, payload);
    }
}

function* updateDirectorWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_DIRECTOR_START);
        yield call(updateDirectorSaga, payload);
    }
}

function* toggleDirectorEnabledWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_DIRECTOR_ENABLED_START);
        yield call(toggleDirectorEnabledSaga, payload);
    }
}

function* deleteDirectorsWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_DIRECTORS_START);
        yield call(deleteDirectorsSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllDirectorsWatcher(),
        findDirectorByIDWatcher(),
        createDirectorWatcher(),
        updateDirectorWatcher(),
        toggleDirectorEnabledWatcher(),
        deleteDirectorsWatcher()
    ]);
}