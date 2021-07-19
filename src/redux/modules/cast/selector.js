import { createSelector } from 'reselect';

const getCast = state => state.cast;
const getErrorMessages = state => state.cast.error;

export const selectCast = createSelector(getCast, cast => cast);  

export const selectCastErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectCastHasErrorMessages = createSelector(selectCastErrorMessages, error => 
{
    let hasErrorMessages = {};

    for (const key in error) {
        return {
            ...hasErrorMessages,
            [key]: Boolean(error[key])
        };
    }
});  