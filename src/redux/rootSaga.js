import { all } from 'redux-saga/effects'
import postSaga from '../redux/modules/posts/saga'

export default function* () 
{
    yield all([
        postSaga()
    ]);
}

