import { createSelector } from 'reselect';

const getSubscription = state => state.subscription;

export const selectSubscription = createSelector(getSubscription, subscriptions => subscriptions);  
