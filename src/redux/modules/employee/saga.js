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
    destroyEmployeesSuccess,
    destroyEmployeesFailed
} from './actions';
import * as ALERT from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_UPDATE, ERROR_MESSAGE_ON_CREATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_EMPLOYEES_START,
    CREATE_EMPLOYEE_START,
    UPDATE_EMPLOYEE_START,
    DESTROY_EMPLOYEES_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllEmployeesSaga()
{
    try {
        const { data: employees } = yield call(API.fetchAllAsync);
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
        yield put(ALERT.showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
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

/**
 * Watchers
 */
function* fetchAllEmployeesWatcher()
{
    while (true) {
        yield take(FETCH_ALL_EMPLOYEES_START);
        yield call(fetchAllEmployeesSaga);
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

function* destroyEmployeesWatcher()
{
    while (true) {
        const { payload } = yield take(DESTROY_EMPLOYEES_START);
        yield call(destroyEmployeeSaga, payload);
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
        destroyEmployeesWatcher()
    ]);
}