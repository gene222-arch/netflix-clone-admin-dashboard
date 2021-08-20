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


ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<PersistGate persistor={ persistor } >
				<App history={ history }/> 
			</PersistGate>
		</ConnectedRouter>
	</Provider>,
  document.getElementById('root')
);

