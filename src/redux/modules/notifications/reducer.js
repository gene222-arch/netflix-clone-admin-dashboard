import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_SUCCESS,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED
} = ACTION_TYPES;

const initialState = {
    paymentAuthorizationNotifications: [],
    isLoading: false,
    error: null
};

export default (state = initialState, { type, payload }) =>
{
    const isLoading = false;
    const error = null;
    
    switch (type) 
    {
        
        case FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                paymentAuthorizationNotifications: payload.notifications,
                isLoading,
                error 
            }
            
        case FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED:
            return {
                ...state,
                isLoading,
                error
            }

        default:
            return state;
    }
}
