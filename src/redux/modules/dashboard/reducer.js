import ACTION_TYPES from './action.types'

const {
    FETCH_DASHBOARD_DATA_START,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_FAILED,
} = ACTION_TYPES;


const initialState = {
    dashboardData: null,
    isLoading: false,
    hasLoaded: false,
    error: null
}

export default (state = initialState, { type, payload }) => 
{
    const isLoading = false;
    const error = null;

    switch (type) 
    {
        case FETCH_DASHBOARD_DATA_START:
            return { 
                ...state, 
                isLoading: true
            }

        case FETCH_DASHBOARD_DATA_SUCCESS:
            return { 
                ...state,
                dashboardData: payload.dashboardData,
                hasLoaded: true,
                isLoading,
                error 
            }

        case FETCH_DASHBOARD_DATA_FAILED:
            return { 
                ...state, 
                isLoading,
                error: payload.message
            }

        default:
            return state
    }
}
