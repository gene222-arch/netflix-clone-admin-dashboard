import React, { useState, useEffect } from 'react'
import MovieInputFields from '../../../../components/movie-input-fields/MovieInputFields';
import { useDispatch, connect } from 'react-redux';
import { selectMovie } from './../../../../redux/modules/movie/selector';
import * as MOVIE_ACTION from './../../../../redux/modules/movie/actions';
import { createStructuredSelector } from 'reselect';


const CreateMovie = ({ MOVIE }) => 
{
    const dispatch = useDispatch();

    const [ movie, setMovie ] = useState(MOVIE.movie)

    const handleClickCreateMovie = () => {

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

    useEffect(() => {
        return () => {
            setMovie(MOVIE.movie)
        }
    }, []);

    return (
        <MovieInputFields 
            cardHeaderTitle='Add Movie'
            movie={ movie }
            setMovie={ setMovie }
            saveButtonCallback={ handleClickCreateMovie }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    MOVIE: selectMovie
});

export default connect(mapStateToProps)(CreateMovie)