import { createSelector } from 'reselect';

const getNotification = state => state.notifications;
const getPaymentAuthorizationNotifications = state => state.notifications.paymentAuthorizationNotifications;

export const selectNotification = createSelector(getNotification, notification => notification);  

export const selectPaymentAuthorizationNotifications = createSelector(getPaymentAuthorizationNotifications, notifications => notifications);  

export const selectUnreadPaymentAuthNotifications = createSelector(
    selectPaymentAuthorizationNotifications, 
    notifications => notifications.filter(({ read_at }) => !read_at)
);