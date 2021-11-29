import Echo from "laravel-echo"
import * as Cookies from './cookies'

window.Pusher = require('pusher-js');

export default () => 
{
	const authOptions = {
		headers: {
			Authorization: `Bearer ${ Cookies.get('access_token') }`,
			Accept: 'application/json',
		},
	};

    return new Echo(
	{
        broadcaster: process.env.REACT_APP_BROADCASTER,
        key: process.env.REACT_APP_PUSHER_APP_KEY,
        auth: authOptions,
        authEndpoint: process.env.REACT_APP_LARAVEL_API_BROADCAST_URL,
        encrypted: process.env.REACT_APP_PUSHER_ENCRYPTED,
        enableStats : false,
        enabledTransports: ['ws', 'wss'],
        forceTLS: process.env.REACT_APP_PUSHER_FORCE_TLS,
        wsHost: window.location.hostname,
        wsPort: process.env.REACT_APP_PUSHER_WS_PORT,
        wssPort: process.env.REACT_APP_PUSHER_WSS_PORT,
    });
}