import { createSelector } from 'reselect';

const getConfirm = state => state.confirm;

export const selectConfirm = createSelector(getConfirm, confirm => confirm);  