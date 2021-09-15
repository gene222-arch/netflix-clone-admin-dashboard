import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/users/user';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllUsersSuccess,
    fetchAllUsersFailed,
    updateUserEmailSuccess,
    updateUserEmailFailed,
    updateUserPasswordSuccess,
    updateUserPasswordFailed,
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_USERS_START,
    UPDATE_USER_EMAIL_START,
    UPDATE_USER_PASSWORD_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllUsersSaga()
{
    try {
        const { data: users } = yield call(API.fetchAllAsync);
        yield put(fetchAllUsersSuccess({ users }));
    } catch ({ message }) {
        yield put(fetchAllUsersFailed({ message }));
    }
}

function* updateUserEmailSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateEmailAsync, { email: payload.email });

        yield put(updateUserEmailSuccess(payload));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.PROFILE_HOME_PAGE));
    } catch ({ message, status }) {
        yield put(updateUserEmailFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}


function* updateUserPasswordSaga(payload)
{
    try {
        const { message, status } = yield call(API.updatePasswordAsync, payload);

        yield put(updateUserPasswordSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.PROFILE_HOME_PAGE));
    } catch ({ message, status }) {
        yield put(updateUserPasswordFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

/**
 * Watchers
 */
function* fetchAllUsersWatcher()
{
    while (true) {
        yield take(FETCH_ALL_USERS_START);
        yield call(fetchAllUsersSaga);
    }
}

function* updateUserEmailWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_USER_EMAIL_START);
        yield call(updateUserEmailSaga, payload);
    }
}

function* updateUserPasswordWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_USER_PASSWORD_START);
        yield call(updateUserPasswordSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllUsersWatcher(),
        updateUserEmailWatcher(),
        updateUserPasswordWatcher()
    ]);
}