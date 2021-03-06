const ACTION_TYPES = 
{
    FETCH_ALL_EMPLOYEES_START: 'FETCH_ALL_EMPLOYEES_START',
    FETCH_ALL_EMPLOYEES_SUCCESS: 'FETCH_ALL_EMPLOYEES_SUCCESS',
    FETCH_ALL_EMPLOYEES_FAILED: 'FETCH_ALL_EMPLOYEES_FAILED',

    CREATE_EMPLOYEE_START: 'CREATE_EMPLOYEE_START',
    CREATE_EMPLOYEE_SUCCESS: 'CREATE_EMPLOYEE_SUCCESS',
    CREATE_EMPLOYEE_FAILED: 'CREATE_EMPLOYEE_FAILED',

    UPDATE_EMPLOYEE_START: 'UPDATE_EMPLOYEE_START',
    UPDATE_EMPLOYEE_SUCCESS: 'UPDATE_EMPLOYEE_SUCCESS',
    UPDATE_EMPLOYEE_FAILED: 'UPDATE_EMPLOYEE_FAILED',

    RESTORE_EMPLOYEES_START: 'RESTORE_EMPLOYEES_START',
    RESTORE_EMPLOYEES_SUCCESS: 'RESTORE_EMPLOYEES_SUCCESS',
    RESTORE_EMPLOYEES_FAILED: 'RESTORE_EMPLOYEES_FAILED',

    DESTROY_EMPLOYEES_START: 'DESTROY_EMPLOYEES_START',
    DESTROY_EMPLOYEES_SUCCESS: 'DESTROY_EMPLOYEES_SUCCESS',
    DESTROY_EMPLOYEES_FAILED: 'DESTROY_EMPLOYEES_FAILED',

    VERIFY_EMPLOYEE_EMAIL_START: 'VERIFY_EMPLOYEE_EMAIL_START',
    VERIFY_EMPLOYEE_EMAIL_SUCCESS: 'VERIFY_EMPLOYEE_EMAIL_SUCCESS',
    VERIFY_EMPLOYEE_EMAIL_FAILED: 'VERIFY_EMPLOYEE_EMAIL_FAILED',

    CLEAR_EMPLOYEE_ERRORS: 'CLEAR_EMPLOYEE_ERRORS'
};

export default ACTION_TYPES;