import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_SUCCESS,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED,
    MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS,
    MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED,
    CREATE_PAYMENT_AUTH_NOTIFICATION,
    CLEAR_PAYMENT_AUTH_NOTIFICATIONS_START,
    CLEAR_PAYMENT_AUTH_NOTIFICATIONS_SUCCESS,
    CLEAR_PAYMENT_AUTH_NOTIFICATIONS_FAILED
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllPaymentAuthorizationNotificationsStart = (payload) => ({
    type: FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    payload
});

export const fetchAllPaymentAuthorizationNotificationsSuccess = (payload) => ({
    type: FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_SUCCESS,
    payload
});

export const fetchAllPaymentAuthorizationNotificationsFailed = (payload) => ({
    type: FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED,
    payload
});


export const markAllPaymentAuthNotificationsAsReadStart = (payload) => ({
    type: MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    payload
});

export const markAllPaymentAuthNotificationsAsReadSuccess = (payload) => ({
    type: MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS,
    payload
});

export const markAllPaymentAuthNotificationsAsReadFailed = (payload) => ({
    type: MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED,
    payload
});

export const markPaymentAuthNotificationsAsReadStart = (payload) => ({
    type: MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    payload
});

export const markPaymentAuthNotificationsAsReadSuccess = (payload) => ({
    type: MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS,
    payload
});

export const markPaymentAuthNotificationsAsReadFailed = (payload) => ({
    type: MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED,
    payload
});

export const createPaymentAuthNotification = (payload) => ({
    type: CREATE_PAYMENT_AUTH_NOTIFICATION,
    payload
});

export const clearPaymentAuthNotificationsStart = (payload) => ({
    type: CLEAR_PAYMENT_AUTH_NOTIFICATIONS_START,
    payload
});

export const clearPaymentAuthNotificationsSuccess = (payload) => ({
    type: CLEAR_PAYMENT_AUTH_NOTIFICATIONS_SUCCESS,
    payload
});

export const clearPaymentAuthNotificationsFailed = (payload) => ({
    type: CLEAR_PAYMENT_AUTH_NOTIFICATIONS_FAILED,
    payload
});