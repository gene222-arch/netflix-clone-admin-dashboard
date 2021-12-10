import ACTION_TYPES from './action.types';
import * as DATE from './../../../utils/date'

const {
    FETCH_ALL_MOVIES_START,
    FETCH_ALL_MOVIES_SUCCESS,
    FETCH_ALL_MOVIES_FAILED,
    FIND_MOVIE_BY_ID_START,
    FIND_MOVIE_BY_ID_SUCCESS,
    FIND_MOVIE_BY_ID_FAILED,
    CREATE_MOVIE_START,
    CREATE_MOVIE_SUCCESS,
    CREATE_MOVIE_FAILED,
    UPDATE_MOVIE_START,
    UPDATE_MOVIE_SUCCESS,
    UPDATE_MOVIE_FAILED,
    RESTORE_MOVIES_START,
    RESTORE_MOVIES_SUCCESS,
    RESTORE_MOVIES_FAILED,
    DELETE_MOVIES_START,
    DELETE_MOVIES_SUCCESS,
    DELETE_MOVIES_FAILED,
    CLEAR_MOVIE_ERRORS,
    UPDATE_MOVIE_ERROR_STATE
} = ACTION_TYPES;

const MOVIE_DEFAULT_PROPS = {
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
    genres: '',
    genre_ids: [],
    directors: '',
    director_ids: [],
    authors: '',
    author_ids: [],
    poster_path: '',
    wallpaper_path: '',
    video_path: '',
    video_preview_path: '',
    title_logo_path: '',
    video_size_in_mb: '',
    similar_movie_ids: [],
    similar_movies: ''
};

const initialState = {
    movie: MOVIE_DEFAULT_PROPS,
    movies: [],
    isLoading: false,
    error: MOVIE_DEFAULT_PROPS
};

export default (state = initialState, { type, payload }) =>
{
    const {
        movies
    } = state;

    const isLoading = false;
    const error = MOVIE_DEFAULT_PROPS;
    let UPDATED_MOVIES = [];
    
    switch (type) 
    {
        
        case FETCH_ALL_MOVIES_START:
        case FIND_MOVIE_BY_ID_START:
        case CREATE_MOVIE_START:
        case UPDATE_MOVIE_START:
        case RESTORE_MOVIES_START:
        case DELETE_MOVIES_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_ALL_MOVIES_SUCCESS:
            return {
                ...state,
                movies: payload.movies,
                isLoading,
                error 
            }

        case FIND_MOVIE_BY_ID_SUCCESS:
            return {
                ...state,
                movie: payload.movie,
                isLoading,
                error
            }

        case CREATE_MOVIE_SUCCESS:

            const newMovie = { 
                ...MOVIE_DEFAULT_PROPS,
                ...payload.movie,
                id: (movies[movies.length - 1].id + 1), 
            };

            return {
                ...state,
                movies: [ ...movies, newMovie ],
                isLoading,
                error
            }

        case UPDATE_MOVIE_SUCCESS:

            UPDATED_MOVIES = movies.map(movie => {
                return movie.id === payload.movie.id 
                    ? payload.movie
                    : movie;
            });

            return {
                ...state,
                movies: UPDATED_MOVIES,
                isLoading,
                error
            }          

        case DELETE_MOVIES_SUCCESS:

            UPDATED_MOVIES = movies.filter(({ id }) => !payload.ids.includes(id));

            return {
                ...state,
                movies: UPDATED_MOVIES,
                isLoading,
                error
            }

        case CLEAR_MOVIE_ERRORS:
            return {
                ...state,
                error
            }
            
        case UPDATE_MOVIE_ERROR_STATE:
            return {
                ...state,
                error: {
                    ...state.error,
                    ...payload
                }
            }

        case RESTORE_MOVIES_SUCCESS:
            return {
                ...state,
                isLoading,
                error
            }

        case FETCH_ALL_MOVIES_FAILED:
        case FIND_MOVIE_BY_ID_FAILED:
        case CREATE_MOVIE_FAILED:
        case UPDATE_MOVIE_FAILED:
        case RESTORE_MOVIES_FAILED:
        case DELETE_MOVIES_FAILED:
            return {
                ...state,
                isLoading,
                error: payload.message
            }

        default:
            return state;
    }
}
