
import ACTION_TYPES from './action.types';


const { IS_AUTHENTICATED, SIGN_IN } = ACTION_TYPES;


/**
 * Check if user is authenticated
 * 
 * @returns {object}
 */
export const isAuthenticated = (payload) => ({
    type: IS_AUTHENTICATED,
    payload
});


export const signIn = (payload) => ({
    type: SIGN_IN,
    payload
});