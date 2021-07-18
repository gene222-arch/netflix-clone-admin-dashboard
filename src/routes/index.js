import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

/** Path */
import PATH from './path'

/** Lazy components */
const Dashboard = lazy(() => import('../views/pages/Dashboard'))
const ForgotPasswordForm = lazy(() => import('../views/pages/auth/ForgotPasswordForm'))
const LoginForm = lazy(() => import('../views/pages/auth/LoginForm'))
const NotFound = lazy(() => import('../views/pages/errors/NotFound'))
const PublicRoute = lazy(() => import('./PublicRoute'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const RegistrationForm = lazy(() => import('../views/pages/auth/RegistrationForm'))
const ResetPasswordForm = lazy(() => import('../views/pages/auth/ResetPasswordForm'))
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
const VideoManagementVideo = lazy(() => import('../views/pages/video-management/video'))

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
];


export const PRIVATE_ROUTES = [
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
        access: 'View Authors',
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
        access: 'View Casts',
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
        access: 'View Directors',
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
        access: 'View Genres',
        restricted: true
    },
    {
        path: PATH.VIDEO_MANAGEMENT_VIDEO,
        key: 'VideoManagementVideo',
        icon: '',
        exact: true,
        component: VideoManagementVideo,
        access: 'View Videos',
        restricted: true
    },
];


export const RenderRoutes = ({ routes }) => 
{
    return (
        <Switch>
            {
                routes.map(({ key, path, strict, exact, restricted, component }) => (
                    <Route
                        key={ key }
                        path={ path }
                        strict={ strict }
                        exact={ exact }
                        render={ props => {
                            return restricted 
                                ? <PrivateRoute Component={ component } { ...props }/>
                                : <PublicRoute Component={ component } { ...props } />
                        }}
                    />
                ))
            }
            <Route component={NotFound} />
        </Switch>
    )
}