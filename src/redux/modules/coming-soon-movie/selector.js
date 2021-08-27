import { createSelector } from 'reselect';

const getComingSoonMovie = state => state.comingSoonMovie;
const getErrorMessages = state => state.comingSoonMovie.error;
const getTrailerErrorMessages = state => state.comingSoonMovie.trailerError;

export const selectComingSoonMovie = createSelector(getComingSoonMovie, comingSoonMovie => comingSoonMovie);  

export const selectComingSoonMovieErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectTrailerErrorMessages = createSelector(getTrailerErrorMessages, trailerError => trailerError);  

export const selectComingSoonMovieHasErrorMessages = createSelector(getErrorMessages, errors => 
{
    let hasErrorMessages = {};

    for (const key in errors) {
        hasErrorMessages = {
            ...hasErrorMessages,
            [key]: Boolean(errors[key])
        };
    }

    return hasErrorMessages;
});  

export const selectTrailerHasErrorMessages = createSelector(getTrailerErrorMessages, errors => 
{
    let hasErrorMessages = {};

    for (const key in errors) {
        hasErrorMessages = {
            ...hasErrorMessages,
            [key]: Boolean(errors[key])
        };
    }

    return hasErrorMessages;
});  