import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

import * as API from '../../../services/notification';
import ACTION_TYPES from './action.types'
import { 
    fetchAllPaymentAuthorizationNotificationsSuccess,
    fetchAllPaymentAuthorizationNotificationsFailed,
    markAllPaymentAuthNotificationsAsReadSuccess,
    markAllPaymentAuthNotificationsAsReadFailed,
    markPaymentAuthNotificationsAsReadSuccess,
    markPaymentAuthNotificationsAsReadFailed,
    clearPaymentAuthNotificationsSuccess,
    clearPaymentAuthNotificationsFailed
} from './actions';
import { showAlert } from '../alert/actions';
import PATH from '../../../routes/path';

const {
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    CLEAR_PAYMENT_AUTH_NOTIFICATIONS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllPaymentAuthorizationNotificationsSaga()
{
    try {
        const { data: notifications, status } = yield call(API.fetchAllPaymentAuthorizationByUserIdAsync);
        
        if (status === 'success') {
            yield put(fetchAllPaymentAuthorizationNotificationsSuccess({ notifications }));
        }
        else {
            yield put(fetchAllPaymentAuthorizationNotificationsSuccess({ notifications: [] }));
        }
    } catch ({ message }) {
        yield put(fetchAllPaymentAuthorizationNotificationsFailed({ message }));
    }
}

function* markAllPaymentAuthNotificationsSaga()
{
    try {
        yield call(API.markAllPaymentAuthNotifsAsReadAsync);
        yield put(markAllPaymentAuthNotificationsAsReadSuccess());
    } catch ({ message }) {
        yield put(markAllPaymentAuthNotificationsAsReadFailed({ message }));
    }
}

function* markPaymentAuthNotificationsSaga(payload)
{
    try {
        const { id } = payload;

        yield put(markPaymentAuthNotificationsAsReadSuccess({ id }));
        yield call(API.markPaymentAuthNotifsAsReadAsync, id);
    } catch ({ message }) {
        yield put(markPaymentAuthNotificationsAsReadSuccess({ message }));
    }
}


function* clearPaymentAuthNotificationsSaga()
{
    try {
        yield call(API.clearAllPaymentAuthNotifsAsync);
        yield put(clearPaymentAuthNotificationsSuccess());
    } catch ({ message }) {
        yield put(clearPaymentAuthNotificationsFailed({ message }));
    }
}
/**
 * Watchers
 */
function* fetchAllPaymentAuthorizationNotificationsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START);
        yield call(fetchAllPaymentAuthorizationNotificationsSaga);
    }
}

function* markAllPaymentAuthNotificationsWatcher()
{
    while (true) {
        yield take(MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START);
        yield call(markAllPaymentAuthNotificationsSaga);
    }
}

function* markPaymentAuthNotificationsWatcher()
{
    while (true) {
        const { payload } = yield take(MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START);
        yield call(markPaymentAuthNotificationsSaga, payload);
    }
}

function* clearPaymentAuthNotificationsWatcher()
{
    while (true) {
        yield take(CLEAR_PAYMENT_AUTH_NOTIFICATIONS_START);
        yield call(clearPaymentAuthNotificationsSaga);
    }
}
/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllPaymentAuthorizationNotificationsWatcher(),
        markAllPaymentAuthNotificationsWatcher(),
        markPaymentAuthNotificationsWatcher(),
        clearPaymentAuthNotificationsWatcher()
    ]);
}