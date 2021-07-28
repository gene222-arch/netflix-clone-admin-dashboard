import ACTION_TYPES from './action.types'

const {
    FETCH_DASHBOARD_DATA_START,
    FETCH_DASHBOARD_DATA_SUCCESS,
    FETCH_DASHBOARD_DATA_FAILED,
} = ACTION_TYPES;


/** Fetch dashboard data */

export const fetchDashboardDataStart = (payload) => ({
    type: FETCH_DASHBOARD_DATA_START,
    payload
});

export const fetchDashboardDataSuccess = (payload) => ({
    type: FETCH_DASHBOARD_DATA_SUCCESS,
    payload
});

export const fetchDashboardDataFailed = (payload) => ({
    type: FETCH_DASHBOARD_DATA_FAILED,
    payload
});
