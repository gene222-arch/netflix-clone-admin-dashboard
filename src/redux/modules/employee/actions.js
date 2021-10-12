import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_EMPLOYEES_START,
    FETCH_ALL_EMPLOYEES_SUCCESS,
    FETCH_ALL_EMPLOYEES_FAILED,
    CREATE_EMPLOYEE_START,
    CREATE_EMPLOYEE_SUCCESS,
    CREATE_EMPLOYEE_FAILED,
    UPDATE_EMPLOYEE_START,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAILED,
    DESTROY_EMPLOYEES_START,
    DESTROY_EMPLOYEES_SUCCESS,
    DESTROY_EMPLOYEES_FAILED,
    VERIFY_EMPLOYEE_EMAIL_START,
    VERIFY_EMPLOYEE_EMAIL_SUCCESS,
    VERIFY_EMPLOYEE_EMAIL_FAILED,
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


/** Create action */
export const createEmployeeStart = (payload) => ({
    type: CREATE_EMPLOYEE_START,
    payload
});

export const createEmployeeSuccess = (payload) => ({
    type: CREATE_EMPLOYEE_SUCCESS,
    payload
});

export const createEmployeeFailed = (payload) => ({
    type: CREATE_EMPLOYEE_FAILED,
    payload
});

/** Update */
export const updateEmployeeStart = (payload) => ({
    type: UPDATE_EMPLOYEE_START,
    payload
});

export const updateEmployeeSuccess = (payload) => ({
    type: UPDATE_EMPLOYEE_SUCCESS,
    payload
});

export const updateEmployeeFailed = (payload) => ({
    type: UPDATE_EMPLOYEE_FAILED,
    payload
});

/** Destroy */
export const destroyEmployeesStart = (payload) => ({
    type: DESTROY_EMPLOYEES_START,
    payload
});

export const destroyEmployeesSuccess = (payload) => ({
    type: DESTROY_EMPLOYEES_SUCCESS,
    payload
});

export const destroyEmployeesFailed = (payload) => ({
    type: DESTROY_EMPLOYEES_FAILED,
    payload
});

/** Verify */
export const verifyEmployeeEmailStart = (payload) => ({
    type: VERIFY_EMPLOYEE_EMAIL_START,
    payload
});

export const verifyEmployeeEmailSuccess = (payload) => ({
    type: VERIFY_EMPLOYEE_EMAIL_SUCCESS,
    payload
});

export const verifyEmployeeEmailFailed = (payload) => ({
    type: VERIFY_EMPLOYEE_EMAIL_FAILED,
    payload
});

/** Clear Employee errors */
export const clearEmployeeErrors = (payload) => ({
    type: CLEAR_EMPLOYEE_ERRORS,
    payload
});
