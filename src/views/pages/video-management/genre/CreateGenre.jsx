import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import * as GENRE_ACTION from './../../../../redux/modules/genre/actions';
import { selectGenre } from './../../../../redux/modules/genre/selector';
import GenreInputFields from '../../../../components/GenreInputFields'


const CreateGenre = ({ GENRE }) => 
{
    const dispatch = useDispatch();

    const [ genre, setGenre ] = useState(GENRE.genre);

    const handleClickCreateGenre = () => {
        dispatch(GENRE_ACTION.createGenreStart(genre));
    }

    useEffect(() => {
        return () => {
            setGenre(GENRE.genre);
        }
    }, []);

    return (
        <GenreInputFields 
            cardHeaderTitle='Add Genre'
            data={ genre }
            setData={ setGenre }
            saveButtonCallback={ handleClickCreateGenre }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    GENRE: selectGenre
});

export default connect(mapStateToProps)(CreateGenre)
