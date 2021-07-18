import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/author';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllAuthorsSuccess,
    fetchAllAuthorsFailed,
    findAuthorByIDSuccess,
    findAuthorByIDFailed,
    createAuthorSuccess,
    createAuthorFailed,
    updateAuthorSuccess,
    updateAuthorFailed,
    deleteAuthorsSuccess,
    deleteAuthorsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';

const {
    FETCH_ALL_AUTHORS_START,
    FIND_AUTHOR_BY_ID_START,
    CREATE_AUTHOR_START,
    UPDATE_AUTHOR_START,
    DELETE_AUTHORS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllAuthorsSaga()
{
    try {
        const { data: authors } = yield call(API.fetchAllAsync);
        yield put(fetchAllAuthorsSuccess({ authors }));
    } catch ({ message }) {
        yield put(fetchAllAuthorsFailed({ message }));
    }
}

function* findAuthorByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: author } = yield call(API.findByIDAsync, id);

        yield put(findAuthorByIDSuccess({ author }));
    } catch ({ message }) {
        yield put(findAuthorByIDFailed({ message }));
    }
}

function* createAuthorSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createAuthorSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_AUTHOR));
    } catch ({ message }) {
        yield put(createAuthorFailed({ message }));
        yield put(showAlert({ status: 'error', message }));
    }
}

function* updateAuthorSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateAuthorSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_AUTHOR));
    } catch ({ message }) {
        yield put(updateAuthorFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}

function* deleteAuthorsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteAuthorsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message }) {
        yield put(deleteAuthorsFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}


/**
 * Watchers
 */
function* fetchAllAuthorsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_AUTHORS_START);
        yield call(fetchAllAuthorsSaga);
    }
}

function* findAuthorByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_AUTHOR_BY_ID_START);
        yield call(findAuthorByIDSaga, payload);
    }
}

function* createAuthorWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_AUTHOR_START);
        yield call(createAuthorSaga, payload);
    }
}

function* updateAuthorWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_AUTHOR_START);
        yield call(updateAuthorSaga, payload);
    }
}

function* deleteAuthorsWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_AUTHORS_START);
        yield call(deleteAuthorsSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllAuthorsWatcher(),
        findAuthorByIDWatcher(),
        createAuthorWatcher(),
        updateAuthorWatcher(),
        deleteAuthorsWatcher()
    ]);
}