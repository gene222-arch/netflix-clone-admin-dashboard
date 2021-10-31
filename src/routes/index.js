import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

/** Path */
import PATH from './path'

/** Lazy components */
const AccessRight = lazy(() => import('../views/pages/access-rights'))
const CreateAccessRight = lazy(() => import('../views/pages/access-rights/CreateAccessRight'))
const UpdateAccessRight = lazy(() => import('../views/pages/access-rights/UpdateAccessRight'))
const AssignAccessRight = lazy(() => import('../views/pages/access-rights/AssignAccessRight'))
const ActivityLog = lazy(() => import('../views/pages/activity-log'))
const CreateActivityLog = lazy(() => import('../views/pages/activity-log/CreateActivityLog'))
const UpdateActivityLog = lazy(() => import('../views/pages/activity-log/UpdateActivityLog'))
const Dashboard = lazy(() => import('../views/pages/dashboard/Dashboard'))
const ForgotPasswordForm = lazy(() => import('../views/pages/auth/ForgotPasswordForm'))
const LoginForm = lazy(() => import('../views/pages/auth/LoginForm'))
const NotFound = lazy(() => import('../views/pages/errors/NotFound'))
const PublicRoute = lazy(() => import('./PublicRoute'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const GetStarted = lazy(() => import('../views/pages/auth/registration/GetStarted'))
const AllowAccessToLocation = lazy(() => import('../views/pages/auth/registration/AllowAccessToLocation'))
const UploadAvatar = lazy(() => import('../views/pages/auth/registration/UploadAvatar'))
const SelectPlan = lazy(() => import('../views/pages/auth/registration/SelectPlan'))
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
const SecurityCheck = lazy(() => import('../views/pages/user/update-email/SecurityCheck'))
const PrivacyPolicy = lazy(() => import('./../views/pages/security/privacy-policy'));
const TermsAndConditions = lazy(() => import('./../views/pages/security/terms-and-conditions'));
const HelpCenter = lazy(() => import('./../views/pages/help-center'));
const HowToCreateAProfile = lazy(() => import('./../views/pages/help-center/HowToCreateAProfile'));
const BillingsAndPayments = lazy(() => import('./../views/pages/help-center/BillingAndPayments'));
const PlansAndPricing = lazy(() => import('./../views/pages/help-center/PlansAndPricing'));
const Employee = lazy(() => import('./../views/pages/employee'))
const CreateEmployee = lazy(() => import('./../views/pages/employee/CreateEmployee'));
const UpdateEmployee = lazy(() => import('./../views/pages/employee/UpdateEmployee'));
const Settings = lazy(() => import('./../views/pages/settings'));
const PaymongoWebhook = lazy(() => import('./../views/pages/paymongo-webhook/index'));
const SubscribedSuccessfully = lazy(() => import('./../views/pages/auth/SubscribedSuccessfully'))
const SubscriptionFailed = lazy(() => import('./../views/pages/auth/SubscriptionFailed'))

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
        path: PATH.UPLOAD_AVATAR,
        key: 'UploadAvatar',
        icon: '',
        exact: true,
        component: UploadAvatar,
        access: '',
        restricted: false
    },
    {
        path: PATH.SELECT_PLAN,
        key: 'SelectPlan',
        icon: '',
        exact: true,
        component: SelectPlan,
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
    {
        path: PATH.SUBSCRIBED_SUCCESSFULLY,
        key: 'SubscribedSuccessfully',
        icon: '',
        exact: true,
        component: SubscribedSuccessfully,
        access: '',
        restricted: false
    },
    {
        path: PATH.SUBSCRIPTION_FAILED,
        key: 'SubscriptionFailed',
        icon: '',
        exact: true,
        component: SubscriptionFailed,
        access: '',
        restricted: false
    }
];

export const GLOBAL_ROUTES = 
[
    {
        path: PATH.PRIVACY_POLICY,
        key: 'PrivacyPolicy',
        icon: '',
        exact: true,
        component: PrivacyPolicy,
        access: '',
        restricted: null
    },
    {
        path: PATH.TERMS_AND_CONDITION,
        key: 'TermsAndConditions',
        icon: '',
        exact: true,
        component: TermsAndConditions,
        access: '',
        restricted: null
    },
    {
        path: PATH.HELP_CENTER,
        key: 'HelpCenter',
        icon: '',
        exact: true,
        component: HelpCenter,
        access: '',
        restricted: null
    },
    {
        path: PATH.HOW_TO_CREATE_A_PROFILE,
        key: 'HowToCreateAProfile',
        icon: '',
        exact: true,
        component: HowToCreateAProfile,
        access: '',
        restricted: null
    },
    {
        path: PATH.BILLING_AND_PAYMENTS,
        key: 'BillingsAndPayments',
        icon: '',
        exact: true,
        component: BillingsAndPayments,
        access: '',
        restricted: null
    },
    {
        path: PATH.PLANS_AND_PRICING,
        key: 'PlansAndPricing',
        icon: '',
        exact: true,
        component: PlansAndPricing,
        access: '',
        restricted: null
    }
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
    },
    {
        path: PATH.UPDATE_EMAIL,
        key: 'SecurityCheck',
        icon: '',
        exact: true,
        component: SecurityCheck,
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
        path: PATH.ACTIVITY_LOG,
        key: 'ActivityLog',
        icon: '',
        exact: true,
        component: ActivityLog,
        access: 'Manage Activity Logs',
        restricted: true
    },
    {
        path: PATH.CREATE_ACTIVITY_LOG,
        key: 'CreateActivityLog',
        icon: '',
        exact: true,
        component: CreateActivityLog,
        access: 'Manage Activity Logs',
        restricted: true
    },
    {
        path: PATH.UPDATE_ACTIVITY_LOG,
        key: 'UpdateActivityLog',
        icon: '',
        exact: true,
        component: UpdateActivityLog,
        access: 'Manage Activity Logs',
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

    {
        path: PATH.EMPLOYEE,
        key: 'Employee',
        icon: '',
        exact: true,
        component: Employee,
        access: 'Manage Employees',
        restricted: true
    },
    {
        path: PATH.CREATE_EMPLOYEE,
        key: 'CreateEmployee',
        icon: '',
        exact: true,
        component: CreateEmployee,
        access: 'Manage Employees',
        restricted: true
    },
    {
        path: PATH.UPDATE_EMPLOYEE,
        key: 'UpdateEmployee',
        icon: '',
        exact: true,
        component: UpdateEmployee,
        access: 'Manage Employees',
        restricted: true
    },

    /** Paymongo  */
    {
        path: PATH.PAYMONGO_WEBHOOK,
        key: 'PaymongoWebhook',
        icon: '',
        exact: true,
        component: PaymongoWebhook,
        access: '',
        restricted: true
    },
    /** Settings */
    {
        path: PATH.SETTINGS,
        key: 'Settings',
        icon: '',
        exact: true,
        component: Settings,
        access: '',
        restricted: true
    },
];


export const RenderRoutes = ({ routes }) => 
{
    return (
        <Switch>
            {
                routes.map(({ key, path, strict, exact, access, restricted, component: Component }) => (
                    <Route
                        key={ key }
                        path={ path }
                        strict={ strict }
                        exact={ exact }
                        render={ props => 
                        {
                            if (typeof restricted === 'object') return <Component { ...props } />
                            
                            if (typeof restricted === 'boolean') 
                            {
                                return (
                                    restricted 
                                        ? <PrivateRoute Component={ Component } access={ access } { ...props }/>
                                        : <PublicRoute Component={ Component } { ...props } />
                                )
                            }
                        }}
                    />
                ))
            }
            <Route component={NotFound} />
        </Switch>
    )
}