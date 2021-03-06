import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_SUCCESS,
    FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS,
    MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED,
    CLEAR_PAYMENT_AUTH_NOTIFICATIONS_START,
    CLEAR_PAYMENT_AUTH_NOTIFICATIONS_SUCCESS,
    CLEAR_PAYMENT_AUTH_NOTIFICATIONS_FAILED,
    MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START,
    MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS,
    MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED,
    CREATE_PAYMENT_AUTH_NOTIFICATION,
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
        case CLEAR_PAYMENT_AUTH_NOTIFICATIONS_START:
        case FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_START:
        case MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START:
        case MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_START:
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
            let paymentAuthNotifs = state.paymentAuthorizationNotifications;
            
            paymentAuthNotifs = paymentAuthNotifs.map(notif => ({
                ...notif,
                read_at: Date.now()
            }));

            return {
                ...state,
                paymentAuthorizationNotifications: paymentAuthNotifs,
                isLoading,
                error
            }

        case MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_SUCCESS:
            let paymentAuthNotifs_ = state.paymentAuthorizationNotifications;
            
            paymentAuthNotifs_ = paymentAuthNotifs_.map(notif => {
                return notif.id === payload.id 
                ? ({
                    ...notif,
                    read_at: Date.now()
                })
                : notif
            });

            return {
                ...state,
                paymentAuthorizationNotifications: paymentAuthNotifs_,
                isLoading,
                error
            }

        case CREATE_PAYMENT_AUTH_NOTIFICATION:
            return {
                ...state,
                paymentAuthorizationNotifications: [
                    payload.paymentAuthorizationNotification,
                    ...state.paymentAuthorizationNotifications,
                ],
                isLoading,
                error
            }
            
        case CLEAR_PAYMENT_AUTH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                paymentAuthorizationNotifications: [],
                isLoading,
                error
            }
        
        case CLEAR_PAYMENT_AUTH_NOTIFICATIONS_FAILED:
        case FETCH_ALL_PAYMENT_AUTHORIZATION_NOTIFICATIONS_FAILED:
        case MARK_ALL_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED:
        case MARK_PAYMENT_AUTH_NOTIFICATIONS_AS_READ_FAILED:
            return {
                ...state,
                isLoading,
                error
            }

        default:
            return state;
    }
}
