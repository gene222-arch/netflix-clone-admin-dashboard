import { takeEvery, all, call, put, takeLeading } from 'redux-saga/effects'
import ACTION_TYPES from './action.types';
import { indexAsync, destroyAsync, storeAsync } from './../../../services/posts/posts';
import { indexSuccess, indexFailed, createPostSuccess, createPostFailed, destroyPostSuccess, destroyPostFailed } from './actions';

const { INDEX, CREATE, DESTROY } = ACTION_TYPES;


/**
 * Controllers
 */

function* fetchIndexSaga ()
{
    try {
        const data = yield call(indexAsync);
    
        yield put(indexSuccess({ data }));

    } catch (error) {

        yield put(indexFailed({
            messages: error.message
        }));

    }
}


function* createSaga ({ payload })
{
    try {
        const data = yield call(storeAsync, payload);
    
        yield put(createPostSuccess({
            post: data
        }));

    } catch (error) {

        yield put(createPostFailed({
            messages: error.message
        }));

    }
}


function* destroySaga ({payload})
{
    try {
        yield call(destroyAsync, payload);

        yield put(destroyPostSuccess(payload));

    } catch (error) {

        yield put(destroyPostFailed({
            messages: error.message
        }));

    }
}

/**
 * Watchers
 */

function* indexWatcher () 
{
    yield takeEvery(INDEX, fetchIndexSaga);
}

function* createWatcher () 
{
    yield takeEvery(CREATE, createSaga);
}

function* destroyWatcher () 
{
    yield takeEvery(DESTROY, destroySaga);
}

/**
 * Main
 */

export default function* postSaga () 
{
    yield all([
        indexWatcher(),
        createWatcher(),
        destroyWatcher(),
    ]);
}