import { createSelector } from 'reselect';

export const getMainLayout = state => state.mainLayout;

export const selectMainLayout = createSelector(getMainLayout,mainLayout => mainLayout);