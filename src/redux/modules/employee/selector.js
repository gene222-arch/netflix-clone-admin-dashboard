import { createSelector } from 'reselect';

const getEmployee = state => state.employee;
const getErrorMessages = state => state.employee.error;

export const selectEmployee = createSelector(getEmployee, employee => employee);  

export const selectEmployeeErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectEmployeeHasErrorMessages = createSelector(getErrorMessages, error => 
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