import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_SUBSCRIPTIONS_START,
    FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    FETCH_ALL_SUBSCRIPTIONS_FAILED
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


