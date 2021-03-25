import ACTION_TYPES from './action.types';
import * as Cookies from './../../../utils/cookies';


const { IS_AUTHENTICATED, SIGN_IN } = ACTION_TYPES;

const initialState = 
{
    isAuthenticated: false,
    authenticatedUser: {}
};


export default (state = initialState, { type, payload }) => 
{
    switch (type) 
    {
        case SIGN_IN: 
            return {
                ...state,
                authenticatedUser: payload.user
            };

        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: Cookies.has(payload.cookieName)
            };

        default:
            return state;
    }
}
