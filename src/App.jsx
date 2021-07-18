/** Libraries */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as ALERT_ACTION from './redux/modules/alert/actions';

/** Routes config */
import { PRIVATE_ROUTES, PUBLIC_ROUTES, RenderRoutes } from './routes'

/** Layouts */
import AuthLayout from './views/layouts/AuthLayout';
import MainLayout from './views/layouts/MainLayout';

/** Components */
import NotFound from './views/pages/errors/NotFound';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AlertPopUp from './components/AlertPopUp';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectAlert } from './redux/modules/alert/selector';
import { useDispatch } from 'react-redux';
import THEME from './config/MuiTheme';

const App = ({ ALERT, history }) => 
{
	const dispatch = useDispatch();

	return (
		<MuiThemeProvider theme={ THEME } >
			<AlertPopUp 
                status={ ALERT.status }
                message={ ALERT.message }
                open={ ALERT.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT_ACTION.hideAlert()) }
            />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
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
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>
	)
}

const mapStateToProps = createStructuredSelector({
	ALERT: selectAlert
});

export default connect(mapStateToProps)(App)
