import { createSelector } from 'reselect';

export const getAuth = state => state.auth;
export const getUser = state => state.auth.user;

export const selectAuth = createSelector(
    [getAuth],
    auth => auth
);

export const selectUser = createSelector(
    [getUser],
    user => user
);

