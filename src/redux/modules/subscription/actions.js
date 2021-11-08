import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_SUBSCRIPTIONS_START,
    FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    FETCH_ALL_SUBSCRIPTIONS_FAILED,

    FETCH_SUBSCRIPTION_BY_USER_ID_START,
    FETCH_SUBSCRIPTION_BY_USER_ID_SUCCESS,
    FETCH_SUBSCRIPTION_BY_USER_ID_FAILED
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllSubscriptionsStart = (payload) => ({
    type: FETCH_ALL_SUBSCRIPTIONS_START,
    payload
});

export const fetchAllSubscriptionsSuccess = (payload) => ({
    type: FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    payload
});

export const fetchAllSubscriptionsFailed = (payload) => ({
    type: FETCH_ALL_SUBSCRIPTIONS_FAILED,
    payload
});

export const fetchSubscriptionByUserIdStart = (payload) => ({
    type: FETCH_SUBSCRIPTION_BY_USER_ID_START,
    payload
});

export const fetchSubscriptionByUserIdSuccess = (payload) => ({
    type: FETCH_SUBSCRIPTION_BY_USER_ID_SUCCESS,
    payload
});

export const fetchSubscriptionByUserIdFailed = (payload) => ({
    type: FETCH_SUBSCRIPTION_BY_USER_ID_FAILED,
    payload
});
