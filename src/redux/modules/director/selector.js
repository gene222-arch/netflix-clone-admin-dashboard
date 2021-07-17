import { createSelector } from 'reselect';

const getDirector = state => state.director;

export const selectDirector = createSelector(getDirector, director => director);  