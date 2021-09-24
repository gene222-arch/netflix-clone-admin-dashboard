/** Libraries */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

/** Routes config */
import { PRIVATE_ROUTES, PUBLIC_ROUTES, RenderRoutes, USER_ROUTES } from './routes'

/** Layouts */
import AuthLayout from './views/layouts/AuthLayout';
import MainLayout from './views/layouts/MainLayout';

/** Components */
import NotFound from './views/pages/errors/NotFound';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AlertPopUp from './components/AlertPopUp';
import THEME from './config/MuiTheme';
import ConfirmationDialog from './components/ConfirmationDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserLayout from './views/layouts/UserLayout';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './redux/modules/auth/selector';
import { connect } from 'react-redux';

const App = ({ AUTH, history }) => 
{
	return (
		<MuiThemeProvider theme={ THEME } >
			<CssBaseline />
			<ConfirmationDialog />
			<AlertPopUp />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Switch>
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
