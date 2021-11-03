import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_SUCCESS,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED
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



