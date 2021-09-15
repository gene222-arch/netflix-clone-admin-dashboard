import { createSelector } from 'reselect';

const getMovie = state => state.movie;
const getErrorMessages = state => state.movie.error;

export const selectMovie = createSelector(getMovie, movie => movie);  

export const selectMovieErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectMovieHasErrorMessages = createSelector(getErrorMessages, error => 
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