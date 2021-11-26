/** Libraries */
import Echo from "laravel-echo"

/** Utils */
import * as Cookies from './cookies'

window.Pusher = require('pusher-js');

export default () => 
{
    return new Echo({
        broadcaster: process.env.REACT_APP_BROADCASTER,
        key: process.env.REACT_APP_PUSHER_APP_KEY,
        auth: {
            headers: {
              Authorization: `Bearer ${ Cookies.get('access_token') }`,
              Accept: 'application/json',
            },
          },
        authEndpoint: process.env.REACT_APP_API_BROADCAST_BASE_URL,
        wsHost: window.location.hostname,
        wsPort: process.env.REACT_APP_WS_PORT,
        encrypted: true,
        enableStats : false,
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
    });
}