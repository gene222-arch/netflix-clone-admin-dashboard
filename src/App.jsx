import React, { lazy, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { PRIVATE_ROUTES, RenderRoutes, USER_ROUTES, SUBSCRIPTION_ROUTES, FORGOT_PASSWORD_ROUTES } from './routes'
import AuthLayout from './views/layouts/AuthLayout';
import NotFound from './views/pages/errors/NotFound';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AlertPopUp from './components/AlertPopUp';
import THEME from './config/MuiTheme';
import ConfirmationDialog from './components/ConfirmationDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './redux/modules/auth/selector';
import { connect, useDispatch, batch } from 'react-redux';
import SecurityLayout from './views/layouts/SecurityLayout';
import PATH from './routes/path';
import ECHO_UTIL from './utils/echo'
import * as AUTH_ACTION from './redux/modules/auth/actions'
import * as NOTIFICATION_ACTION from './redux/modules/notifications/actions'
import * as ALERT_ACTION from './redux/modules/alert/actions'
import * as COOKIES_UTIL from './utils/cookies'
import { HELP_CENTER_ROUTES, AUTHENTICATION_ROUTES, LEGAL_ROUTES } from './routes/index';
const EmailVerification = lazy(() => import('./views/pages/employee/EmailVerification'));

const App = ({ AUTH, history }) => 
{
	const dispatch = useDispatch();

	useEffect(() => {
		if (COOKIES_UTIL.get('access_token') && AUTH.isAuthenticated && AUTH.role === 'Subscriber') {
			ECHO_UTIL()
				.private(`subscribed.successfully.${ AUTH.user.id }`)
				.listen('SubscribedSuccessfullyEvent', (response) => {
					dispatch(AUTH_ACTION.updateSubscriptionDetails({ subscription_details: response.data }));
				});

			ECHO_UTIL()
				.private(`subscription.cancelled.${ AUTH.user.id }`)
				.listen('SubscriptionCancelledEvent', (response) => {
					dispatch(AUTH_ACTION.updateSubscriptionDetails({ subscription_details: response.data }));
				});

			ECHO_UTIL()
				.private(`subscription.expired.${ AUTH.user.id }`)
				.listen('SubscriptionExpiredEvent', (response) => {
					dispatch(AUTH_ACTION.updateSubscriptionDetails({ subscription_details: response.data }));
				});

			ECHO_UTIL()
				.private(`payment.authorization.sent.${ AUTH.user.id }`)
				.listen('PaymentAuthorizationSentEvent', (response) => {
					batch(() => {
						dispatch(NOTIFICATION_ACTION.createPaymentAuthNotification({
							paymentAuthorizationNotification: response.data
						}));
						dispatch(ALERT_ACTION.showAlert({
							status: 'info',
							message: 'Your email received a payment authorization notification',
							vertical: 'bottom',
							horizontal: 'left',
							autoHideDuration: 10000
						}));
					});
				});

			ECHO_UTIL()
				.private(`subscriber.profile.created.${ AUTH.user.id }`)
				.listen('SubscriberProfileCreatedEvent', (response) => {
					if (response.platform === 'android') {
						dispatch(AUTH_ACTION.broadcastCreateProfile({
							profile: response.data
						}));
					}
				});

			ECHO_UTIL()
				.private(`subscriber.profile.deleted.${ AUTH.user.id }`)
				.listen('SubscriberProfileDeletedEvent', (response) => {
					if (response.platform === 'android') {
						dispatch(AUTH_ACTION.broadcastDeleteProfileById({
							id: response.data.profileId
						}));
					}
				});

			ECHO_UTIL()
				.private(`subscriber.profile.updated.${ AUTH.user.id }`)
				.listen('SubscriberProfileUpdatedEvent', (response) => {
					if (response.platform === 'android') {
						dispatch(AUTH_ACTION.broadcastUpdateProfile({
							profile: response.data
						}));
					}
				});
		}
	}, [AUTH.isAuthenticated]);

	return (
		<MuiThemeProvider theme={ THEME } >
			<CssBaseline />
			<ConfirmationDialog />
			<AlertPopUp />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Switch>
					{/* Global  */}
					<Route path='/legal/:path?' exact>
						<SecurityLayout>
							<RenderRoutes routes={ LEGAL_ROUTES } />
						</SecurityLayout>
					</Route>

					{/* Help Center Routes  */}
					<Route path='/help/:path?' exact>
						<SecurityLayout>
							<RenderRoutes routes={ HELP_CENTER_ROUTES } />
						</SecurityLayout>
					</Route>

					{/* Authentication Routes */}
					<Route path='/auth/:path?'>
						<AuthLayout>
							<RenderRoutes routes={ AUTHENTICATION_ROUTES } />
						</AuthLayout>
					</Route>
					
					{/* Forgot password routes */}
					<Route path='/forgot-password/:path?' exact>
						<AuthLayout>
							<RenderRoutes routes={ FORGOT_PASSWORD_ROUTES } />
						</AuthLayout>
					</Route>

					{/* Subscriber subscription routes */}
					<Route path='/subscriptions/:path?'>
						<AuthLayout>
							<RenderRoutes routes={ SUBSCRIPTION_ROUTES } />
						</AuthLayout>
					</Route>

					{/* Employees */}
					<Route path='/employees/email/verify' exact>
						<AuthLayout>
							<Route path={ PATH.VERIFY_EMPLOYEE } component={ EmailVerification } />
						</AuthLayout>
					</Route>

					{/* Subscriber */}
					{
						AUTH.role === 'Subscriber' && (
							<Route path='/:path?'>
								<RenderRoutes routes={ USER_ROUTES } />
							</Route>
						)
					}

					{/* Employees or Super Administrator  */}
					{
						AUTH.role !== 'Subscriber' && (
							<Route path='/:path?'>
								<RenderRoutes routes={ PRIVATE_ROUTES } />
							</Route>
						)
					}
					<Route component={ NotFound } />
				</Switch>
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>
	)
}

const mapStateToProps = createStructuredSelector({
	AUTH: selectAuth
});

export default connect(mapStateToProps)(App)
