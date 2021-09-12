import { createSelector } from 'reselect';

const getAccessRight = state => state.accessRight;
const getErrorMessages = state => state.accessRight.error;

export const selectAccessRight = createSelector(getAccessRight, accessRight => accessRight);  

export const selectAccessRightErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectAccessRightHasErrorMessages = createSelector(getErrorMessages, error => 
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