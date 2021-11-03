import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_SUCCESS,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED
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
        case MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START:
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

        case MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }
            
        case FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED:
        case MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED:
            return {
                ...state,
                isLoading,
                error
            }

        default:
            return state;
    }
}
