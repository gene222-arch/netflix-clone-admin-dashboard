import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from '../../../services/activity-log/activity.logs';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllActivityLogsSuccess,
    fetchAllActivityLogsFailed,
    findActivityLogByIDSuccess,
    findActivityLogByIDFailed,
    createActivityLogSuccess,
    createActivityLogFailed,
    updateActivityLogSuccess,
    updateActivityLogFailed,
    deleteActivityLogsSuccess,
    deleteActivityLogsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_DELETE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_ACTIVITY_LOGS_START,
    FIND_ACTIVITY_LOG_BY_ID_START,
    CREATE_ACTIVITY_LOG_START,
    UPDATE_ACTIVITY_LOG_START,
    DELETE_ACTIVITY_LOGS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllActivityLogsSaga()
{
    try {
        const { data: activityLogs } = yield call(API.fetchAllAsync);
        yield put(fetchAllActivityLogsSuccess({ activityLogs }));
    } catch ({ message }) {
        yield put(fetchAllActivityLogsFailed({ message }));
    }
}

function* findActivityLogByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: activityLog } = yield call(API.findByIDAsync, id);

        yield put(findActivityLogByIDSuccess({ activityLog }));
    } catch ({ message }) {
        yield put(findActivityLogByIDFailed({ message }));
    }
}

function* createActivityLogSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createActivityLogSuccess());
        yield put(showAlert({ status, message }));
        yield put(push(PATH.ACTIVITY_LOG));
    } catch ({ message, status }) {
        yield put(createActivityLogFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateActivityLogSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateActivityLogSuccess());
        yield put(showAlert({ status, message }));
        yield put(push(PATH.ACTIVITY_LOG));
    } catch ({ message, status }) {
        yield put(updateActivityLogFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteActivityLogsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteActivityLogsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteActivityLogsFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}


/**
 * Watchers
 */
function* fetchAllActivityLogsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_ACTIVITY_LOGS_START);
        yield call(fetchAllActivityLogsSaga);
    }
}


function* findActivityLogByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_ACTIVITY_LOG_BY_ID_START);
        yield call(findActivityLogByIDSaga, payload);
    }
}

function* createActivityLogWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_ACTIVITY_LOG_START);
        yield call(createActivityLogSaga, payload);
    }
}

function* updateActivityLogWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_ACTIVITY_LOG_START);
        yield call(updateActivityLogSaga, payload);
    }
}

function* deleteActivityLogsWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_ACTIVITY_LOGS_START);
        yield call(deleteActivityLogsSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllActivityLogsWatcher(),
        findActivityLogByIDWatcher(),
        createActivityLogWatcher(),
        updateActivityLogWatcher(),
        deleteActivityLogsWatcher()
    ]);
}