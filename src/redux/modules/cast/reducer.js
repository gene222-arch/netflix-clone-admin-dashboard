import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_CASTS_START,
    FETCH_ALL_CASTS_SUCCESS,
    FETCH_ALL_CASTS_FAILED,
    FIND_CAST_BY_ID_START,
    FIND_CAST_BY_ID_SUCCESS,
    FIND_CAST_BY_ID_FAILED,
    CREATE_CAST_START,
    CREATE_CAST_SUCCESS,
    CREATE_CAST_FAILED,
    UPDATE_CAST_START,
    UPDATE_CAST_SUCCESS,
    UPDATE_CAST_FAILED,
    TOGGLE_CAST_ENABLED_START,
    TOGGLE_CAST_ENABLED_SUCCESS,
    TOGGLE_CAST_ENABLED_FAILED,
    DELETE_CASTS_START,
    DELETE_CASTS_SUCCESS,
    DELETE_CASTS_FAILED,
    CLEAR_CAST_ERRORS
} = ACTION_TYPES;

const CAST_DEFAULT_PROPS = {
    id: '',
    pseudonym: '',
    birth_name: '',
    gender: '',
    height_in_cm: '',
    biographical_information: '',
    birth_details: '',
    date_of_birth: null,
    place_of_birth: '',
    death_details: '',
    date_of_death: null,
    enabled: false,
};

const initialState = {
    cast: CAST_DEFAULT_PROPS,
    casts: [],
    isLoading: false,
    error: null
};

export default (state = initialState, { type, payload }) =>
{
    const {
        casts
    } = state;

    const isLoading = false;
    const error = null;
    let UPDATED_CASTS = [];
    
    switch (type) 
    {
        
        case FETCH_ALL_CASTS_START:
        case FIND_CAST_BY_ID_START:
        case CREATE_CAST_START:
        case UPDATE_CAST_START:
        case TOGGLE_CAST_ENABLED_START:
        case DELETE_CASTS_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_CASTS_SUCCESS:
            return {
                ...state,
                casts: payload.casts,
                isLoading,
                error 
            }

        case FIND_CAST_BY_ID_SUCCESS:
            return {
                ...state,
                cast: payload.cast,
                isLoading,
                error
            }

        case CREATE_CAST_SUCCESS:

            const newCast = { 
                ...CAST_DEFAULT_PROPS,
                ...payload.cast,
                id: (casts[casts.length - 1].id + 1), 
            };

            return {
                ...state,
                casts: [ ...casts, newCast ],
                isLoading,
                error
            }

        case UPDATE_CAST_SUCCESS:

            UPDATED_CASTS = casts.map(cast => {
                return cast.id === payload.cast.id 
                    ? payload.cast
                    : cast;
            });

            return {
                ...state,
                casts: UPDATED_CASTS,
                isLoading,
                error
            }

        case TOGGLE_CAST_ENABLED_SUCCESS:

            UPDATED_CASTS = casts.map(cast => {
                return cast.id === payload.id 
                    ? { ...cast, enabled: !cast.enabled }
                    : cast;
            });

            return {
                ...state,
                casts: UPDATED_CASTS,
                isLoading,
                error
            }

        case DELETE_CASTS_SUCCESS:

            UPDATED_CASTS = casts.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                casts: UPDATED_CASTS,
                isLoading,
                error
            }
            
        case CLEAR_CAST_ERRORS: 
            return {
                ...state, 
                error
            }

        case FETCH_ALL_CASTS_FAILED:
        case FIND_CAST_BY_ID_FAILED:
        case CREATE_CAST_FAILED:
        case UPDATE_CAST_FAILED:
        case TOGGLE_CAST_ENABLED_FAILED:
        case DELETE_CASTS_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
