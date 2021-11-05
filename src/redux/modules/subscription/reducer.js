import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_SUBSCRIPTIONS_START,
    FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    FETCH_ALL_SUBSCRIPTIONS_FAILED
} = ACTION_TYPES;

const initialState = {
    subscriptions: [],
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
            
        case FETCH_ALL_SUBSCRIPTIONS_FAILED:
            return {
                ...state,
                isLoading,
                error
            }

        default:
            return state;
    }
}
