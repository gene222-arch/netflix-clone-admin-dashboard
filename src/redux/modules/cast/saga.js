import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/cast';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllCastsSuccess,
    fetchAllCastsFailed,
    findCastByIDSuccess,
    findCastByIDFailed,
    createCastSuccess,
    createCastFailed,
    updateCastSuccess,
    updateCastFailed,
    restoreCastsSuccess,
    restoreCastsFailed,
    toggleCastEnabledSuccess,
    toggleCastEnabledFailed,
    deleteCastsSuccess,
    deleteCastsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_DELETE } from '../../../config/alertMessages';
import { ERROR_MESSAGE_ON_UPDATE, ERROR_MESSAGE_ON_CREATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_CASTS_START,
    FIND_CAST_BY_ID_START,
    CREATE_CAST_START,
    UPDATE_CAST_START,
    RESTORE_CASTS_START,
    TOGGLE_CAST_ENABLED_START,
    DELETE_CASTS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllCastsSaga(payload)
{
    try {
        const { data, status } = yield call(API.fetchAllAsync, payload.trashedOnly);

        const casts = { casts: status === 'success' ? data : [] };
        yield put(fetchAllCastsSuccess(casts));
    } catch ({ message }) {
        yield put(fetchAllCastsFailed({ message }));
    }
}

function* findCastByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: cast } = yield call(API.findByIDAsync, id);

        yield put(findCastByIDSuccess({ cast }));
    } catch ({ message }) {
        yield put(findCastByIDFailed({ message }));
    }
}

function* createCastSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createCastSuccess({ cast: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_CAST));
    } catch ({ message, status }) {
        yield put(createCastFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateCastSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateCastSuccess({ cast: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_CAST));
    } catch ({ message, status }) {
        yield put(updateCastFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* restoreCastsSaga(payload)
{
    try {
        const { message, status } = yield call(API.restoreAsync, payload);
        const { data: casts, status: fetchAllStatus } = yield call(API.fetchAllAsync, true);
        
        if (fetchAllStatus === 'success') {
            yield put(fetchAllCastsSuccess({ casts }));
        }

        yield put(restoreCastsSuccess());
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_CAST));
    } catch ({ message, status }) {
        yield put(restoreCastsFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* toggleCastEnabledSaga(payload)
{
    try {
        const { id } = payload;
        
        yield put(toggleCastEnabledSuccess({ id }));
        const { message, status } = yield call(API.updateEnabledStatusAsync, id);

        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(toggleCastEnabledFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteCastsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteCastsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteCastsFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}


/**
 * Watchers
 */
function* fetchAllCastsWatcher()
{
    while (true) {
        const { payload } = yield take(FETCH_ALL_CASTS_START);
        yield call(fetchAllCastsSaga, payload);
    }
}

function* findCastByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_CAST_BY_ID_START);
        yield call(findCastByIDSaga, payload);
    }
}

function* createCastWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_CAST_START);
        yield call(createCastSaga, payload);
    }
}

function* updateCastWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_CAST_START);
        yield call(updateCastSaga, payload);
    }
}

function* restoreCastsWatcher()
{
    while (true) {
        const { payload } = yield take(RESTORE_CASTS_START);
        yield call(restoreCastsSaga, payload);
    }
}

function* toggleCastEnabledWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_CAST_ENABLED_START);
        yield call(toggleCastEnabledSaga, payload);
    }
}

function* deleteCastsWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_CASTS_START);
        yield call(deleteCastsSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllCastsWatcher(),
        findCastByIDWatcher(),
        createCastWatcher(),
        updateCastWatcher(),
        restoreCastsWatcher(),
        toggleCastEnabledWatcher(),
        deleteCastsWatcher()
    ]);
}