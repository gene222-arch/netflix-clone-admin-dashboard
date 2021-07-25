import ACTION_TYPES from './action.types';

const {
    FETCH_ALL_COMING_SOON_MOVIES_START,
    FETCH_ALL_COMING_SOON_MOVIES_SUCCESS,
    FETCH_ALL_COMING_SOON_MOVIES_FAILED,
    FIND_COMING_SOON_MOVIE_BY_ID_START,
    FIND_COMING_SOON_MOVIE_BY_ID_SUCCESS,
    FIND_COMING_SOON_MOVIE_BY_ID_FAILED,
    CREATE_COMING_SOON_MOVIE_START,
    CREATE_COMING_SOON_MOVIE_SUCCESS,
    CREATE_COMING_SOON_MOVIE_FAILED,
    UPDATE_COMING_SOON_MOVIE_START,
    UPDATE_COMING_SOON_MOVIE_SUCCESS,
    UPDATE_COMING_SOON_MOVIE_FAILED,
    DELETE_COMING_SOON_MOVIES_START,
    DELETE_COMING_SOON_MOVIES_SUCCESS,
    DELETE_COMING_SOON_MOVIES_FAILED,
    TOGGLE_COMING_SOON_MOVIE_RELEASE_START,
    TOGGLE_COMING_SOON_MOVIE_RELEASE_SUCCESS,
    TOGGLE_COMING_SOON_MOVIE_RELEASE_FAILED,
    CLEAR_COMING_SOON_MOVIE_ERRORS,
    UPDATE_COMING_SOON_MOVIE_ERROR_STATE
} = ACTION_TYPES;

const COMING_SOON_MOVIE_DEFAULT_PROPS = {
    id: '',
    title: '',
    plot: '',
    year_of_release: '',
    date_of_release: null,
    duration_in_minutes: '',
    age_restriction: '',
    country: '',
    language: '',
    casts: '',
    cast_ids: [],
    comingSoonMovies: '',
    comingSoonMovie_ids: [],
    directors: '',
    director_ids: [],
    authors: '',
    author_ids: [],
    poster_path: '',
    wallpaper_path: '',
    video_trailer_path: '',
    title_logo_path: '',
    video_size_in_mb: '',
    status: 'Coming Soon'
};

const initialState = {
    comingSoonMovie: COMING_SOON_MOVIE_DEFAULT_PROPS,
    comingSoonMovies: [],
    isLoading: false,
    error: COMING_SOON_MOVIE_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        comingSoonMovies
    } = state;

    const isLoading = false;
    const error = COMING_SOON_MOVIE_DEFAULT_PROPS;
    let updatedComingSoonMovies = [];
    
    switch (type) 
    {
        
        case FETCH_ALL_COMING_SOON_MOVIES_START:
        case FIND_COMING_SOON_MOVIE_BY_ID_START:
        case CREATE_COMING_SOON_MOVIE_START:
        case UPDATE_COMING_SOON_MOVIE_START:
        case DELETE_COMING_SOON_MOVIES_START:
        case TOGGLE_COMING_SOON_MOVIE_RELEASE_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_COMING_SOON_MOVIES_SUCCESS:
            return {
                ...state,
                comingSoonMovies: payload.comingSoonMovies,
                isLoading,
                error 
            }

        case FIND_COMING_SOON_MOVIE_BY_ID_SUCCESS:
            return {
                ...state,
                comingSoonMovie: payload.comingSoonMovie,
                isLoading,
                error
            }

        case CREATE_COMING_SOON_MOVIE_SUCCESS:

            const newMovie = { 
                ...COMING_SOON_MOVIE_DEFAULT_PROPS,
                ...payload.comingSoonMovie,
                id: (comingSoonMovies[comingSoonMovies.length - 1].id + 1), 
            };

            return {
                ...state,
                comingSoonMovies: [ ...comingSoonMovies, newMovie ],
                isLoading,
                error
            }

        case UPDATE_COMING_SOON_MOVIE_SUCCESS:

            updatedComingSoonMovies = comingSoonMovies.map(comingSoonMovie => {
                return comingSoonMovie.id === payload.comingSoonMovie.id 
                    ? payload.comingSoonMovie
                    : comingSoonMovie;
            });

            return {
                ...state,
                comingSoonMovies: updatedComingSoonMovies,
                isLoading,
                error
            }          

        case DELETE_COMING_SOON_MOVIES_SUCCESS:

            updatedComingSoonMovies = comingSoonMovies.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                comingSoonMovies: updatedComingSoonMovies,
                isLoading,
                error
            }

        case TOGGLE_COMING_SOON_MOVIE_RELEASE_SUCCESS:

            updatedComingSoonMovies = comingSoonMovies.map(comingSoonMovie => {
                return comingSoonMovie.id === payload.id 
                    ? { ...comingSoonMovie, status: comingSoonMovie.status === 'Coming Soon' ? 'Released' : 'Coming Soon' }
                    : comingSoonMovie;
            });

            return {
                ...state,
                comingSoonMovies: updatedComingSoonMovies,
                isLoading,
                error
            }

        case CLEAR_COMING_SOON_MOVIE_ERRORS:
            return {
                ...state,
                error
            }
            
        case UPDATE_COMING_SOON_MOVIE_ERROR_STATE:
            return {
                ...state,
                error: {
                    ...state.error,
                    ...payload
                }
            }

        case FETCH_ALL_COMING_SOON_MOVIES_FAILED:
        case FIND_COMING_SOON_MOVIE_BY_ID_FAILED:
        case CREATE_COMING_SOON_MOVIE_FAILED:
        case UPDATE_COMING_SOON_MOVIE_FAILED:
        case DELETE_COMING_SOON_MOVIES_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
