import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_ACTIVITY_LOGS_START,
    FETCH_ALL_ACTIVITY_LOGS_SUCCESS,
    FETCH_ALL_ACTIVITY_LOGS_FAILED,
    FIND_ACTIVITY_LOG_BY_ID_START,
    FIND_ACTIVITY_LOG_BY_ID_SUCCESS,
    FIND_ACTIVITY_LOG_BY_ID_FAILED,
    CREATE_ACTIVITY_LOG_START,
    CREATE_ACTIVITY_LOG_SUCCESS,
    CREATE_ACTIVITY_LOG_FAILED,
    UPDATE_ACTIVITY_LOG_START,
    UPDATE_ACTIVITY_LOG_SUCCESS,
    UPDATE_ACTIVITY_LOG_FAILED,
    DELETE_ACTIVITY_LOGS_START,
    DELETE_ACTIVITY_LOGS_SUCCESS,
    DELETE_ACTIVITY_LOGS_FAILED,
    CLEAR_ACTIVITY_LOG_ERRORS
} = ACTION_TYPES;

const ACTIVITY_LOG_DEFAULT_PROPS = {
    id: '',
    user_id: '',
    model_type: '',
    type: '',
    description: '',
    view_data_path: ''
};

const initialState = {
    activityLog: ACTIVITY_LOG_DEFAULT_PROPS,
    activityLogs: [],
    isLoading: false,
    error: ACTIVITY_LOG_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        activityLogs
    } = state;

    const isLoading = false;
    const error = ACTIVITY_LOG_DEFAULT_PROPS;
    let UPDATED_ACTIVITY_LOGS = [];
    
    switch (type) 
    {
        case FETCH_ALL_ACTIVITY_LOGS_START:
        case FIND_ACTIVITY_LOG_BY_ID_START:
        case CREATE_ACTIVITY_LOG_START:
        case UPDATE_ACTIVITY_LOG_START:
        case DELETE_ACTIVITY_LOGS_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_ACTIVITY_LOGS_SUCCESS:
            return {
                ...state,
                activityLogs: payload.activityLogs,
                isLoading,
                error 
            }

        case FIND_ACTIVITY_LOG_BY_ID_SUCCESS:
            return {
                ...state,
                activityLog: payload.activityLog,
                isLoading,
                error
            }

        case CREATE_ACTIVITY_LOG_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }

        case UPDATE_ACTIVITY_LOG_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }

        case DELETE_ACTIVITY_LOGS_SUCCESS:

            UPDATED_ACTIVITY_LOGS = activityLogs.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                activityLogs: UPDATED_ACTIVITY_LOGS,
                isLoading,
                error
            }

        case CLEAR_ACTIVITY_LOG_ERRORS: 
            return {
                ...state,
                error
            }

        case FETCH_ALL_ACTIVITY_LOGS_FAILED:
        case FIND_ACTIVITY_LOG_BY_ID_FAILED:
        case CREATE_ACTIVITY_LOG_FAILED:
        case UPDATE_ACTIVITY_LOG_FAILED:
        case DELETE_ACTIVITY_LOGS_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
