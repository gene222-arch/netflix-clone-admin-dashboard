import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_AUTHORS_START,
    FETCH_ALL_AUTHORS_SUCCESS,
    FETCH_ALL_AUTHORS_FAILED,
    FIND_AUTHOR_BY_ID_START,
    FIND_AUTHOR_BY_ID_SUCCESS,
    FIND_AUTHOR_BY_ID_FAILED,
    CREATE_AUTHOR_START,
    CREATE_AUTHOR_SUCCESS,
    CREATE_AUTHOR_FAILED,
    UPDATE_AUTHOR_START,
    UPDATE_AUTHOR_SUCCESS,
    UPDATE_AUTHOR_FAILED,
    TOGGLE_AUTHOR_ENABLED_START,
    TOGGLE_AUTHOR_ENABLED_SUCCESS,
    TOGGLE_AUTHOR_ENABLED_FAILED,
    DELETE_AUTHORS_START,
    DELETE_AUTHORS_SUCCESS,
    DELETE_AUTHORS_FAILED,
    CLEAR_AUTHOR_ERRORS
} = ACTION_TYPES;

const AUTHOR_DEFAULT_PROPS = {
    id: '',
    avatar_path: null,
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
    author: AUTHOR_DEFAULT_PROPS,
    authors: [],
    isLoading: false,
    error: AUTHOR_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        authors
    } = state;

    const isLoading = false;
    const error = AUTHOR_DEFAULT_PROPS;
    let UPDATED_AUTHORS = [];
    
    switch (type) 
    {
        
        case FETCH_ALL_AUTHORS_START:
        case FIND_AUTHOR_BY_ID_START:
        case CREATE_AUTHOR_START:
        case UPDATE_AUTHOR_START:
        case TOGGLE_AUTHOR_ENABLED_START:
        case DELETE_AUTHORS_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_AUTHORS_SUCCESS:
            return {
                ...state,
                authors: payload.authors,
                isLoading,
                error 
            }

        case FIND_AUTHOR_BY_ID_SUCCESS:
            return {
                ...state,
                author: payload.author,
                isLoading,
                error
            }

        case CREATE_AUTHOR_SUCCESS:

            const newAuthor = { 
                ...AUTHOR_DEFAULT_PROPS,
                ...payload.author,
                id: (authors[authors.length - 1].id + 1), 
            };

            return {
                ...state,
                authors: [ ...authors, newAuthor ],
                isLoading,
                error
            }

        case UPDATE_AUTHOR_SUCCESS:

            UPDATED_AUTHORS = authors.map(author => {
                return author.id === payload.author.id 
                    ? payload.author
                    : author;
            });

            return {
                ...state,
                authors: UPDATED_AUTHORS,
                isLoading,
                error
            }

        case TOGGLE_AUTHOR_ENABLED_SUCCESS:

            UPDATED_AUTHORS = authors.map(author => {
                return author.id === payload.id 
                    ? { ...author, enabled: !author.enabled }
                    : author;
            });

            return {
                ...state,
                authors: UPDATED_AUTHORS,
                isLoading,
                error
            }

        case DELETE_AUTHORS_SUCCESS:

            UPDATED_AUTHORS = authors.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                authors: UPDATED_AUTHORS,
                isLoading,
                error
            }

        case CLEAR_AUTHOR_ERRORS: 
            return {
                ...state,
                error
            }

        case FETCH_ALL_AUTHORS_FAILED:
        case FIND_AUTHOR_BY_ID_FAILED:
        case CREATE_AUTHOR_FAILED:
        case UPDATE_AUTHOR_FAILED:
        case TOGGLE_AUTHOR_ENABLED_FAILED:
        case DELETE_AUTHORS_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
