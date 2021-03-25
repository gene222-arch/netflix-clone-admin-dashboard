import ACTION_TYPES from './action.types';


const { CREATE, MARK_AS_RESOLVED, DESTROY } =  ACTION_TYPES;


/**
 * An action to create a new bug resource
 * 
 * @param {object} payload 
 * @returns {object}
 */
export const add = (payload) => ({
    type: CREATE,
    payload
});


/**
 * An action to mark a bug resource as resolved
 * 
 * @param {int} id 
 * @returns {object}
 */
export const markAsResolved = (payload) => ({
    type: MARK_AS_RESOLVED,
    payload
});


/**
 * An action to delete a bug resource
 * 
 * @param {int} id 
 * @returns {object}
 */
export const destroy = (payload) => ({
    type: DESTROY,
    payload
});