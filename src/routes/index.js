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
const VideoManagementCast = lazy(() => import('../views/pages/video-management/cast'))
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
        path: PATH.VIDEO_MANAGEMENT_CAST,
        key: 'VideoManagementCast',
        icon: '',
        exact: true,
        component: VideoManagementCast,
        access: 'View Casts',
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