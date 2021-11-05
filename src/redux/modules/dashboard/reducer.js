
import ACTION_TYPES from './action.types'

const {
    FETCH_DASHBOARD_DATA_START,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_FAILED,
} = ACTION_TYPES;

const DEFAULT_DASHBOARD_DATA = 
{
    monthly_subscribers_per_year: [],
    monthly_active_subscribers: [],
    monthly_subscription_revenue: [],
    general_analytics: {
        total_number_of_employees: '',
        total_active_subscribers: '',
        total_number_of_subscribers: '',
        total_number_of_movies: '',
        total_number_of_coming_soon_movies: '',
        revenue: ''
    },
    top_five_most_rated_movies: [],
    top_five_most_liked_movies: [],
};


const initialState = {
    dashboardData: DEFAULT_DASHBOARD_DATA,
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
