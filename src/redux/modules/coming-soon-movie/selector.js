import { createSelector } from 'reselect';

const getComingSoonMovie = state => state.comingSoonMovie;
const getErrorMessages = state => state.comingSoonMovie.error;

export const selectComingSoonMovie = createSelector(getComingSoonMovie, comingSoonMovie => comingSoonMovie);  

export const selectComingSoonMovieErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectComingSoonMovieHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  