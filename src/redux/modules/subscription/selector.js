import { createSelector } from 'reselect';

const getSubscription = state => state.subscriptions;

export const selectSubscription = createSelector(getSubscription, subscriptions => subscriptions);  
