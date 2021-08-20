/** Libraries */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

/** Routes config */
import { PRIVATE_ROUTES, PUBLIC_ROUTES, RenderRoutes } from './routes'

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

const App = ({ history }) => 
{

	return (
		<MuiThemeProvider theme={ THEME } >
			<CssBaseline />
			<ConfirmationDialog />
			<AlertPopUp />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Switch>
					<Route path='/auth/:path?'>
						<AuthLayout>
							<RenderRoutes routes={ PUBLIC_ROUTES } />
						</AuthLayout>
					</Route>
					

					<Route path='/:path?'>
						<MainLayout>
							<RenderRoutes routes={ PRIVATE_ROUTES } />
						</MainLayout>
					</Route>

					<Route component={ NotFound } />
				</Switch>
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>
	)
}

export default App
