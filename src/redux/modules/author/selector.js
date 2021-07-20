import { createSelector } from 'reselect';

const getAuthor = state => state.author;
const getErrorMessages = state => state.author.error;

export const selectAuthor = createSelector(getAuthor, author => author);  

export const selectAuthorErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectAuthorHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  