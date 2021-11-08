import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';
import * as API from '../../../services/subscription';
import ACTION_TYPES from './action.types'
import { 
    fetchAllSubscriptionsSuccess,
    fetchAllSubscriptionsFailed,
    fetchSubscriptionByUserIdSuccess,
    fetchSubscriptionByUserIdFailed
} from './actions';

const {
    FETCH_ALL_SUBSCRIPTIONS_START,
    FETCH_SUBSCRIPTION_BY_USER_ID_START,
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllSubscriptionsSaga()
{
    try {
        const { data: subscriptions } = yield call(API.fetchAllAsync);
        yield put(fetchAllSubscriptionsSuccess({ subscriptions }));
    } catch ({ message }) {
        yield put(fetchAllSubscriptionsFailed({ message }));
    }
}

function* fetchSubscriptionByUserIdSaga(payload)
{
    try {
        const { data: subscriptions } = yield call(API.findByUserIdAsync, payload.userId);
        yield put(fetchSubscriptionByUserIdSuccess({ subscriptions }));
    } catch ({ message }) {
        yield put(fetchSubscriptionByUserIdFailed({ message }));
    }
}

/**
 * Watchers
 */
function* fetchAllSubscriptionsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_SUBSCRIPTIONS_START);
        yield call(fetchAllSubscriptionsSaga);
    }
}


function* findSubscriptionByUserIdWatcher()
{
    while (true) {
        yield take(FETCH_SUBSCRIPTION_BY_USER_ID_START);
        yield call(fetchSubscriptionByUserIdSaga);
    }
}
/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllSubscriptionsWatcher(),
        findSubscriptionByUserIdWatcher()
    ]);
}