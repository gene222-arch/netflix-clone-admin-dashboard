import { createSelector } from 'reselect';

const getMovie = state => state.movie;
const getErrorMessages = state => state.movie.error;

export const selectMovie = createSelector(getMovie, movie => movie);  

export const selectMovieErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectMovieHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  