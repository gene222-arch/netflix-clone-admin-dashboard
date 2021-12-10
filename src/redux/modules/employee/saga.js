import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/employee';
 
/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllEmployeesSuccess,
    fetchAllEmployeesFailed,
    createEmployeeSuccess,
    createEmployeeFailed,
    updateEmployeeSuccess,
    updateEmployeeFailed,
    restoreEmployeesSuccess,
    restoreEmployeesFailed,
    destroyEmployeesSuccess,
    destroyEmployeesFailed,
    verifyEmployeeEmailSuccess,
    verifyEmployeeEmailFailed
} from './actions';
import * as ALERT from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_UPDATE, ERROR_MESSAGE_ON_CREATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_EMPLOYEES_START,
    CREATE_EMPLOYEE_START,
    UPDATE_EMPLOYEE_START,
    RESTORE_EMPLOYEES_START,
    DESTROY_EMPLOYEES_START,
    VERIFY_EMPLOYEE_EMAIL_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllEmployeesSaga(payload)
{
    try {
        const { data: employees } = yield call(API.fetchAllAsync, payload.trashedOnly);
        yield put(fetchAllEmployeesSuccess({ employees }));
    } catch ({ message }) {
        yield put(fetchAllEmployeesFailed({ message }));
    }
}

function* createEmployeeSaga(payload)
{
    try {
        const { status, message } = yield call(API.createAsync, payload);
        yield put(createEmployeeSuccess());
        yield put(ALERT.showAlert({ status, message }));
        yield put(push(PATH.EMPLOYEE));
    } catch ({ status, message }) {
        yield put(createEmployeeFailed({ message }));
        yield put(ALERT.showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateEmployeeSaga(payload)
{
    try {
        const { status, message } = yield call(API.updateAsync, payload);
        yield put(updateEmployeeSuccess());
        yield put(ALERT.showAlert({ status, message }));
        yield put(push(PATH.EMPLOYEE));
    } catch ({ status, message }) {
        yield put(updateEmployeeFailed({ message }));
        yield put(ALERT.showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* restoreEmployeesSaga(payload)
{
    try {
        const { status, message } = yield call(API.restoreAsync, payload);
        yield put(restoreEmployeesSuccess());
        yield put(ALERT.showAlert({ status, message }));
        yield put(push(PATH.EMPLOYEE));
    } catch ({ status, message }) {
        yield put(restoreEmployeesFailed({ message }));
        yield put(ALERT.showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* destroyEmployeeSaga(payload)
{
    try {
        const { ids } = payload;
        const { status, message } = yield call(API.destroyAsync, ids);
        yield put(destroyEmployeesSuccess({ ids }));
        yield put(ALERT.showAlert({ status, message }));
    } catch ({ message }) {
        yield put(destroyEmployeesFailed({ message }));
    }
}

function* verifyEmployeeEmailSaga(payload)
{
    try {
        const { status, message } = yield call(API.verifyAsync, payload);
        yield put(verifyEmployeeEmailSuccess());
        yield put(ALERT.showAlert({ status, message }));
    } catch ({ message }) {
        yield put(verifyEmployeeEmailFailed({ message }));
    }
}

/**
 * Watchers
 */
function* fetchAllEmployeesWatcher()
{
    while (true) {
        const { payload } = yield take(FETCH_ALL_EMPLOYEES_START);
        yield call(fetchAllEmployeesSaga, payload);
    }
}

function* createEmployeeWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_EMPLOYEE_START);
        yield call(createEmployeeSaga, payload);
    }
}

function* updateEmployeeWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_EMPLOYEE_START);
        yield call(updateEmployeeSaga, payload);
    }
}

function* restoreEmployeesWatcher()
{
    while (true) {
        const { payload } = yield take(RESTORE_EMPLOYEES_START);
        yield call(restoreEmployeesSaga, payload);
    }
}

function* destroyEmployeesWatcher()
{
    while (true) {
        const { payload } = yield take(DESTROY_EMPLOYEES_START);
        yield call(destroyEmployeeSaga, payload);
    }
}


function* verifyEmployeeEmailWatcher()
{
    while (true) {
        const { payload } = yield take(VERIFY_EMPLOYEE_EMAIL_START);
        yield call(verifyEmployeeEmailSaga, payload);
    }
}
/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllEmployeesWatcher(),
        createEmployeeWatcher(),
        updateEmployeeWatcher(),
        restoreEmployeesWatcher(),
        destroyEmployeesWatcher(),
        verifyEmployeeEmailWatcher()
    ]);
}