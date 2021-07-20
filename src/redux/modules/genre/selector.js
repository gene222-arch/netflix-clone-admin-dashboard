import { createSelector } from 'reselect';

const getGenre = state => state.genre;
const getErrorMessages = state => state.genre.error;

export const selectGenre = createSelector(getGenre, genre => genre);  

export const selectGenreErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectGenreHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  