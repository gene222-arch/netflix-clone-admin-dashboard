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
import * as SUBSCRIPTION_API from './../../../services/subscription'

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    addProfileSuccess,
    addProfileFailed,
    authUserSuccess,
    authUserFailed,
    cancelSubscriptionSuccess,
    cancelSubscriptionFailed,
    deleteProfileByIdSuccess,
    deleteProfileByIdFailed,
    disableProfilesSuccess,
    disableProfilesFailed,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    loginSuccess, 
    loginFailed, 
    registrationSuccess, 
    registrationFailed, 
    logoutSuccess,
    logoutFailed,
    manageProfileLockSuccess,
    manageProfileLockFailed,
    resetPasswordSuccess,
    resetPasswordFailed,
    verifyEmailSuccess,
    verifyEmailFailed,
    selectProfileSuccess,
    selectProfileFailed,
    updateProfileByIdSuccess,
    updateProfileByIdFailed
} from './actions';
import * as ALERT from './../alert/actions';

/** Utils */
import * as Cookies from '../../../utils/cookies'
import PATH from './../../../routes/path';

/** Error messages */
import { ERROR_MESSAGE_ON_UPDATE, ERROR_MESSAGE_ON_REGISTER } from './../../../config/alertMessages';



/** Action types */
const { 
    ADD_PROFILE_START,
    AUTH_USER_START,
    CANCEL_SUBSCRIPTION_START,
    DELETE_PROFILE_BY_ID_START,
    DISABLE_PROFILES_START,
    FORGOT_PASSWORD_START,
    LOGIN_START,
    LOGOUT_START,
    MANAGE_PROFILE_LOCK_START,
    REGISTER_START,
    RESET_PASSWORD_START,
    VERIFY_EMAIL_START,
    SELECT_PROFILE_START,
    UPDATE_PROFILE_BY_ID_START
} = ACTION_TYPES;


/**
 * Controllers
 */


 function* addProfileSaga (payload)
 {
     try {
         const { data, message } = yield call(USER_PROFILE_API.createAsync, payload.profile);
         yield put(addProfileSuccess({ profile: data }));

         yield put(ALERT.showAlert({
            status: 'success',
            message
        }));
        yield put(push(PATH.USER_PROFILE));
     } catch ({ message }) {
         yield put(addProfileFailed({
             errorMessages: message
         }));
     }
 }

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

 function* cancelSubscriptionSaga ()
 {
     try {
         const { data, message } = yield call(SUBSCRIPTION_API.cancelAsync);
 
         yield put(cancelSubscriptionSuccess({
             subscription_details: data
         }));

         yield put(ALERT.showAlert({
            status: 'success',
            message
        }));

        yield put(push(PATH.PROFILE_HOME_PAGE));

     } catch ({ message }) {
         yield put(cancelSubscriptionFailed({ errorMessages: message }));
     }
 }

 function* deleteProfileByIdSaga (payload)
 {
     try {
         const { message } = yield call(USER_PROFILE_API.deleteAsync, payload.id);
 
         yield put(deleteProfileByIdSuccess({
             profile_id: payload.id
         }));

         yield put(ALERT.showAlert({
            status: 'success',
            message
        }));
     } catch ({ message }) {
         yield put(deleteProfileByIdFailed({ errorMessages: message }));
     }
 }

 function* disableProfilesSaga (payload)
 {
     try {
         const { message, status } = yield call(USER_PROFILE_API.disableAsync, payload.profileIds);
 
         yield put(disableProfilesSuccess(payload));

         yield put(ALERT.showAlert({
            status,
            message
        }));

     } catch ({ message }) {
         yield put(disableProfilesFailed({ errorMessages: message }));
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

        yield put(push(PATH.LOGIN));

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

        if (status === 'success') 
        {
            const { access_token, expires_at, data } = data_;

            Cookies.set('access_token', access_token, expires_at);
            yield put(loginSuccess(data));

            data.role !== 'Subscriber'
                ? yield put(push(PATH.DASHBOARD))
                : yield put(push(PATH.USER_PROFILE))
        }

    } catch ({ message, status }) {
        yield put(loginFailed({
            errorMessages: message
        }));

        yield put(ALERT.showAlert({ status, message: message.email || message.password || message }));
    }
}

