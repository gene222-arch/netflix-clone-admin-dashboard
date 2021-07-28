import { all, take, put, call } from 'redux-saga/effects'
import { 
    fetchDashboardDataSuccess,
    fetchDashboardDataFailed
} from './actions'
import * as API from '../../../services/dashboards/dashboard'
import ACTION_TYPES from './action.types'

const {
    FETCH_DASHBOARD_DATA_START
} = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchDashboardDataSaga(payload)
{
    try {
        const { data: dashboardData } = yield call(API.fetchDashboardDataAsync);

        yield put(fetchDashboardDataSuccess({ dashboardData }));
    } catch ({ message }) { 
        yield put(fetchDashboardDataFailed({ message }));
    }
}


/**
 * Watchers
 */
function* fetchDashboardDataWatcher()
{
    while(true) {
        const { payload } = yield take(FETCH_DASHBOARD_DATA_START);
        yield call(fetchDashboardDataSaga, payload);
    }
}

export default function*()
{
    yield all([
        fetchDashboardDataWatcher()
    ]);
}