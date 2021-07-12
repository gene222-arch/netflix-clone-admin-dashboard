/** Libraries */
import React from 'react'
import { Route, Switch } from 'react-router-dom'

/** Routes config */
import { PRIVATE_ROUTES, PUBLIC_ROUTES, RenderRoutes } from './routes'

/** Layouts */
import AuthLayout from './views/layouts/AuthLayout';
import MainLayout from './views/layouts/MainLayout';

/** Components */
import NotFound from './views/pages/errors/NotFound';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'

const THEME = createTheme({
	palette: {
		type: 'dark',
	},
});

const App = ({ history }) => 
{
	return (
		<MuiThemeProvider theme={ THEME } >
			<Switch>
				<Route path='/auth/:path?'>
					<AuthLayout>
						<RenderRoutes routes={ PUBLIC_ROUTES } />
					</AuthLayout>
				</Route>
				

				<Route path='/:path?' exact>
					<MainLayout>
						<RenderRoutes routes={ PRIVATE_ROUTES } />
					</MainLayout>
				</Route>

				<Route component={ NotFound } />
			</Switch>
		</MuiThemeProvider>
	)
}

export default React.memo(App);
