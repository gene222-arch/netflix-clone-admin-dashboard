import { createSelector } from 'reselect';

const getGenre = state => state.genre;
const getGenreList = state => state.genre.genres;
const getErrorMessages = state => state.genre.error;

export const selectGenre = createSelector(getGenre, genre => genre);  

export const selectGenreNames = createSelector(getGenreList, genreList => {
    return genreList.map(({ id, name }) => ({ value: id, label: name }))
});  


export const selectGenreErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectGenreHasErrorMessages = createSelector(getErrorMessages, error => 
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