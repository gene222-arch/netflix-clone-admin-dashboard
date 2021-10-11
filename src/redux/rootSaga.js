import { all } from 'redux-saga/effects'

/** Module sagas */
import activityLogSaga from '../redux/modules/activity-log/saga'
import accessRightSaga from '../redux/modules/access-rights/saga'
import authSaga from '../redux/modules/auth/saga'
import authorSaga from '../redux/modules/author/saga'
import castSaga from '../redux/modules/cast/saga'
import comingSoonMovieSaga from '../redux/modules/coming-soon-movie/saga'
import directorSaga from '../redux/modules/director/saga'
import dashboardSaga from '../redux/modules/dashboard/saga'
import employeeSaga from '../redux/modules/employee/saga'
import genreSaga from '../redux/modules/genre/saga'
import movieSaga from '../redux/modules/movie/saga'
import userSaga from '../redux/modules/user/saga'

export default function* () 
{
    yield all([
        activityLogSaga(),
        accessRightSaga(),
        authSaga(),
        authorSaga(),
        castSaga(),
        comingSoonMovieSaga(),
        dashboardSaga(),
        directorSaga(),
        employeeSaga(),
        genreSaga(),
        movieSaga(),
        userSaga()
    ]);
}

