import { all, call, take, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';

/** Async functions */
import * as API from '../../../services/access-rights/access.rights';

/** Actions and types */
import ACTION_TYPES from './action.types'
import { 
    fetchAllAccessRightsSuccess,
    fetchAllAccessRightsFailed,
    fetchAllPermissionsSuccess,
    fetchAllPermissionsFailed,
    findAccessRightByIDSuccess,
    findAccessRightByIDFailed,
    createAccessRightSuccess,
    createAccessRightFailed,
    updateAccessRightSuccess,
    updateAccessRightFailed,
    deleteAccessRightsSuccess,
    deleteAccessRightsFailed
} from './actions';
import { showAlert } from './../alert/actions';
import PATH from './../../../routes/path';
import { ERROR_MESSAGE_ON_CREATE, ERROR_MESSAGE_ON_DELETE, ERROR_MESSAGE_ON_UPDATE } from './../../../config/alertMessages';

const {
    FETCH_ALL_ACCESS_RIGHTS_START,
    FETCH_ALL_PERMISSIONS_START,
    FIND_ACCESS_RIGHT_BY_ID_START,
    CREATE_ACCESS_RIGHT_START,
    UPDATE_ACCESS_RIGHT_START,
    DELETE_ACCESS_RIGHTS_START
}  = ACTION_TYPES;

/**
 * Sagas
 */
function* fetchAllAccessRightsSaga()
{
    try {
        const { data: accessRights } = yield call(API.fetchAllAsync);
        yield put(fetchAllAccessRightsSuccess({ accessRights }));
    } catch ({ message }) {
        yield put(fetchAllAccessRightsFailed({ message }));
    }
}

function* fetchAllPermissionsSaga()
{
    try {
        const { data: permissions } = yield call(API.fetchAllPermissionsAsync);
        yield put(fetchAllPermissionsSuccess({ permissions }));
    } catch ({ message }) {
        yield put(fetchAllPermissionsFailed({ message }));
    }
}


function* findAccessRightByIDSaga(payload)
{
    try {
        const { id } = payload;
        const { data: author } = yield call(API.findByIDAsync, id);

        yield put(findAccessRightByIDSuccess({ author }));
    } catch ({ message }) {
        yield put(findAccessRightByIDFailed({ message }));
    }
}

function* createAccessRightSaga(payload)
{
    try {
        const { message, status } = yield call(API.createAsync, payload);

        yield put(createAccessRightSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.ACCESS_RIGHT));
    } catch ({ message, status }) {
        yield put(createAccessRightFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_CREATE }));
    }
}

function* updateAccessRightSaga(payload)
{
    try {
        const { message, status } = yield call(API.updateAsync, payload);

        yield put(updateAccessRightSuccess({ author: payload }));
        yield put(showAlert({ status, message }));
        yield put(push(PATH.ACCESS_RIGHT));
    } catch ({ message, status }) {
        yield put(updateAccessRightFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_UPDATE }));
    }
}

function* deleteAccessRightsSaga(payload)
{
    try {
        const { ids } = payload;
        const { message, status } = yield call(API.deleteAsync, ids);

        yield put(deleteAccessRightsSuccess({ ids }));
        yield put(showAlert({ status, message }));
    } catch ({ message, status }) {
        yield put(deleteAccessRightsFailed({ message }));
        yield put(showAlert({ status, message: ERROR_MESSAGE_ON_DELETE }));
    }
}


/**
 * Watchers
 */
function* fetchAllAccessRightsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_ACCESS_RIGHTS_START);
        yield call(fetchAllAccessRightsSaga);
    }
}

function* fetchAllPermissionsWatcher()
{
    while (true) {
        yield take(FETCH_ALL_PERMISSIONS_START);
        yield call(fetchAllPermissionsSaga);
    }
}

function* findAccessRightByIDWatcher()
{
    while (true) {
        const { payload } = yield take(FIND_ACCESS_RIGHT_BY_ID_START);
        yield call(findAccessRightByIDSaga, payload);
    }
}

function* createAccessRightWatcher()
{
    while (true) {
        const { payload } = yield take(CREATE_ACCESS_RIGHT_START);
        yield call(createAccessRightSaga, payload);
    }
}

function* updateAccessRightWatcher()
{
    while (true) {
        const { payload } = yield take(UPDATE_ACCESS_RIGHT_START);
        yield call(updateAccessRightSaga, payload);
    }
}

function* deleteAccessRightsWatcher()
{
    while (true) {
        const { payload } = yield take(DELETE_ACCESS_RIGHTS_START);
        yield call(deleteAccessRightsSaga, payload);
    }
}

/**
 * 
 */
export default function*()
{
    yield all([
        fetchAllAccessRightsWatcher(),
        fetchAllPermissionsWatcher(),
        findAccessRightByIDWatcher(),
        createAccessRightWatcher(),
        updateAccessRightWatcher(),
        deleteAccessRightsWatcher()
    ]);
}