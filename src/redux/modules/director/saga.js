import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from './../../../services/movies/author';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllDirectorsSuccess,
    fetchAllDirectorsFailed,
    findDirectorByIDSuccess,
    findDirectorByIDFailed,
    createDirectorSuccess,
    createDirectorFailed,
    updateDirectorSuccess,
    updateDirectorFailed,
    deleteDirectorsSuccess,
    deleteDirectorsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';

const {
    FETCH_ALL_DIRECTORS_START,
    FIND_DIRECTOR_BY_ID_START,
    CREATE_DIRECTOR_START,
    UPDATE_DIRECTOR_START,
    DELETE_DIRECTORS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllDirectorsSaga()
{
    try {
        const { data: authors } = yield call(API.fetchAllAsync);
        yield put(fetchAllDirectorsSuccess({ authors }));
    } catch ({ message }) {
        yield put(fetchAllDirectorsFailed({ message }));
    }
}

function* findDirectorByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: author } = yield call(API.findByIDAsync, id);

        yield put(findDirectorByIDSuccess({ author }));
    } catch ({ message }) {
        yield put(findDirectorByIDFailed({ message }));
    }
}

function* createDirectorSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createDirectorSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_DIRECTOR));
    } catch ({ message }) {
        yield put(createDirectorFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}

function* updateDirectorSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateDirectorSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.VIDEO_MANAGEMENT_DIRECTOR));
    } catch ({ message }) {
        yield put(updateDirectorFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}

function* deleteDirectorsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteDirectorsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message }) {
        yield put(deleteDirectorsFailed());
        yield put(showAlert({ status: 'error', message }));
    }
}


/**
 * Watchers
 */
function* fetchAllDirectorsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_DIRECTORS_START);
        yield call(fetchAllDirectorsSaga);
    }
}

function* findDirectorByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_DIRECTOR_BY_ID_START);
        yield call(findDirectorByIDSaga, payload);
    }
}

function* createDirectorWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_DIRECTOR_START);
        yield call(createDirectorSaga, payload);
    }
}

function* updateDirectorWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_DIRECTOR_START);
        yield call(updateDirectorSaga, payload);
    }
}

function* deleteDirectorsWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_DIRECTORS_START);
        yield call(deleteDirectorsSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllDirectorsWatcher(),
        findDirectorByIDWatcher(),
        createDirectorWatcher(),
        updateDirectorWatcher(),
        deleteDirectorsWatcher()
    ]);
}