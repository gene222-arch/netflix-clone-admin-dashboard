import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_PAYMONGO_WEBHOOKS_START,
    FETCH_ALL_PAYMONGO_WEBHOOKS_SUCCESS,
    FETCH_ALL_PAYMONGO_WEBHOOKS_FAILED,
    CLEAR_PAYMONGO_WEBHOOK_ERRORS,
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllPaymongoWebhooksStart = (payload) => ({
    type: FETCH_ALL_PAYMONGO_WEBHOOKS_START,
    payload
});

export const fetchAllPaymongoWebhooksSuccess = (payload) => ({
    type: FETCH_ALL_PAYMONGO_WEBHOOKS_SUCCESS,
    payload
});

export const fetchAllPaymongoWebhooksFailed = (payload) => ({
    type: FETCH_ALL_PAYMONGO_WEBHOOKS_FAILED,
    payload
});


/** Clear PaymongoWebhook error action */
export const clearPaymongoWebhookErrors = (payload) => ({
    type: CLEAR_PAYMONGO_WEBHOOK_ERRORS,
    payload
});



