import React, { useState, useEffect, useCallback } from 'react'
import MovieInputFields from '../../../../components/movie-input-fields/MovieInputFields';
import { useDispatch, connect } from 'react-redux';
import { selectMovie } from './../../../../redux/modules/movie/selector';
import * as MOVIE_API from './../../../../services/movies/movie';
import * as MOVIE_ACTION from './../../../../redux/modules/movie/actions';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { selectAuthorNames } from '../../../../redux/modules/author/selector';
import { selectCastNames } from '../../../../redux/modules/cast/selector';
import { selectDirectorNames } from '../../../../redux/modules/director/selector';
import { selectGenreNames } from '../../../../redux/modules/genre/selector';
import MovieInputLoader from '../../../../components/styled-loaders/MovieInputLoader';
import VideocamOff from '@material-ui/icons/VideocamOff';
import DataNotFound from './../../../../components/not-found-components/DataNotFound';


const UpdateMovie = ({ MOVIE, AUTHOR_NAMES, CAST_NAMES, DIRECTOR_NAMES, GENRE_NAMES }) => 
{
    const { id } = useParams();
    const dispatch = useDispatch();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ movie, setMovie ] = useState(MOVIE.movie);
    const [ isMovieFound, setIsMovieFound ] = useState(true);


    const handleClickUpdateMovie = () => 
    {
        const movieOrigData = movie;
        const { authors, casts, directors, genres, country, language, video_size_in_mb, ...rest } = movie;
        
        const movie_ = {
            ...movieOrigData, 
            country: country.value,
            language: language.value,
            authors: concatSelectedOptions(authors),
            author_ids: getValuesFromOptions(authors, AUTHOR_NAMES),
            casts: concatSelectedOptions(casts),
            cast_ids: getValuesFromOptions(casts, CAST_NAMES),
            directors: concatSelectedOptions(directors),
            director_ids: getValuesFromOptions(directors, DIRECTOR_NAMES),
            genres: concatSelectedOptions(genres),
            genre_ids: getValuesFromOptions(genres, GENRE_NAMES),
            video_size_in_mb: parseFloat(video_size_in_mb)
        }

        dispatch(MOVIE_ACTION.updateMovieStart(movie_));
    }

    const onLoadFetchMovieByID = async () => 
    {
        const parsedId = parseInt(id);
        let selectedMovie = null;

        if (! MOVIE.movies.length) 
        {
            setIsLoading(true);

            try {
                const { data } = await MOVIE_API.findByIDAsync(parsedId);
                selectedMovie = data;
            } catch ({ message }) {
                window.alert(message)
            }
        } else {
            selectedMovie = MOVIE.movies.find(movie => movie.id === parsedId);
        }
        
        if (! selectedMovie) {
            setIsMovieFound(false);
        }
        else
        {
            const { authors, casts, directors, genres, language, country, similar_movies } = selectedMovie;

            const movie_ = {
                ...selectedMovie,
                id,
                language: { value: language, label: language },
                country: { value: country, label: country },
                authors: getOptionsFromString(authors, AUTHOR_NAMES),
                casts: getOptionsFromString(casts, CAST_NAMES),
                directors: getOptionsFromString(directors, DIRECTOR_NAMES),
                genres: getOptionsFromString(genres, GENRE_NAMES),
                similar_movies: similar_movies?.map(({ movie_id, movie }) => ({ value: movie_id, label: movie.title })) ?? []
            }

            setMovie(movie_);
        }

        setIsLoading(false);
    }

    const concatSelectedOptions = (data) => !data ? '' : data.map(({ label }) => label).join(', ');

    const getOptionsFromString = (stringifiedSelectedOptions, options) => options.filter(({ label }) => stringifiedSelectedOptions.split(', ').includes(label));

    const getValuesFromOptions = (selectedOptions) => selectedOptions.map(({ value }) => value);

    useEffect(() => 
    {
        onLoadFetchMovieByID();
        return () => {
            setMovie(MOVIE.movie);
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return <MovieInputLoader />

    if (! isMovieFound) return <DataNotFound type='Movie' Icon={ VideocamOff } />

    return (
        <MovieInputFields 
            cardHeaderTitle='Update Movie'
            movie={ movie }
            setMovie={ setMovie }
            saveButtonCallback={ handleClickUpdateMovie }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    MOVIE: selectMovie,
    AUTHOR_NAMES: selectAuthorNames,
    CAST_NAMES: selectCastNames,
    DIRECTOR_NAMES: selectDirectorNames,
    GENRE_NAMES: selectGenreNames
});

export default connect(mapStateToProps)(UpdateMovie)