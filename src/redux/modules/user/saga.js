import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/users/user';

import { updateUserDetails } from './../auth/actions'
 
/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllUsersSuccess,
    fetchAllUsersFailed,
    updateUserNameSuccess,
    updateUserNameFailed,
    updateUserEmailSuccess,
    updateUserEmailFailed,
    updateUserPasswordSuccess,
    updateUserPasswordFailed,
    sendChangeEmailVerificationCodeSuccess,
    sendChangeEmailVerificationCodeFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_USERS_START,
    UPDATE_USER_NAME_START,
    UPDATE_USER_EMAIL_START,
    UPDATE_USER_PASSWORD_START,
    SEND_CHANGE_EMAIL_VERIFICATION_CODE_START
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
        const { message, status } = yield call(API.updateEmailAsync, payload);

        yield put(updateUserDetails(payload));
        yield put(updateUserEmailSuccess(payload));
        yield put(showAlert({ status, message }));
        yield put(push(payload.path));
    } catch ({ message, status }) {
        yield put(updateUserEmailFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* updateUserNameSaga(payload)
{
    try {
        const { path, ...name } = payload;
        const { message, status } = yield call(API.updateNameAsync, payload);

        yield put(updateUserDetails(name));
        yield put(updateUserNameSuccess(payload));
        yield put(showAlert({ status, message }));
        yield put(push(path));
    } catch ({ message, status }) {
        yield put(updateUserNameFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}


function* updateUserPasswordSaga(payload)
{
    try {
        const { message, status } = yield call(API.updatePasswordAsync, payload);

        yield put(updateUserPasswordSuccess());
        yield put(showAlert({ status, message }));
        yield put(push(payload.path));
    } catch ({ message, status }) {
        yield put(updateUserPasswordFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* sendChangeEmailVerificationCodeSaga()
{
    try {
        const { data: emailVerificationCode, status, message } = yield call(API.sendChangeEmailVerificationCodeAsync);

        yield put(sendChangeEmailVerificationCodeSuccess({ emailVerificationCode }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(sendChangeEmailVerificationCodeFailed({ message }));
        yield put(showAlert({ status, message: 'Something went wrong' }));
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

function* updateUserNameWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_USER_NAME_START);
        yield call(updateUserNameSaga, payload);
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

function* sendChangeEmailVerificationCodeWatcher()
{
    while (true) {
        yield take(SEND_CHANGE_EMAIL_VERIFICATION_CODE_START);
        yield call(sendChangeEmailVerificationCodeSaga);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllUsersWatcher(),
        updateUserNameWatcher(),
        updateUserEmailWatcher(),
        updateUserPasswordWatcher(),
        sendChangeEmailVerificationCodeWatcher()
    ]);
}