import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_PAYMONGO_WEBHOOKS_START,
    FETCH_ALL_PAYMONGO_WEBHOOKS_SUCCESS,
    FETCH_ALL_PAYMONGO_WEBHOOKS_FAILED,
    CLEAR_PAYMONGO_WEBHOOK_ERRORS,
} = ACTION_TYPES;

const initialState = {
    paymongoWebhooks: [],
    isLoading: false,
    error: null
};

export default (state = initialState, { type, payload }) =>
{
    const isLoading = false;
    const error = null;
    
    switch (type) 
    {
        
        case FETCH_ALL_PAYMONGO_WEBHOOKS_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_PAYMONGO_WEBHOOKS_SUCCESS:
            return {
                ...state,
                paymongoWebhooks: payload.paymongoWebhooks,
                isLoading,
                error 
            }

        case CLEAR_PAYMONGO_WEBHOOK_ERRORS:
            return {
                ...state,
                isLoading,
                error
            }
            
        case FETCH_ALL_PAYMONGO_WEBHOOKS_FAILED:
            return {
                ...state,
                isLoading,
                error
            }

        default:
            return state;
    }
}
