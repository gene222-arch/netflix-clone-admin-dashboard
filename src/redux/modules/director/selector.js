import { createSelector } from 'reselect';

const getDirector = state => state.director;
const getErrorMessages = state => state.director.error;

export const selectDirector = createSelector(getDirector, director => director);  

export const selectDirectorErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectDirectorHasErrorMessages = createSelector(selectDirectorErrorMessages, error => 
{
    let hasErrorMessages = {};

    for (const key in error) {
        return {
            ...hasErrorMessages,
            [key]: Boolean(error[key])
        };
    }
});  