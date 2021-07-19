import { createSelector } from 'reselect';

const getGenre = state => state.genre;
const getErrorMessages = state => state.genre.error;

export const selectGenre = createSelector(getGenre, genre => genre);  

export const selectGenreErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectGenreHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    for (const key in error) {
        return {
            ...hasErrorMessages,
            [key]: Boolean(error[key])
        };
    }
});  