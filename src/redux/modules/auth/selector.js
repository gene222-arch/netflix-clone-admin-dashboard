import { createSelector } from 'reselect';

const getAuth = state => state.auth;
const getUser = state => state.auth.user;
const getErrorMessages = state => state.auth.error;

export const selectAuth = createSelector(getAuth, auth => auth);

export const selectUser = createSelector(getUser, user => user);

export const selectAuthErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectAuthHasErrorMessages = createSelector(selectAuthErrorMessages, error => 
{
    let hasErrorMessages = {};

    for (const key in error) {
        return {
            ...hasErrorMessages,
            [key]: Boolean(error[key])
        };
    }
});  
