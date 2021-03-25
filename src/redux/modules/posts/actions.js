import ACTION_TYPES from './action.types';

const { 
    INDEX, 
    INDEX_SUCCESS, 
    INDEX_FAILED, 

    CREATE, 
    CREATE_POST_SUCCESS, 
    CREATE_POST_FAILED, 
    
    DESTROY,
    DESTROY_POST_SUCCESS, 
    DESTROY_POST_FAILED, 
} = ACTION_TYPES;


/**
 * An action to fetch all users/resources
 * 
 * @returns {object}
 */
export const index = () => ({
    type: INDEX
});

export const indexSuccess = (payload) => ({
    type: INDEX_SUCCESS,
    payload
});

export const indexFailed = (payload) => ({
    type: INDEX_FAILED,
    payload
});


/**
 * An action to create a new user resource
 * 
 * @param {object} payload 
 * @returns {object}
 */
export const create = (payload) => ({
    type: CREATE,
    payload
});

export const createPostSuccess = (payload) => ({
    type: CREATE_POST_SUCCESS,
    payload
});

export const createPostFailed = (payload) => ({
    type: CREATE_POST_FAILED,
    payload
});




/**
 * An action to delete a user resource via id
 * 
 * @param {object} payload 
 * @returns {object}
 */
export const destroy = (payload) => ({
    type: DESTROY,
    payload
});

export const destroyPostSuccess = (payload) => ({
    type: DESTROY_POST_SUCCESS,
    payload
});

export const destroyPostFailed = (payload) => ({
    type: DESTROY_POST_FAILED,
    payload
});
