import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_SUBSCRIPTIONS_START,
    FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    FETCH_ALL_SUBSCRIPTIONS_FAILED,

    FETCH_SUBSCRIPTION_BY_USER_ID_START,
    FETCH_SUBSCRIPTION_BY_USER_ID_SUCCESS,
    FETCH_SUBSCRIPTION_BY_USER_ID_FAILED,
} = ACTION_TYPES;

const initialState = {
    subscriptions: [],
    authenticatedUserSubscriptions: [],
    isLoading: false,
    error: null
};

export default (state = initialState, { type, payload }) =>
{
    const isLoading = false;
    const error = null;
    
    switch (type) 
    {
        
        case FETCH_ALL_SUBSCRIPTIONS_START:
        case FETCH_SUBSCRIPTION_BY_USER_ID_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                subscriptions: payload.subscriptions,
                isLoading,
                error 
            }

        case FETCH_SUBSCRIPTION_BY_USER_ID_SUCCESS:
            return {
                ...state,
                authenticatedUserSubscriptions: payload.subscriptions,
                isLoading,
                error
            }
            
        case FETCH_ALL_SUBSCRIPTIONS_FAILED:
        case FETCH_SUBSCRIPTION_BY_USER_ID_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
