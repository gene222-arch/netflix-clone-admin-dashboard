import { createSelector } from 'reselect';

export const getAlert = state => state.alert;

export const selectAlert = createSelector(
    [getAlert],
    alert => alert
);  