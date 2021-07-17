import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/author';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllCastsSuccess,
    fetchAllCastsFailed,
    findCastByIDSuccess,
    findCastByIDFailed,
    createCastSuccess,
    createCastFailed,
    updateCastSuccess,
    updateCastFailed,
    deleteCastsSuccess,
    deleteCastsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';

const {
    FETCH_ALL_CASTS_START,
    FIND_CAST_BY_ID_START,
    CREATE_CAST_START,
    UPDATE_CAST_START,
    DELETE_CASTS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllCastsSaga()
{
    try {
        const { data: authors } = yield call(API.fetchAllAsync);
        yield put(fetchAllCastsSuccess({ authors }));
    } catch ({ message }) {
        yield put(fetchAllCastsFailed({ message }));
    }
}

function* findCastByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: author } = yield call(API.findByIDAsync, id);

        yield put(findCastByIDSuccess({ author }));
    } catch ({ message }) {
        yield put(findCastByIDFailed({ message }));
    }
}

function* createCastSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createCastSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_CAST));
    } catch ({ message }) {
        yield put(createCastFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}

function* updateCastSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateCastSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_CAST));
    } catch ({ message }) {
        yield put(updateCastFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}

function* deleteCastsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteCastsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message }) {
        yield put(deleteCastsFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}


/**
 * Watchers
 */
function* fetchAllCastsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_CASTS_START);
        yield call(fetchAllCastsSaga);
    }
}

function* findCastByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_CAST_BY_ID_START);
        yield call(findCastByIDSaga, payload);
    }
}

function* createCastWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_CAST_START);
        yield call(createCastSaga, payload);
    }
}

function* updateCastWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_CAST_START);
        yield call(updateCastSaga, payload);
    }
}

function* deleteCastsWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_CASTS_START);
        yield call(deleteCastsSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllCastsWatcher(),
        findCastByIDWatcher(),
        createCastWatcher(),
        updateCastWatcher(),
        deleteCastsWatcher()
    ]);
}