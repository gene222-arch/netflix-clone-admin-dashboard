/** Libraries */
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

const App = ({ history }) => 
{

	return (
		<MuiThemeProvider theme={ THEME } >
			<ConfirmationDialog />
			<AlertPopUp />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<BrowserRouter>
					<Switch>
						<Route path='/auth/:path?' exact>
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
				</BrowserRouter>
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>
	)
}

export default App
