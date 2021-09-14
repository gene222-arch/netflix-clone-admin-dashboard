/** Libraries */
import { all, call, put, take } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import { loginAsync, logoutAsync } from './../../../services/auth/login';
import { registerAsync } from './../../../services/auth/register';
import { fetchAuthAsync } from './../../../services/auth/auth';
import { forgotPasswordAsync } from './../../../services/auth/forgot.password';
import { resetPasswordAsync } from './../../../services/auth/reset.password';
import { verifyEmailAsync } from './../../../services/auth/verify.email';
import * as USER_PROFILE_API from './../../../services/users/user.profiles'

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    authUserSuccess,
    authUserFailed,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    loginSuccess, 
    loginFailed, 
    registrationSuccess, 
    registrationFailed, 
    logoutSuccess,
    logoutFailed,
    resetPasswordSuccess,
    resetPasswordFailed,
    verifyEmailSuccess,
    verifyEmailFailed,
    selectProfileSuccess,
    selectProfileFailed
} from './actions';
import * as ALERT from './../alert/actions';

/** Utils */
import * as Cookies from '../../../utils/cookies'
import PATH from './../../../routes/path';

/** Error messages */
import { ERROR_MESSAGE_ON_LOGIN, ERROR_MESSAGE_ON_REGISTER } from './../../../config/alertMessages';



/** Action types */
const { 
    AUTH_USER_START,
    FORGOT_PASSWORD_START,
    LOGIN_START,
    LOGOUT_START,
    REGISTER_START,
    RESET_PASSWORD_START,
    VERIFIY_EMAIL_START,
    SELECT_PROFILE_START
} = ACTION_TYPES;


/**
 * Controllers
 */

/**
 * Fetch the authenticated user
 */
function* authUserSaga ()
{
    try {
        const { data } = yield call(fetchAuthAsync);

        yield put(authUserSuccess(data));

    } catch ({ message }) {

        yield put(authUserFailed({
            errorMessages: message
        }));

    }
}

/**
 * Forgot password request
 */

function* forgotPasswordSaga (payload)
{
    try {
        const { message } = yield call(forgotPasswordAsync, payload);

        yield put(forgotPasswordSuccess());

        yield put(ALERT.showAlert({
            status: 'success',
            message
        }));

    } catch ({ message }) {

        yield put(forgotPasswordFailed({
            errorMessages: message,
        }));

    }
}


/**
 * Sign in's a user
 * 
 * @param {object} payload 
 */
function* loginSaga (payload)
{
    try {
        const { status, data } = yield call(loginAsync, payload);
        const data_ = data;

        if (status === 'success') {
            const { access_token, expires_at, data } = data_;

            Cookies.set('access_token', access_token, expires_at);
            yield put(loginSuccess(data));

            data.role 
                ? yield put(push(PATH.DASHBOARD))
                : yield put(push(PATH.USER_PROFILE))
        }

    } catch ({ message, status }) {

        yield put(loginFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({ status, message: ERROR_MESSAGE_ON_LOGIN }));

    }
}

/**
 * Sign's out a user
 */
 function* logoutSaga ()
{
    try {
        
        const { message, status } = yield call(logoutAsync);

        Cookies.remove('access_token');

        yield put(logoutSuccess());
        yield put(ALERT.showAlert({
            status,
            message
        }));
        yield put(push(PATH.LOGIN));

    } catch ({ message }) {

        yield put(logoutFailed({
            errorMessages: message
        }));

    }
 }

 
/**
 * Create a new user resource
 * 
 * @param {object} payload 
 */
function* registerSaga (payload)
{
    try {
        const { data:{ access_token, expires_at },status, message } = yield call(registerAsync, payload);

        Cookies.set('email_verification_token', access_token, expires_at);
        yield put(registrationSuccess());
        yield put(ALERT.showAlert({ status, message }));
        yield put(push(PATH.LOGIN));
    } catch ({ message, status }) {

        yield put(registrationFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({ status, message: ERROR_MESSAGE_ON_REGISTER }));
    }
}


/**
 * Reset the user's password
 */

function* resetPasswordSaga (payload)
{
    try {
        const { message, status } = yield call(resetPasswordAsync, payload);

        yield put(resetPasswordSuccess());

        yield put(ALERT.showAlert({
            status,
            message
        }));
        
        yield put(push(PATH.LOGIN));

    } catch ({ message, status }) {
        
        yield put(resetPasswordFailed({
            errorMessages: message 
        }));

        yield put(ALERT.showAlert({ status, message: message }));
    }
}

function* verifyEmailSaga (payload)
{
    try {
        yield call(verifyEmailAsync, payload);
        yield put(verifyEmailSuccess());
    } catch ({ message, status }) {
        yield put(resetPasswordFailed({
            errorMessages: message 
        }));
        yield put(ALERT.showAlert({ status, message: message }));
    }
}

function* selectProfileSaga (payload)
{
    try {
        const { data: profile } = yield call(USER_PROFILE_API.findByIDAsync, payload);
        yield put(selectProfileSuccess({ profile }));
        yield put(push(PATH.PROFILE_HOME_PAGE));
    } catch ({ message, status }) {
        yield put(selectProfileFailed({ errorMessages: message }));
        yield put(ALERT.showAlert({ status, message }));
    }
}

/**
 * Watchers
 */
function* authUserWatcher () 
{
    while (true)
    {
        yield take(AUTH_USER_START); 

        yield call(authUserSaga);
    }
}

function* forgotPasswordWatcher () 
{
    while (true)
    {
        const { payload } = yield take(FORGOT_PASSWORD_START);

        yield call(forgotPasswordSaga, payload);
    }
}

function* loginWatcher () 
{
    while (true)
    {
        const { payload } = yield take(LOGIN_START); 

        yield call(loginSaga, payload);
    }
}

function* logoutWatcher () 
{
    while (true)
    {
        yield take(LOGOUT_START); 

        yield call(logoutSaga);
    }
}

function* registerWatcher () 
{
    while (true)
    {
        const { payload } = yield take(REGISTER_START); 

        yield call(registerSaga, payload);
    }
}

function* resetPasswordWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(RESET_PASSWORD_START);

        yield call(resetPasswordSaga, payload);
    }
}

function* verifyEmailWatcher ()
{
    while (true) 
    {
        const { payload } = yield take(VERIFIY_EMAIL_START);

        yield call(verifyEmailSaga, payload);
    }
}

function* selectProfileWatcher()
{
    while (true) 
    {
        const { payload } = yield take(SELECT_PROFILE_START);

        yield call(selectProfileSaga, payload);
    }
}

/**
 * Main
 */

export default function* ()
{
    yield all([
        authUserWatcher(),
        forgotPasswordWatcher(),
        loginWatcher(),
        logoutWatcher(),
        registerWatcher(),
        resetPasswordWatcher(),
        verifyEmailWatcher(),
        selectProfileWatcher()
    ]);
}