import { createSelector } from 'reselect';

const getUser = state => state.user;
const getErrorMessages = state => state.user.error;

export const selectUser = createSelector(getUser, user => user);  

export const selectUserErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectUserHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  