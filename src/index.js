/** Libraries */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

/** Components */
import App from './App.jsx';

/** Redux */
import { store, history, persistor } from './redux'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
	<Provider store={ store }>
		<BrowserRouter>
			<Suspense fallback={ <PageLoader /> }>
				<ConnectedRouter history={ history }>
					<PersistGate persistor={ persistor } >
						<App history={ history }/> 
					</PersistGate>
				</ConnectedRouter>
			</Suspense>
		</BrowserRouter>
	</Provider>,
  document.getElementById('root')
);

