import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_GENRES_START,
    FETCH_ALL_GENRES_SUCCESS,
    FETCH_ALL_GENRES_FAILED,
    FIND_GENRE_BY_ID_START,
    FIND_GENRE_BY_ID_SUCCESS,
    FIND_GENRE_BY_ID_FAILED,
    CREATE_GENRE_START,
    CREATE_GENRE_SUCCESS,
    CREATE_GENRE_FAILED,
    UPDATE_GENRE_START,
    UPDATE_GENRE_SUCCESS,
    UPDATE_GENRE_FAILED,
    TOGGLE_GENRE_ENABLED_START,
    TOGGLE_GENRE_ENABLED_SUCCESS,
    TOGGLE_GENRE_ENABLED_FAILED,
    DELETE_GENRES_START,
    DELETE_GENRES_SUCCESS,
    DELETE_GENRES_FAILED,
    CLEAR_GENRE_ERRORS
} = ACTION_TYPES;

const GENRE_DEFAULT_PROPS = {
    id: '',
    name: '',
    description: '',
    enabled: false
};

const initialState = {
    genre: GENRE_DEFAULT_PROPS,
    genres: [],
    isLoading: false,
    error: GENRE_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        genres
    } = state;

    const isLoading = false;
    const error = GENRE_DEFAULT_PROPS;
    let UPDATED_GENRES = [];
    
    switch (type) 
    {
        
        case FETCH_ALL_GENRES_START:
        case FIND_GENRE_BY_ID_START:
        case CREATE_GENRE_START:
        case UPDATE_GENRE_START:
        case TOGGLE_GENRE_ENABLED_START:
        case DELETE_GENRES_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_GENRES_SUCCESS:
            return {
                ...state,
                genres: payload.genres,
                isLoading,
                error 
            }

        case FIND_GENRE_BY_ID_SUCCESS:
            return {
                ...state,
                genre: payload.genre,
                isLoading,
                error
            }

        case CREATE_GENRE_SUCCESS:

            const newGenre = { 
                ...GENRE_DEFAULT_PROPS,
                ...payload.genre,
                id: (genres[genres.length - 1].id + 1), 
            };

            return {
                ...state,
                genres: [ ...genres, newGenre ],
                isLoading,
                error
            }

        case UPDATE_GENRE_SUCCESS:

            UPDATED_GENRES = genres.map(genre => {
                return genre.id === payload.genre.id 
                    ? payload.genre
                    : genre;
            });

            return {
                ...state,
                genres: UPDATED_GENRES,
                isLoading,
                error
            }

        case TOGGLE_GENRE_ENABLED_SUCCESS:

            UPDATED_GENRES = genres.map(genre => {
                return genre.id === payload.id 
                    ? { ...genre, enabled: !genre.enabled }
                    : genre;
            });

            return {
                ...state,
                genres: UPDATED_GENRES,
                isLoading,
                error
            }            

        case DELETE_GENRES_SUCCESS:

            UPDATED_GENRES = genres.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                genres: UPDATED_GENRES,
                isLoading,
                error
            }

        case CLEAR_GENRE_ERRORS:
            return {
                ...state,
                error
            }
            
        case FETCH_ALL_GENRES_FAILED:
        case FIND_GENRE_BY_ID_FAILED:
        case CREATE_GENRE_FAILED:
        case UPDATE_GENRE_FAILED:
        case TOGGLE_GENRE_ENABLED_FAILED:
        case DELETE_GENRES_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
