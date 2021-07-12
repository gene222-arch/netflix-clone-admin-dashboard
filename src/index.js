/** Libraries */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

/** Components */
import App from './App.jsx';
import PageLoader from './components/PageLoader'

/** Redux */
import { configureStore, history } from './redux'


ReactDOM.render(
	<Provider store={configureStore()}>
		<Suspense fallback={ <PageLoader /> }>
			<ConnectedRouter history={ history }>
				<App history={ history }/> 
			</ConnectedRouter>
		</Suspense>
	</Provider>,
  document.getElementById('root')
);

