import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';
import * as API from '../../../services/subscription';
import ACTION_TYPES from './action.types'
import { 
    fetchAllSubscriptionsSuccess,
    fetchAllSubscriptionsFailed
} from './actions';

const {
    FETCH_ALL_SUBSCRIPTIONS_START
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

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllSubscriptionsWatcher()
    ]);
}