import { createSelector } from 'reselect';

const getAuthor = state => state.author;
const getAuthorList = state => state.author.authors;
const getErrorMessages = state => state.author.error;

export const selectAuthor = createSelector(getAuthor, author => author);  

export const selectAuthorNames = createSelector(getAuthorList, authorList => {
   return authorList.map(({ id, birth_name }) => ({ value: id, label: birth_name }))
});  

export const selectAuthorErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectAuthorHasErrorMessages = createSelector(getErrorMessages, error => 
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