import { createSelector } from 'reselect';

const getCast = state => state.cast;

export const selectCast = createSelector(getCast, cast => cast);  