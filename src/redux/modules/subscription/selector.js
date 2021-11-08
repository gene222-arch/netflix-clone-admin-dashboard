import { createSelector } from 'reselect';

const getSubscription = state => state.subscription;
const getAuthUserSubscriptions = state => state.subscription.authenticatedUserSubscriptions;

export const selectSubscription = createSelector(getSubscription, subscriptions => subscriptions);  

export const selectAuthUserSubscriptions = createSelector(
    getAuthUserSubscriptions, 
    subscriptions => subscriptions
);  
