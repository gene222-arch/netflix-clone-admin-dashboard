import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectComingSoonMovie } from './../../../../../redux/modules/coming-soon-movie/selector';
import * as COMING_SOON_MOVIE_ACTION from './../../../../../redux/modules/coming-soon-movie/actions';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TrailerInputFields from '../../../../../components/TrailerInputFields';

const CreateTrailer = ({ COMING_SOON_MOVIE }) => 
{
    const { id } = useParams();
    const dispatch = useDispatch();

    const [ trailer, setTrailer ] = useState(COMING_SOON_MOVIE.trailer)

    const handleClickCreateTrailer = () => dispatch(COMING_SOON_MOVIE_ACTION.createTrailerStart({ ...trailer, coming_soon_movie_id: id }));

    useEffect(() => {
        return () => {
            setTrailer(COMING_SOON_MOVIE.trailer);
        }
    }, []);

    return (
        <TrailerInputFields 
            id={ id }
            trailer={ trailer }
            setTrailer={ setTrailer }
            handleClickSave={ handleClickCreateTrailer }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie
});

export default connect(mapStateToProps)(CreateTrailer)
