import React, { lazy, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { GLOBAL_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES, RenderRoutes, USER_ROUTES, SUBSCRIPTION_ROUTES } from './routes'
import AuthLayout from './views/layouts/AuthLayout';
import NotFound from './views/pages/errors/NotFound';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AlertPopUp from './components/AlertPopUp';
import THEME from './config/MuiTheme';
import ConfirmationDialog from './components/ConfirmationDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import SecurityLayout from './views/layouts/SecurityLayout';
import PATH from './routes/path';
import ECHO_UTIL from './utils/echo'
import * as AUTH_ACTION from './redux/modules/auth/actions'
import * as NOTIFICATION_ACTION from './redux/modules/notifications/actions'
import * as COOKIES_UTIL from './utils/cookies'
import { HELP_CENTER_ROUTES } from './routes/index';
const EmailVerification = lazy(() => import('./views/pages/employee/EmailVerification'));

const App = ({ AUTH, history }) => 
{
	const dispatch = useDispatch();

	useEffect(() => {
		if (COOKIES_UTIL.get('access_token') && AUTH.isAuthenticated) {
			ECHO_UTIL()
				.private(`subscribed.successfully.${ AUTH.user.id }`)
				.listen('SubscribedSuccessfullyEvent', (response) => {
					dispatch(AUTH_ACTION.updateSubscriptionDetails({ subscription_details: response.data }));
				});

			ECHO_UTIL()
				.private(`payment.authorization.sent.${ AUTH.user.id }`)
				.listen('PaymentAuthorizationSentEvent', (response) => {
					dispatch(NOTIFICATION_ACTION.createPaymentAuthNotification({
						paymentAuthorizationNotification: response.data
					}));
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
							<RenderRoutes routes={ GLOBAL_ROUTES } />
						</SecurityLayout>
					</Route>

					{/* Help Center Routes  */}
					<Route path='/help/:path?' exact>
						<SecurityLayout>
							<RenderRoutes routes={ HELP_CENTER_ROUTES } />
						</SecurityLayout>
					</Route>

					{/* Authentication Routes */}
					{
						!AUTH.isAuthenticated && (
							<Route path='/auth/:path?'>
								<AuthLayout>
									<RenderRoutes routes={ PUBLIC_ROUTES } />
								</AuthLayout>
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

					{/* Employees */}
					<Route path='/employees/verify/email' exact>
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

					{/* Subscriber subscription routes */}
					<Route path='/subscriptions/:path?' exact>
						<AuthLayout>
							<RenderRoutes routes={ SUBSCRIPTION_ROUTES } />
						</AuthLayout>
					</Route>

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
