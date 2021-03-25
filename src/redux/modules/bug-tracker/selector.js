import { createSelector } from 'reselect'

const getBug = state => state.bug;

export const selectBug = createSelector(
    [getBug],
    bug => bug
);