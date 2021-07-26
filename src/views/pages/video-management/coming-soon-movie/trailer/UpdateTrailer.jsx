import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectComingSoonMovie } from './../../../../../redux/modules/coming-soon-movie/selector';
import * as COMING_SOON_MOVIE_ACTION from './../../../../../redux/modules/coming-soon-movie/actions';
import * as COMING_SOON_MOVIE_API from './../../../../../services/movies/coming.soon.movie';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TrailerInputFields from '../../../../../components/TrailerInputFields';

const UpdateTrailer = ({ COMING_SOON_MOVIE }) => 
{
    const { id, trailerID } = useParams();
    const dispatch = useDispatch();

    const [ trailer, setTrailer ] = useState(COMING_SOON_MOVIE.trailer)

    const handleClickUpdateTrailer = () => dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerStart({ ...trailer, coming_soon_movie_id: id }));

    const onLoadFetchTrailerByID = async () => 
    {
        try {
            const { data } = await COMING_SOON_MOVIE_API.findTrailerByIDAsync({ id, trailerID });

            setTrailer(data);
        } catch ({ message }) {
            window.alert(`ERROR: ${ message }`);
        }
    }

    useEffect(() => {

        onLoadFetchTrailerByID();

        return () => {
            setTrailer(COMING_SOON_MOVIE.trailer);
        }
    }, []);

    return (
        <TrailerInputFields 
            id={ id }
            trailer={ trailer }
            setTrailer={ setTrailer }
            handleClickSave={ handleClickUpdateTrailer }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie
});

export default connect(mapStateToProps)(UpdateTrailer)
