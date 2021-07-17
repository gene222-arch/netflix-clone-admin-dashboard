import { createSelector } from 'reselect';

const getAuthor = state => state.author;

export const selectAuthor = createSelector(getAuthor, author => author);  