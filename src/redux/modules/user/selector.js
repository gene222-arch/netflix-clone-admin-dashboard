import { createSelector } from 'reselect';

const getUser = state => state.user;
const getErrorMessages = state => state.user.error;

export const selectUser = createSelector(getUser, user => user);  

export const selectUserErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectUserHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    for (const key in error) {
        hasErrorMessages = {
            ...hasErrorMessages,
            [key]: Boolean(error[key])
        };
    }

    return hasErrorMessages;
});  