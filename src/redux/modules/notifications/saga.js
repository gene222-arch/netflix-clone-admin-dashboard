import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

import * as API from '../../../services/notification';
import ACTION_TYPES from './action.types'
import { 
    fetchAllPaymentAuthorizationNotificationsSuccess,
    fetchAllPaymentAuthorizationNotificationsFailed,
    markAllPaymentAuthNotificationsAsReadSuccess,
    markAllPaymentAuthNotificationsAsReadFailed
} from './actions';
import { showAlert } from '../alert/actions';
import PATH from '../../../routes/path';

const {
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllPaymentAuthorizationNotificationsSaga()
{
    try {
        const { data: notifications } = yield call(API.fetchAllPaymentAuthorizationByUserIdAsync);
        yield put(fetchAllPaymentAuthorizationNotificationsSuccess({ notifications }));
    } catch ({ message }) {
        yield put(fetchAllPaymentAuthorizationNotificationsFailed({ message }));
    }
}

function* markAllPaymentAuthNotificationsSaga()
{
    try {
        yield call(API.fetchAllPaymentAuthorizationByUserIdAsync);
        yield put(markAllPaymentAuthNotificationsAsReadSuccess());
    } catch ({ message }) {
        yield put(markAllPaymentAuthNotificationsAsReadFailed({ message }));
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
/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllPaymentAuthorizationNotificationsWatcher(),
        markAllPaymentAuthNotificationsWatcher()
    ]);
}