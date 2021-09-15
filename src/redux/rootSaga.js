import { all } from 'redux-saga/effects'

/** Module sagas */
import accessRightSaga from '../redux/modules/access-rights/saga'
import authSaga from '../redux/modules/auth/saga'
import authorSaga from '../redux/modules/author/saga'
import castSaga from '../redux/modules/cast/saga'
import comingSoonMovieSaga from '../redux/modules/coming-soon-movie/saga'
import directorSaga from '../redux/modules/director/saga'
import dashboardSaga from '../redux/modules/dashboard/saga'
import genreSaga from '../redux/modules/genre/saga'
import movieSaga from '../redux/modules/movie/saga'
import userSaga from '../redux/modules/user/saga'

export default function* () 
{
    yield all([
        accessRightSaga(),
        authSaga(),
        authorSaga(),
        castSaga(),
        comingSoonMovieSaga(),
        dashboardSaga(),
        directorSaga(),
        genreSaga(),
        movieSaga(),
        userSaga()
    ]);
}

