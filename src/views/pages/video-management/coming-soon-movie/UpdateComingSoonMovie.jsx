import React, { useState, useEffect } from 'react'
import ComingSoonMovieInputFields from '../../../../components/coming-soon-movie-input-fields/ComingSoonMovieInputFields';
import { useDispatch, connect } from 'react-redux';
import { selectComingSoonMovie } from '../../../../redux/modules/coming-soon-movie/selector';
import * as COMING_SOON_MOVIE_ACTION from '../../../../redux/modules/coming-soon-movie/actions';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { selectAuthorNames } from '../../../../redux/modules/author/selector';
import { selectCastNames } from '../../../../redux/modules/cast/selector';
import { selectDirectorNames } from '../../../../redux/modules/director/selector';
import { selectGenreNames } from '../../../../redux/modules/genre/selector';
import VideocamOff from '@material-ui/icons/VideocamOff';
import DataNotFound from './../../../../components/not-found-components/DataNotFound';


const UpdateComingSoonMovie = ({ COMING_SOON_MOVIE, AUTHOR_NAMES, CAST_NAMES, DIRECTOR_NAMES, GENRE_NAMES }) => 
{
    const { id } = useParams();
    const dispatch = useDispatch();

    const [ comingSoonMovie, setComingSoonMovie ] = useState(COMING_SOON_MOVIE.comingSoonMovie);
    const [ isComingSoonMovieFound, setIsComingSoonMovieFound ] = useState(true);

    const handleClickUpdateComingSoonMovie = () => 
    {
        const comingSoonMovieOrigData = comingSoonMovie;
        const { authors, casts, directors, genres, country, language, video_size_in_mb, ...rest } = comingSoonMovie;
        
        const comingSoonMovie_ = {
            ...comingSoonMovieOrigData, 
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

        dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieStart(comingSoonMovie_));
    }

    const onLoadFetchMovieByID = () => 
    {
        const findMovie = COMING_SOON_MOVIE.comingSoonMovies.find(comingSoonMovie => comingSoonMovie.id === parseInt(id));

        if (! findMovie) {
            setIsComingSoonMovieFound(false);
        }
        else {
            const { authors, casts, directors, genres, language, country } = findMovie;

            const comingSoonMovie_ = {
                ...findMovie,
                id,
                language: { value: language, label: language },
                country: { value: country, label: country },
                authors: getOptionsFromString(authors, AUTHOR_NAMES),
                casts: getOptionsFromString(casts, CAST_NAMES),
                directors:getOptionsFromString(directors, DIRECTOR_NAMES),
                genres: getOptionsFromString(genres, GENRE_NAMES)
            }
    
            setComingSoonMovie(comingSoonMovie_);
        }
    }

    const concatSelectedOptions = (data) => !data ? '' : data.map(({ label }) => label).join(', ');

    const getOptionsFromString = (stringifiedSelectedOptions, options) => options.filter(({ label }) => stringifiedSelectedOptions.split(', ').includes(label));

    const getValuesFromOptions = (selectedOptions) => selectedOptions.map(({ value }) => value);

    useEffect(() => {
        onLoadFetchMovieByID();
        return () => {
            setComingSoonMovie(COMING_SOON_MOVIE.comingSoonMovie)
        }
    }, []);

    if (! isComingSoonMovieFound) return <DataNotFound type='Upcoming Movie' Icon={ VideocamOff } />

    return (
        <ComingSoonMovieInputFields 
            cardHeaderTitle='Update Movie'
            comingSoonMovie={ comingSoonMovie }
            setComingSoonMovie={ setComingSoonMovie }
            saveButtonCallback={ handleClickUpdateComingSoonMovie }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie,
    AUTHOR_NAMES: selectAuthorNames,
    CAST_NAMES: selectCastNames,
    DIRECTOR_NAMES: selectDirectorNames,
    GENRE_NAMES: selectGenreNames
});

export default connect(mapStateToProps)(UpdateComingSoonMovie)