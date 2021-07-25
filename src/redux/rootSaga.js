import { all } from 'redux-saga/effects'

/** Module sagas */
import authSaga from '../redux/modules/auth/saga'
import authorSaga from '../redux/modules/author/saga'
import castSaga from '../redux/modules/cast/saga'
import comingSoonMovieSaga from '../redux/modules/coming-soon-movie/saga'
import directorSaga from '../redux/modules/director/saga'
import genreSaga from '../redux/modules/genre/saga'
import movieSaga from '../redux/modules/movie/saga'


export default function* () 
{
    yield all([
        authSaga(),
        authorSaga(),
        castSaga(),
        comingSoonMovieSaga(),
        directorSaga(),
        genreSaga(),
        movieSaga()
    ]);
}

