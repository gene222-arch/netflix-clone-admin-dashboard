import { createSelector } from 'reselect';

const getGenre = state => state.genre;

export const selectGenre = createSelector(getGenre, genre => genre);  