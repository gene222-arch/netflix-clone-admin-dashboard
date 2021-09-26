import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import * as GENRE_ACTION from './../../../../redux/modules/genre/actions';
import { selectGenre } from './../../../../redux/modules/genre/selector';
import GenreInputFields from '../../../../components/GenreInputFields'
import DataNotFound from './../../../../components/not-found-components/DataNotFound';
import { MoodBadOutlined } from '@material-ui/icons';

const CreateGenre = ({ GENRE, match }) => 
{
    const { id } = match.params;
    const dispatch = useDispatch();

    const [ genre, setGenre ] = useState(GENRE.genre);
    const [ isGenreFound, setIsGenreFound ] = useState(true);

    const handleClickCreateGenre = () => {
        dispatch(GENRE_ACTION.updateGenreStart(genre));
    }

    const onLoadFetchGenreByID = () => 
    {
        const findGenre = GENRE.genres.find(genre => genre.id === parseInt(id));
        
        !findGenre 
            ? setIsGenreFound(false)
            : setGenre(findGenre);
    }

    useEffect(() => {
        onLoadFetchGenreByID();

        return () => {
            setGenre(GENRE.genre);
        }
    }, []);

    if (! isGenreFound) return <DataNotFound type='Genre' Icon={ MoodBadOutlined } />

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
