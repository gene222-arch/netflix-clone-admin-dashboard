import { createSelector } from 'reselect';

const getDirector = state => state.director;
const getDirectorList = state => state.director.directors;
const getErrorMessages = state => state.director.error;

export const selectDirector = createSelector(getDirector, director => director);  

export const selectDirectorNames = createSelector(getDirectorList, directorList => {
    return directorList.map(({ id, birth_name }) => ({ value: id, label: birth_name }))
});  

export const selectDirectorErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectDirectorHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  