import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from '../redux/modules/auth/saga'
import authorSaga from '../redux/modules/author/saga'
import castSaga from '../redux/modules/cast/saga'

export default function* () 
{
    yield all([
        authSaga(),
        authorSaga(),
        castSaga()
    ]);
}

