const ACTION_TYPES = 
{
    FETCH_ALL_AUTHORS_START: 'FETCH_ALL_AUTHORS_START',
    FETCH_ALL_AUTHORS_SUCCESS: 'FETCH_ALL_AUTHORS_SUCCESS',
    FETCH_ALL_AUTHORS_FAILED: 'FETCH_ALL_AUTHORS_FAILED',

    FIND_AUTHOR_BY_ID_START: 'FIND_AUTHOR_BY_ID_START',
    FIND_AUTHOR_BY_ID_SUCCESS: 'FIND_AUTHOR_BY_ID_SUCCESS',
    FIND_AUTHOR_BY_ID_FAILED: 'FIND_AUTHOR_BY_ID_FAILED',

    CREATE_AUTHOR_START: 'CREATE_AUTHOR_START',
    CREATE_AUTHOR_SUCCESS: 'CREATE_AUTHOR_SUCCESS',
    CREATE_AUTHOR_FAILED: 'CREATE_AUTHOR_FAILED',

    UPDATE_AUTHOR_START: 'UPDATE_AUTHOR_START',
    UPDATE_AUTHOR_SUCCESS: 'UPDATE_AUTHOR_SUCCESS',
    UPDATE_AUTHOR_FAILED: 'UPDATE_AUTHOR_FAILED',
    
    TOGGLE_AUTHOR_ENABLED_START: 'TOGGLE_AUTHOR_ENABLED_START',
    TOGGLE_AUTHOR_ENABLED_SUCCESS: 'TOGGLE_AUTHOR_ENABLED_SUCCESS',
    TOGGLE_AUTHOR_ENABLED_FAILED: 'TOGGLE_AUTHOR_ENABLED_FAILED',

    DELETE_AUTHORS_START: 'DELETE_AUTHORS_START',
    DELETE_AUTHORS_SUCCESS: 'DELETE_AUTHORS_SUCCESS',
    DELETE_AUTHORS_FAILED: 'DELETE_AUTHORS_FAILED',

    CLEAR_AUTHOR_ERRORS: 'CLEAR_AUTHOR_ERRORS'
};

export default ACTION_TYPES;