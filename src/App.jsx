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


const App = ({ history }) => 
{
	return (
		<>
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
		</>
	)
}

export default React.memo(App);
