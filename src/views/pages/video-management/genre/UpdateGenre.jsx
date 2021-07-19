import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import * as GENRE_ACTION from './../../../../redux/modules/genre/actions';
import { selectGenre } from './../../../../redux/modules/genre/selector';
import GenreInputFields from '../../../../components/GenreInputFields'


const CreateGenre = ({ GENRE, match }) => 
{
    const { id } = match.params;
    const dispatch = useDispatch();

    const [ genre, setGenre ] = useState(GENRE.genre);

    const handleClickCreateGenre = () => {
        dispatch(GENRE_ACTION.updateGenreStart(genre));
    }

    const onLoadFetchGenreByID = () => {
        const findGenre = GENRE.genres.find(genre => genre.id === parseInt(id));
        setGenre(findGenre);
    }

    useEffect(() => {
        onLoadFetchGenreByID();

        return () => {
            setGenre(GENRE.genre);
        }
    }, []);

    return (
        <GenreInputFields 
            cardHeaderTitle='Edit Genre'
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
