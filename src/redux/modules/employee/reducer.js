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
    CLEAR_EMPLOYEE_ERRORS
} = ACTION_TYPES;

const EMPLOYEE_DEFAULT_PROPS = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    pin_code: ''
};

const initialState = {
    employee: EMPLOYEE_DEFAULT_PROPS,
    employees: [],
    isLoading: false,
    error: EMPLOYEE_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const isLoading = false;
    
    const error = EMPLOYEE_DEFAULT_PROPS;

    switch (type) 
    {
        
        case FETCH_ALL_EMPLOYEES_START:
        case CREATE_EMPLOYEE_START:
        case UPDATE_EMPLOYEE_START:
        case DESTROY_EMPLOYEES_START:
            return {
                ...state,
                isLoading: true
            }

        case CREATE_EMPLOYEE_SUCCESS:
        case UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isLoading,
                error 
            }

        case DESTROY_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: state.employees.filter(({ id }) => !payload.ids.includes(id)),
                isLoading,
                error
            }

        case FETCH_ALL_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: payload.employees,
                isLoading,
                error 
            }

        case CLEAR_EMPLOYEE_ERRORS: 
            return {
                ...state,
                isLoading,
                error
            }

        case FETCH_ALL_EMPLOYEES_FAILED:
        case CREATE_EMPLOYEE_FAILED:
        case UPDATE_EMPLOYEE_FAILED:
        case DESTROY_EMPLOYEES_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
