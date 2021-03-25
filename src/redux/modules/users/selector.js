import { createSelector } from 'reselect';


const getUsers = state => state.users.users;

export const selectUsers = createSelector(
    [getUsers],
    users => users
);