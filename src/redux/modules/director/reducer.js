import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_DIRECTORS_START,
    FETCH_ALL_DIRECTORS_SUCCESS,
    FETCH_ALL_DIRECTORS_FAILED,
    FIND_DIRECTOR_BY_ID_START,
    FIND_DIRECTOR_BY_ID_SUCCESS,
    FIND_DIRECTOR_BY_ID_FAILED,
    CREATE_DIRECTOR_START,
    CREATE_DIRECTOR_SUCCESS,
    CREATE_DIRECTOR_FAILED,
    UPDATE_DIRECTOR_START,
    UPDATE_DIRECTOR_SUCCESS,
    UPDATE_DIRECTOR_FAILED,
    RESTORE_DIRECTORS_START,
    RESTORE_DIRECTORS_SUCCESS,
    RESTORE_DIRECTORS_FAILED,
    TOGGLE_DIRECTOR_ENABLED_START,
    TOGGLE_DIRECTOR_ENABLED_SUCCESS,
    TOGGLE_DIRECTOR_ENABLED_FAILED,
    DELETE_DIRECTORS_START,
    DELETE_DIRECTORS_SUCCESS,
    DELETE_DIRECTORS_FAILED,
    CLEAR_DIRECTOR_ERRORS
} = ACTION_TYPES;

const DIRECTOR_DEFAULT_PROPS = {
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
    director: DIRECTOR_DEFAULT_PROPS,
    directors: [],
    isLoading: false,
    error: DIRECTOR_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        directors
    } = state;

    const isLoading = false;
    const error = DIRECTOR_DEFAULT_PROPS;
    let UPDATED_DIRECTORS = [];
    
    switch (type) 
    {
        
        case FETCH_ALL_DIRECTORS_START:
        case FIND_DIRECTOR_BY_ID_START:
        case CREATE_DIRECTOR_START:
        case UPDATE_DIRECTOR_START:
        case RESTORE_DIRECTORS_START:
        case TOGGLE_DIRECTOR_ENABLED_START:
        case DELETE_DIRECTORS_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_DIRECTORS_SUCCESS:
            return {
                ...state,
                directors: payload.directors,
                isLoading,
                error 
            }

        case FIND_DIRECTOR_BY_ID_SUCCESS:
            return {
                ...state,
                director: payload.director,
                isLoading,
                error
            }

        case CREATE_DIRECTOR_SUCCESS:

            const newDirector = { 
                ...DIRECTOR_DEFAULT_PROPS,
                ...payload.director,
                id: (directors[directors.length - 1].id + 1), 
            };

            return {
                ...state,
                directors: [ ...directors, newDirector ],
                isLoading,
                error
            }

        case UPDATE_DIRECTOR_SUCCESS:

            UPDATED_DIRECTORS = directors.map(director => {
                return director.id === payload.director.id 
                    ? payload.director
                    : director;
            });

            return {
                ...state,
                directors: UPDATED_DIRECTORS,
                isLoading,
                error
            }

        case RESTORE_DIRECTORS_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }

        case TOGGLE_DIRECTOR_ENABLED_SUCCESS:

            UPDATED_DIRECTORS = directors.map(director => {
                return director.id === payload.id 
                    ? { ...director, enabled: !director.enabled }
                    : director;
            });

            return {
                ...state,
                directors: UPDATED_DIRECTORS,
                isLoading,
                error
            }

        case DELETE_DIRECTORS_SUCCESS:

            UPDATED_DIRECTORS = directors.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                directors: UPDATED_DIRECTORS,
                isLoading,
                error
            }

        case CLEAR_DIRECTOR_ERRORS:
            return {
                ...state,
                error
            }

        case FETCH_ALL_DIRECTORS_FAILED:
        case FIND_DIRECTOR_BY_ID_FAILED:
        case CREATE_DIRECTOR_FAILED:
        case UPDATE_DIRECTOR_FAILED:
        case RESTORE_DIRECTORS_FAILED:
        case TOGGLE_DIRECTOR_ENABLED_FAILED:
        case DELETE_DIRECTORS_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
