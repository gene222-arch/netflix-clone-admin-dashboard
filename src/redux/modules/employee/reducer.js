import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_EMPLOYEES_START,
    FETCH_ALL_EMPLOYEES_SUCCESS,
    FETCH_ALL_EMPLOYEES_FAILED,
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
            return {
                ...state,
                isLoading: true
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
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
