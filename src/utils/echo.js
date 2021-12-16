/** Libraries */
import Echo from "laravel-echo"

/** Utils */
import * as Cookies from './cookies'

window.Pusher = require('pusher-js');

export default () => 
{
    const auth = {
        headers: {
            Authorization: `Bearer ${ Cookies.get('access_token') }`,
            Accept: 'application/json',
        },
    };

    const options = {
        broadcaster: process.env.REACT_APP_BROADCASTER,
        key: process.env.REACT_APP_PUSHER_APP_KEY,
        auth,
        authEndpoint: process.env.REACT_APP_API_BROADCAST_BASE_URL,
        encrypted: false,
        enableStats : false,
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        wsHost: process.env.REACT_APP_WS_HOST,
        wsPort: process.env.REACT_APP_WS_PORT,
    };

    return new Echo(options);
}