import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

import * as API from '../../../services/paymongo-webhook/paymongo.webhook';
import ACTION_TYPES from './action.types'
import { 
    fetchAllPaymongoWebhooksSuccess,
    fetchAllPaymongoWebhooksFailed
} from './actions';
import { showAlert } from '../alert/actions';
import PATH from '../../../routes/path';

const {
    FETCH_ALL_PAYMONGO_WEBHOOKS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllPaymongoWebhooksSaga()
{
    try {
        const { data: paymongoWebhooks } = yield call(API.fetchAllAsync);
        yield put(fetchAllPaymongoWebhooksSuccess({ paymongoWebhooks }));
    } catch ({ message }) {
        yield put(fetchAllPaymongoWebhooksFailed({ message }));
    }
}


/**
 * Watchers
 */
function* fetchAllPaymongoWebhooksWatcher()
{
    while (true) {
        yield take(FETCH_ALL_PAYMONGO_WEBHOOKS_START);
        yield call(fetchAllPaymongoWebhooksSaga);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllPaymongoWebhooksWatcher()
    ]);
}