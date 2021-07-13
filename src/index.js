/** Libraries */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

/** Components */
import App from './App.jsx';
import PageLoader from './components/PageLoader'

/** Redux */
import { store, history, persistor } from './redux'


ReactDOM.render(
	<Provider store={ store }>
		<Suspense fallback={ <PageLoader /> }>
			<ConnectedRouter history={ history }>
				<PersistGate persistor={ persistor } >
					<App history={ history }/> 
				</PersistGate>
			</ConnectedRouter>
		</Suspense>
	</Provider>,
  document.getElementById('root')
);

