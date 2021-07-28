import { createSelector } from 'reselect';

const getDashboard = state => state.dashboard;
const getDashboardData = state => state.dashboard.dashboardData;

export const selectDashboard = createSelector(getDashboard, dashboard => dashboard);

export const selectDashboardData = createSelector(getDashboardData, dashboardData => dashboardData);