import ACTION_TYPES from './action.types';

const {
    ASSIGN_ROLE_START,
    ASSIGN_ROLE_SUCCESS,
    ASSIGN_ROLE_FAILED,
    FETCH_ALL_ACCESS_RIGHTS_START,
    FETCH_ALL_ACCESS_RIGHTS_SUCCESS,
    FETCH_ALL_ACCESS_RIGHTS_FAILED,
    FETCH_ALL_PERMISSIONS_START,
    FETCH_ALL_PERMISSIONS_SUCCESS,
    FETCH_ALL_PERMISSIONS_FAILED,
    FIND_ACCESS_RIGHT_BY_ID_START,
    FIND_ACCESS_RIGHT_BY_ID_SUCCESS,
    FIND_ACCESS_RIGHT_BY_ID_FAILED,
    CREATE_ACCESS_RIGHT_START,
    CREATE_ACCESS_RIGHT_SUCCESS,
    CREATE_ACCESS_RIGHT_FAILED,
    UPDATE_ACCESS_RIGHT_START,
    UPDATE_ACCESS_RIGHT_SUCCESS,
    UPDATE_ACCESS_RIGHT_FAILED,
    DELETE_ACCESS_RIGHTS_START,
    DELETE_ACCESS_RIGHTS_SUCCESS,
    DELETE_ACCESS_RIGHTS_FAILED,
    CLEAR_ACCESS_RIGHT_ERRORS
} = ACTION_TYPES;

const ACCESS_RIGHT_DEFAULT_PROPS = {
    id: '',
    role: '',
    permissions: []
};

const initialState = {
    accessRight: ACCESS_RIGHT_DEFAULT_PROPS,
    accessRights: [],
    permissions: [],
    isLoading: false,
    error: ACCESS_RIGHT_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        accessRights
    } = state;

    const isLoading = false;
    const error = ACCESS_RIGHT_DEFAULT_PROPS;
    let UPDATED_ACCESS_RIGHTS = [];
    
    switch (type) 
    {
        case ASSIGN_ROLE_START:
        case FETCH_ALL_ACCESS_RIGHTS_START:
        case FETCH_ALL_PERMISSIONS_START:
        case FIND_ACCESS_RIGHT_BY_ID_START:
        case CREATE_ACCESS_RIGHT_START:
        case UPDATE_ACCESS_RIGHT_START:
        case DELETE_ACCESS_RIGHTS_START:
            return {
                ...state,
                isLoading: true
            }

        case ASSIGN_ROLE_SUCCESS: 
            return {
                ...state,
                isLoading,
                error
            }

        case FETCH_ALL_ACCESS_RIGHTS_SUCCESS:
            return {
                ...state,
                accessRights: payload.accessRights,
                isLoading,
                error 
            }

        case FETCH_ALL_PERMISSIONS_SUCCESS:
            return {
                ...state,
                permissions: payload.permissions,
                isLoading,
                error 
            }

        case FIND_ACCESS_RIGHT_BY_ID_SUCCESS:
            return {
                ...state,
                accessRight: payload.accessRight,
                isLoading,
                error
            }

        case CREATE_ACCESS_RIGHT_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }

        case UPDATE_ACCESS_RIGHT_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }

        case DELETE_ACCESS_RIGHTS_SUCCESS:

            UPDATED_ACCESS_RIGHTS = accessRights.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                accessRights: UPDATED_ACCESS_RIGHTS,
                isLoading,
                error
            }

        case CLEAR_ACCESS_RIGHT_ERRORS: 
            return {
                ...state,
                error
            }

        case ASSIGN_ROLE_FAILED:
        case FETCH_ALL_ACCESS_RIGHTS_FAILED:
        case FETCH_ALL_PERMISSIONS_FAILED:
        case FIND_ACCESS_RIGHT_BY_ID_FAILED:
        case CREATE_ACCESS_RIGHT_FAILED:
        case UPDATE_ACCESS_RIGHT_FAILED:
        case DELETE_ACCESS_RIGHTS_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
