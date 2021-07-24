import React, { useState, useEffect } from 'react'
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
        const { authors, casts, directors, genres, country, language, ...rest } = movie;

        const movie_ = {
            ...movieOrigData, 
            country: concatSelectedOptions(country),
            language: concatSelectedOptions(language),
            authors: concatSelectedOptions(authors),
            casts: concatSelectedOptions(casts),
            directors: concatSelectedOptions(directors),
            genres: concatSelectedOptions(genres)
        }

        dispatch(MOVIE_ACTION.createMovieStart(movie_));
    }

    const concatSelectedOptions = (data) => !data ? '' : data.map(({ label }) => label).join(', ');

    const onLoadFetchMovieByID = () => {
        const findMovie = MOVIE.movies.find(movie => movie.id === parseInt(id));
        const { authors, casts, directors, genres, language, country } = findMovie;

        const joinedAuthors = authors.split(', ');
        const joindCasts = casts.split(', ');
        const joindDirectors = directors.split(', ');
        const joindGenres = genres.split(', ');

        const movie_ = {
            ...findMovie,
            language: [{ value: language, label: language }],
            country: [{ value: country, label: country }],
            authors: AUTHOR_NAMES.filter(name => joinedAuthors.includes(name.label)),
            casts: CAST_NAMES.filter(name => joindCasts.includes(name.label)),
            directors: DIRECTOR_NAMES.filter(name => joindDirectors.includes(name.label)),
            genres: GENRE_NAMES.filter(name => joindGenres.includes(name.label))
        }

        setMovie(movie_);
    }

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