import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from '../redux/modules/auth/saga'


export default function* () 
{
    yield all([
        authSaga()
    ]);
}

