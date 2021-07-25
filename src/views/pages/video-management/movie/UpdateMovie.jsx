import React, { useState, useEffect, useCallback } from 'react'
import MovieInputFields from '../../../../components/movie-input-fields/MovieInputFields';
import { useDispatch, connect } from 'react-redux';
import { selectMovie } from './../../../../redux/modules/movie/selector';
import * as MOVIE_ACTION from './../../../../redux/modules/movie/actions';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { selectAuthorNames } from '../../../../redux/modules/author/selector';
import { selectCastNames } from '../../../../redux/modules/cast/selector';
import { selectDirectorNames } from '../../../../redux/modules/director/selector';
import { selectGenreNames } from '../../../../redux/modules/genre/selector';


const UpdateMovie = ({ MOVIE, AUTHOR_NAMES, CAST_NAMES, DIRECTOR_NAMES, GENRE_NAMES }) => 
{
    const { id } = useParams();
    const dispatch = useDispatch();

    const [ movie, setMovie ] = useState(MOVIE.movie)

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

    const onLoadFetchMovieByID = () => 
    {
        const findMovie = MOVIE.movies.find(movie => movie.id === parseInt(id));
        const { authors, casts, directors, genres, language, country } = findMovie;

        const movie_ = {
            ...findMovie,
            id,
            language: { value: language, label: language },
            country: { value: country, label: country },
            authors: getOptionsFromString(authors, AUTHOR_NAMES),
            casts: getOptionsFromString(casts, CAST_NAMES),
            directors:getOptionsFromString(directors, DIRECTOR_NAMES),
            genres: getOptionsFromString(genres, GENRE_NAMES)
        }

        setMovie(movie_);
    }

    const concatSelectedOptions = (data) => !data ? '' : data.map(({ label }) => label).join(', ');

    const getOptionsFromString = (stringifiedSelectedOptions, options) => options.filter(({ label }) => stringifiedSelectedOptions.split(', ').includes(label));

    const getValuesFromOptions = (selectedOptions) => selectedOptions.map(({ value }) => value);

    useEffect(() => {
        onLoadFetchMovieByID();
        return () => {
            setMovie(MOVIE.movie)
        }
    }, []);

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