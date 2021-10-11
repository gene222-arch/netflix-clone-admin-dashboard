import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/employee';
 
/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllEmployeesSuccess,
    fetchAllEmployeesFailed,
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_USERS_START,
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllEmployeesSaga()
{
    try {
        const { data: users } = yield call(API.fetchAllAsync);
        yield put(fetchAllEmployeesSuccess({ users }));
    } catch ({ message }) {
        yield put(fetchAllEmployeesFailed({ message }));
    }
}

/**
 * Watchers
 */
function* fetchAllEmployeesWatcher()
{
    while (true) {
        yield take(FETCH_ALL_USERS_START);
        yield call(fetchAllEmployeesSaga);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllEmployeesWatcher()
    ]);
}