/**
 * Sign's out a user
 */
 function* logoutSaga ()
{
    try {
        
        const { message, status } = yield call(logoutAsync);
        yield put(logoutSuccess());
        yield put(ALERT.showAlert({
            status,
            message
        }));
        yield put(push(PATH.LOGIN));
        Cookies.removeToken();
    } catch ({ message }) {

        yield put(logoutFailed({
            errorMessages: message
        }));

    }
 }


function* manageProfileLockSaga(payload)
{
    try {
        
        const { message, status } = yield call(USER_PROFILE_API.manageProfileLockAsync, payload);

        yield put(manageProfileLockSuccess(payload));
        yield put(ALERT.showAlert({ status, message }));
        yield put(push(PATH.PROFILE_HOME_PAGE));

    } catch ({ message }) {
        yield put(manageProfileLockFailed({ errorMessages: message }));
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

        Cookies.removeToken();

        yield put(ALERT.showAlert({
            status,
            message
        }));
        
        yield put(push(PATH.LOGIN));

    } catch ({ message, status }) {
        
        yield put(resetPasswordFailed({
            errorMessages: message 
        }));

        yield put(ALERT.showAlert({ status, message }));
    }
}

function* verifyEmailSaga (payload)
{
    try {
        yield call(verifyEmailAsync, payload);
        yield put(verifyEmailSuccess());
        Cookies.removeEmailVerificationToken();
    } catch ({ message, status }) {
        yield put(verifyEmailFailed({
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

function* updateProfileByIdSaga (payload)
{
    try {
        yield call(USER_PROFILE_API.updateAsync, payload.profile);
        yield put(updateProfileByIdSuccess({ profile: payload.profile }));
        yield put(push(PATH.PROFILE_HOME_PAGE));
    } catch ({ message, status }) {
        yield put(updateProfileByIdFailed({ errorMessages: message }));
        yield put(ALERT.showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

/**
 * Watchers
 */
function* addProfileWatcher () 
{
    while (true)
    {
        const { payload } = yield take(ADD_PROFILE_START); 
        yield call(addProfileSaga, payload);
    }
}

function* authUserWatcher () 
{
    while (true)
    {
        yield take(AUTH_USER_START); 

        yield call(authUserSaga);
    }
}

function* cancelSubscriptionWatcher () 
{
    while (true)
    {
        yield take(CANCEL_SUBSCRIPTION_START); 
        yield call(cancelSubscriptionSaga);
    }
}

function* deleteProfileByIdWatcher () 
{
    while (true)
    {
        const { payload } = yield take(DELETE_PROFILE_BY_ID_START); 
        yield call(deleteProfileByIdSaga, payload);
    }
}

function* disableProfilesWatcher () 
{
    while (true)
    {
        const { payload } = yield take(DISABLE_PROFILES_START); 
        yield call(disableProfilesSaga, payload);
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

function* managaProfileLockWatcher () 
{
    while (true)
    {
        const { payload } = yield take(MANAGE_PROFILE_LOCK_START); 

        yield call(manageProfileLockSaga, payload);
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
        const { payload } = yield take(VERIFY_EMAIL_START);

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

function* updateProfileByIdWatcher()
{
    while (true) 
    {
        const { payload } = yield take(UPDATE_PROFILE_BY_ID_START);

        yield call(updateProfileByIdSaga, payload);
    }
}
/**
 * Main
 */

export default function* ()
{
    yield all([
        addProfileWatcher(),
        authUserWatcher(),
        cancelSubscriptionWatcher(),
        deleteProfileByIdWatcher(),
        disableProfilesWatcher(),
        forgotPasswordWatcher(),
        loginWatcher(),
        logoutWatcher(),
        managaProfileLockWatcher(),
        registerWatcher(),
        resetPasswordWatcher(),
        verifyEmailWatcher(),
        selectProfileWatcher(),
        updateProfileByIdWatcher()
    ]);
}