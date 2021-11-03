import { createSelector } from 'reselect';

const getNotification = state => state.notification;
const getPaymentAuthorizationNotifications = state => state.notification.paymentAuthorizationNotifications;

export const selectNotification = createSelector(getNotification, notification => notification);  

export const selectPaymentAuthorizationNotifications = createSelector(getPaymentAuthorizationNotifications, notifications => notifications);  
