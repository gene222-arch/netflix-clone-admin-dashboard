import { createSelector } from 'reselect';

const getAuthor = state => state.author;
const getErrorMessages = state => state.author.error;

export const selectAuthor = createSelector(getAuthor, author => author);  

export const selectAuthorErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectAuthorHasErrorMessages = createSelector(selectAuthorErrorMessages, error => 
{
    let hasErrorMessages = {};

    for (const key in error) {
        return {
            ...hasErrorMessages,
            [key]: Boolean(error[key])
        };
    }
});  