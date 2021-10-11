import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_EMPLOYEES_START,
    FETCH_ALL_EMPLOYEES_SUCCESS,
    FETCH_ALL_EMPLOYEES_FAILED,
    CLEAR_EMPLOYEE_ERRORS
} = ACTION_TYPES;


/** Fetch All action */
export const fetchAllEmployeesStart = (payload) => ({
    type: FETCH_ALL_EMPLOYEES_START,
    payload
});

export const fetchAllEmployeesSuccess = (payload) => ({
    type: FETCH_ALL_EMPLOYEES_SUCCESS,
    payload
});

export const fetchAllEmployeesFailed = (payload) => ({
    type: FETCH_ALL_EMPLOYEES_FAILED,
    payload
});

/** Clear Employee errors */
export const clearEmployeeErrors = (payload) => ({
    type: CLEAR_EMPLOYEE_ERRORS,
    payload
});
