import { createSelector } from 'reselect';

const getCast = state => state.cast;
const getErrorMessages = state => state.cast.error;

export const selectCast = createSelector(getCast, cast => cast);  

export const selectCastErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectCastHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  