import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

/** Path */
import PATH from './path'

/** Lazy components */
const AccessRight = lazy(() => import('../views/pages/access-rights'))
const CreateAccessRight = lazy(() => import('../views/pages/access-rights/CreateAccessRight'))
const UpdateAccessRight = lazy(() => import('../views/pages/access-rights/UpdateAccessRight'))
const AssignAccessRight = lazy(() => import('../views/pages/access-rights/AssignAccessRight'))
const Dashboard = lazy(() => import('../views/pages/dashboard/Dashboard'))
const ForgotPasswordForm = lazy(() => import('../views/pages/auth/ForgotPasswordForm'))
const LoginForm = lazy(() => import('../views/pages/auth/LoginForm'))
const NotFound = lazy(() => import('../views/pages/errors/NotFound'))
const PublicRoute = lazy(() => import('./PublicRoute'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const GetStarted = lazy(() => import('../views/pages/auth/registration/GetStarted'))
const AllowAccessToLocation = lazy(() => import('../views/pages/auth/registration/AllowAccessToLocation'))
const RegistrationForm = lazy(() => import('../views/pages/auth/registration/RegistrationForm'))
const ResetPasswordForm = lazy(() => import('../views/pages/auth/ResetPasswordForm'))
const EmailVerifiedMessage = lazy(() => import('../views/pages/auth/EmailVerifiedMessage'))
const VideoManagementAuthor = lazy(() => import('../views/pages/video-management/author'))
const CreateAuthor = lazy(() => import('../views/pages/video-management/author/CreateAuthor'))
const UpdateAuthor = lazy(() => import('../views/pages/video-management/author/UpdateAuthor'))
const VideoManagementCast = lazy(() => import('../views/pages/video-management/cast'))
const CreateCast = lazy(() => import('../views/pages/video-management/cast/CreateCast'))
const UpdateCast = lazy(() => import('../views/pages/video-management/cast/UpdateCast'))
const VideoManagementDirector = lazy(() => import('../views/pages/video-management/director'))
const CreateDirector = lazy(() => import('../views/pages/video-management/director/CreateDirector'))
const UpdateDirector = lazy(() => import('../views/pages/video-management/director/UpdateDirector'))
const VideoManagementGenre = lazy(() => import('../views/pages/video-management/genre'))
const CreateGenre = lazy(() => import('../views/pages/video-management/genre/CreateGenre'))
const UpdateGenre = lazy(() => import('../views/pages/video-management/genre/UpdateGenre'))
const VideoManagementMovies = lazy(() => import('../views/pages/video-management/movie'))
const CreateMovie = lazy(() => import('../views/pages/video-management/movie/CreateMovie'))
const UpdateMovie = lazy(() => import('../views/pages/video-management/movie/UpdateMovie'))
const VideoManagementComingSoonMovies = lazy(() => import('../views/pages/video-management/coming-soon-movie'))
const CreateComingSoonMovie = lazy(() => import('../views/pages/video-management/coming-soon-movie/CreateComingSoonMovie'))
const UpdateComingSoonMovie = lazy(() => import('../views/pages/video-management/coming-soon-movie/UpdateComingSoonMovie'))
const ViewComingSoonMovie = lazy(() => import('../views/pages/video-management/coming-soon-movie/ViewComingSoonMovie'))
const CreateTrailer = lazy(() => import('../views/pages/video-management/coming-soon-movie/trailer/CreateTrailer'))
const UpdateTrailer = lazy(() => import('../views/pages/video-management/coming-soon-movie/trailer/UpdateTrailer'))
const UserProfile = lazy(() => import('../views/pages/user/UserProfile'))
const ProfileHomePage = lazy(() => import('../views/pages/user/ProfileHomePage'))
const ProfileLock = lazy(() => import('../views/pages/user/settings/profile-lock/ProfileLock'))
const UpdatePassword = lazy(() => import('../views/pages/user/UpdatePassword'))

export const PUBLIC_ROUTES = [
    {
        path: PATH.FORGOT_PASSWORD,
        key: 'ForgotPasswordForm',
        icon: '',
        exact: true,
        component: ForgotPasswordForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.LOGIN,
        key: 'LoginForm',
        icon: '',
        exact: true,
        component: LoginForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.GET_STARTED,
        key: 'GetStarted',
        icon: '',
        exact: true,
        component: GetStarted,
        access: '',
        restricted: false
    },
    {
        path: PATH.ALLOW_ACCESS_TO_LOCATION,
        key: 'AllowAccessToLocation',
        icon: '',
        exact: true,
        component: AllowAccessToLocation,
        access: '',
        restricted: false
    },
    {
        path: PATH.REGISTER,
        key: 'RegistrationForm',
        icon: '',
        exact: true,
        component: RegistrationForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.RESET_PASSWORD,
        key: 'ResetPasswordForm',
        icon: '',
        exact: true,
        component: ResetPasswordForm,
        access: '',
        restricted: false
    },
    {
        path: PATH.VERIFIY_EMAIL,
        key: 'EmailVerifiedMessage',
        icon: '',
        exact: true,
        component: EmailVerifiedMessage,
        access: '',
        restricted: false
    },
];

export const USER_ROUTES = [
    {
        path: PATH.USER_PROFILE,
        key: 'UserProfile',
        icon: '',
        exact: true,
        component: UserProfile,
        access: '',
        restricted: true
    },
    {
        path: PATH.PROFILE_HOME_PAGE,
        key: 'ProfileHomePage',
        icon: '',
        exact: true,
        component: ProfileHomePage,
        access: '',
        restricted: true
    },
    {
        path: PATH.PROFILE_LOCK,
        key: 'ProfileLock',
        icon: '',
        exact: true,
        component: ProfileLock,
        access: '',
        restricted: true
    },
    {
        path: PATH.UPDATE_PASSWORD,
        key: 'UpdatePassword',
        icon: '',
        exact: true,
        component: UpdatePassword,
        access: '',
        restricted: true
    }
];

export const PRIVATE_ROUTES = [
    {
        path: PATH.ACCESS_RIGHT,
        key: 'AccessRight',
        icon: '',
        exact: true,
        component: AccessRight,
        access: 'Manage Access Rights',
        restricted: true
    },
    {
        path: PATH.CREATE_ACCESS_RIGHT,
        key: 'CreateAccessRight',
        icon: '',
        exact: true,
        component: CreateAccessRight,
        access: 'Manage Access Rights',
        restricted: true
    },
    {
        path: PATH.UPDATE_ACCESS_RIGHT,
        key: 'UpdateAccessRight',
        icon: '',
        exact: true,
        component: UpdateAccessRight,
        access: 'Manage Access Rights',
        restricted: true
    },
    {
        path: PATH.ASSIGN_ACCESS_RIGHT,
        key: 'AssignAccessRight',
        icon: '',
        exact: true,
        component: AssignAccessRight,
        access: 'Manage Access Rights',
        restricted: true
    },
    {
        path: PATH.DASHBOARD,
        key: 'Dashboard',
        icon: '',
        exact: true,
        component: Dashboard,
        access: 'View Dashboard',
        restricted: true
    },
    {
        path: PATH.VIDEO_MANAGEMENT_AUTHOR,
        key: 'VideoManagementAuthor',
        icon: '',
        exact: true,
        component: VideoManagementAuthor,
        access: 'Manage Authors',
        restricted: true
    },
    {
        path: PATH.CREATE_AUTHOR,
        key: 'CreateAuthor',
        icon: '',
        exact: true,
        component: CreateAuthor,
        access: 'Manage Authors',
        restricted: true
    },
    {
        path: PATH.UPDATE_AUTHOR,
        key: 'UpdateAuthor',
        icon: '',
        exact: true,
        component: UpdateAuthor,
        access: 'Manage Authors',
        restricted: true
    },
    {
        path: PATH.VIDEO_MANAGEMENT_CAST,
        key: 'VideoManagementCast',
        icon: '',
        exact: true,
        component: VideoManagementCast,
        access: 'Manage Casts',
        restricted: true
    },
    {
        path: PATH.CREATE_CAST,
        key: 'CreateCast',
        icon: '',
        exact: true,
        component: CreateCast,
        access: 'Manage Casts',
        restricted: true
    },
    {
        path: PATH.UPDATE_CAST,
        key: 'UpdateCast',
        icon: '',
        exact: true,
        component: UpdateCast,
        access: 'Manage Casts',
        restricted: true
    },
    {
        path: PATH.VIDEO_MANAGEMENT_DIRECTOR,
        key: 'VideoManagementDirector',
        icon: '',
        exact: true,
        component: VideoManagementDirector,
        access: 'Manage Directors',
        restricted: true
    },
    {
        path: PATH.CREATE_DIRECTOR,
        key: 'CreateDirector',
        icon: '',
        exact: true,
        component: CreateDirector,
        access: 'Manage Directors',
        restricted: true
    },
    {
        path: PATH.UPDATE_DIRECTOR,
        key: 'UpdateDirector',
        icon: '',
        exact: true,
        component: UpdateDirector,
        access: 'Manage Directors',
        restricted: true
    },
    {
        path: PATH.VIDEO_MANAGEMENT_GENRE,
        key: 'VideoManagementGenre',
        icon: '',
        exact: true,
        component: VideoManagementGenre,
        access: 'Manage Genres',
        restricted: true
    },
    {
        path: PATH.CREATE_GENRE,
        key: 'CreateGenre',
        icon: '',
        exact: true,
        component: CreateGenre,
        access: 'Manage Genres',
        restricted: true
    },
    {
        path: PATH.UPDATE_GENRE,
        key: 'UpdateGenre',
        icon: '',
        exact: true,
        component: UpdateGenre,
        access: 'Manage Genres',
        restricted: true
    },
    {
        path: PATH.VIDEO_MANAGEMENT_MOVIES,
        key: 'VideoManagementMovies',
        icon: '',
        exact: true,
        component: VideoManagementMovies,
        access: 'Manage Movies',
        restricted: true
    },
    {
        path: PATH.CREATE_MOVIE,
        key: 'CreateMovie',
        icon: '',
        exact: true,
        component: CreateMovie,
        access: 'Manage Movies',
        restricted: true
    },
    {
        path: PATH.UPDATE_MOVIE,
        key: 'UpdateMovie',
        icon: '',
        exact: true,
        component: UpdateMovie,
        access: 'Manage Movies',
        restricted: true
    },
    {
        path: PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES,
        key: 'VideoManagementComingSoonMovies',
        icon: '',
        exact: true,
        component: VideoManagementComingSoonMovies,
        access: 'Manage Coming Soon Movies',
        restricted: true
    },
    {
        path: PATH.CREATE_COMING_SOON_MOVIE,
        key: 'CreateComingSoonMovie',
        icon: '',
        exact: true,
        component: CreateComingSoonMovie,
        access: 'Manage Coming Soon Movies',
        restricted: true
    },
    {
        path: PATH.UPDATE_COMING_SOON_MOVIE,
        key: 'UpdateComingSoonMovie',
        icon: '',
        exact: true,
        component: UpdateComingSoonMovie,
        access: 'Manage Coming Soon Movies',
        restricted: true
    },
    {
        path: PATH.VIEW_COMING_SOON_MOVIE,
        key: 'ViewComingSoonMovie',
        icon: '',
        exact: true,
        component: ViewComingSoonMovie,
        access: 'Manage Coming Soon Movies',
        restricted: true
    },
    {
        path: PATH.CREATE_TRAILER,
        key: 'CreateTrailer',
        icon: '',
        exact: true,
        component: CreateTrailer,
        access: 'Manage Coming Soon Movies',
        restricted: true
    },
    {
        path: PATH.UPDATE_TRAILER,
        key: 'UpdateTrailer',
        icon: '',
        exact: true,
        component: UpdateTrailer,
        access: 'Manage Coming Soon Movies',
        restricted: true
    },
];


export const RenderRoutes = ({ routes }) => 
{
    return (
        <Switch>
            {
                routes.map(({ key, path, strict, exact, access, restricted, component }) => (
                    <Route
                        key={ key }
                        path={ path }
                        strict={ strict }
                        exact={ exact }
                        render={ props => {
                            return (
                                restricted 
                                    ? <PrivateRoute Component={ component } access={ access } { ...props }/>
                                    : <PublicRoute Component={ component } { ...props } />
                            )
                        }}
                    />
                ))
            }
            <Route component={NotFound} />
        </Switch>
    )
}