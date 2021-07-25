import React, { useState, useEffect } from 'react'
import ComingSoonMovieInputFields from '../../../../components/coming-soon-movie-input-fields/ComingSoonMovieInputFields';
import { useDispatch, connect } from 'react-redux';
import { selectComingSoonMovie } from './../../../../redux/modules/coming-soon-movie/selector';
import * as COMING_SOON_MOVIE_ACTION from './../../../../redux/modules/coming-soon-movie/actions';
import { createStructuredSelector } from 'reselect';


const CreateComingSoonMovie = ({ COMING_SOON_MOVIE }) => 
{
    const dispatch = useDispatch();

    const [ comingSoonMovie, setComingSoonMovie ] = useState(COMING_SOON_MOVIE.comingSoonMovie)

    const handleClickCreateComingSoonMovie = () => {

        const comingSoonMovieOrigData = comingSoonMovie;
        const { authors, casts, directors, genres, country, language, ...rest } = comingSoonMovie;

        const comingSoonMovie_ = {
            ...comingSoonMovieOrigData, 
            country: country.value,
            language: language.value,
            authors: concatSelectedOptions(authors),
            casts: concatSelectedOptions(casts),
            directors: concatSelectedOptions(directors),
            genres: concatSelectedOptions(genres)
        }

        dispatch(COMING_SOON_MOVIE_ACTION.createComingSoonMovieStart(comingSoonMovie_));
    }

    const concatSelectedOptions = (data) => !data ? '' : data.map(({ label }) => label).join(', ');

    useEffect(() => {
        return () => {
            setComingSoonMovie(COMING_SOON_MOVIE.comingSoonMovie)
        }
    }, []);

    return (
        <ComingSoonMovieInputFields 
            cardHeaderTitle='Add Coming Soon Movie'
            comingSoonMovie={ comingSoonMovie }
            setComingSoonMovie={ setComingSoonMovie }
            saveButtonCallback={ handleClickCreateComingSoonMovie }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie
});

export default connect(mapStateToProps)(CreateComingSoonMovie)