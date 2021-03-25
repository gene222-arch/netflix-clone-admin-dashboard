import { createSelector } from 'reselect';


const getAuthenticatedUser = state => state.user.authenticatedUser;
const getIsAuthenticated = state => state.user.isAuthenticated;

export const selectAuthenticatedUser = createSelector(
    [getAuthenticatedUser],
    user => user
);

export const selectIsUserAuthenticated = createSelector(
    [getIsAuthenticated],
    isAuthenticated => isAuthenticated
);