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
    restoreAuthorsSuccess,
    restoreAuthorsFailed,
    toggleAuthorEnabledFailed, 
    toggleAuthorEnabledSuccess,
    deleteAuthorsSuccess,
    deleteAuthorsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_DELETE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_AUTHORS_START,
    FIND_AUTHOR_BY_ID_START,
    CREATE_AUTHOR_START,
    UPDATE_AUTHOR_START,
    RESTORE_AUTHORS_START,
    TOGGLE_AUTHOR_ENABLED_START,
    DELETE_AUTHORS_START
} = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllAuthorsSaga(payload)
{
    try {
        const { data, status } = yield call(API.fetchAllAsync, payload.trashedOnly);

        const authors = { authors: status === 'success' ? data : [] };
        yield put(fetchAllAuthorsSuccess(authors));

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
    } catch ({ message, status }) {
        yield put(createAuthorFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateAuthorSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateAuthorSuccess({ author: payload }));
        
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_AUTHOR));
    } catch ({ message, status }) {
        yield put(updateAuthorFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* restoreAuthorsSaga(payload)
{
    try {
        const { message, status } = yield call(API.restoreAsync, payload);

        const { data: authors, status: fetchAllStatus } = yield call(API.fetchAllAsync, true);

        if (fetchAllStatus === 'success' || !fetchAllStatus) {
            yield put(fetchAllAuthorsSuccess({ authors }));
        }

        yield put(restoreAuthorsSuccess());
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_AUTHOR));
    } catch ({ message, status }) {
        yield put(restoreAuthorsFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* toggleAuthorEnabledSaga(payload)
{
    try {
        const { id } = payload;
        
        yield put(toggleAuthorEnabledSuccess({ id }));
        const { message, status } = yield call(API.updateEnabledStatusAsync, id);

        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(toggleAuthorEnabledFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteAuthorsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteAuthorsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteAuthorsFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}


/**
 * Watchers
 */
function* fetchAllAuthorsWatcher()
{
    while (true) {
        const { payload } = yield take(FETCH_ALL_AUTHORS_START);
        yield call(fetchAllAuthorsSaga, payload);
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

function* restoreAuthorsWatcher()
{
    while (true) {
        const { payload } = yield take(RESTORE_AUTHORS_START);
        yield call(restoreAuthorsSaga, payload);
    }
}

function* toggleAuthorEnabledWatcher()
{
    while (true) {
        const { payload } = yield take(TOGGLE_AUTHOR_ENABLED_START);
        yield call(toggleAuthorEnabledSaga, payload);
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
        restoreAuthorsWatcher(),
        toggleAuthorEnabledWatcher(),
        deleteAuthorsWatcher()
    ]);
}