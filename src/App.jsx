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
import * as COOKIES_UTIL from './utils/cookies'
const EmailVerification = lazy(() => import('./views/pages/employee/EmailVerification'));

const App = ({ AUTH, history }) => 
{
	const dispatch = useDispatch();

	useEffect(() => {
		if (COOKIES_UTIL.get('access_token') && AUTH.isAuthenticated) {
			ECHO_UTIL()
				.private('subscribed.successfully')
				.listen('SubscribedSuccessfullyEvent', ({ data }) => {
					dispatch(AUTH_ACTION.updateSubscriptionDetails({ subscription_details: data }));
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
					<Route path='/legal/:path?' exact>
						<SecurityLayout>
							<RenderRoutes routes={ GLOBAL_ROUTES } />
						</SecurityLayout>
					</Route>

					<Route path='/subscriptions/:path?' exact>
						<AuthLayout>
							<RenderRoutes routes={ SUBSCRIPTION_ROUTES } />
						</AuthLayout>
					</Route>

					<Route path='/employees/verify/email' exact>
						<AuthLayout>
							<Route path={ PATH.VERIFY_EMPLOYEE } component={ EmailVerification } />
						</AuthLayout>
					</Route>

					{
						!AUTH.isAuthenticated && (
							<Route path='/auth/:path?'>
								<AuthLayout>
									<RenderRoutes routes={ PUBLIC_ROUTES } />
								</AuthLayout>
							</Route>
						)
					}

					{
						(!AUTH.role || AUTH.role === 'Subscriber') && (
							<Route path='/:path?'>
								<RenderRoutes routes={ USER_ROUTES } />
							</Route>
						)
					}

					{
						(AUTH.role && AUTH.role !== 'Subscriber') && (
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
