import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import * as GENRE_ACTION from './../../../../redux/modules/genre/actions';
import * as CONFIRM_ACTION from './../../../../redux/modules/confirm/actions';
import { selectGenre } from './../../../../redux/modules/genre/selector';
import GenreInputFields from '../../../../components/GenreInputFields'
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';
import { navigationConfirmation } from './../../../../config/confirmMessages';


const CreateGenre = ({ GENRE }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ genre, setGenre ] = useState(GENRE.genre);

    const handleClickCreateGenre = () => {
        dispatch(GENRE_ACTION.createGenreStart(genre));
    }

    useEffect(() => {
        return () => {
            dispatch(CONFIRM_ACTION.showConfirmationDialog({
                mainHeader: navigationConfirmation.HEADER,
                subHeader: navigationConfirmation.SUB_HEADER,
                cancelCallback: () => history.push(PATH.CREATE_GENRE),
                confirmCallback: () => {
                    setGenre(GENRE.genre);
                    dispatch(GENRE_ACTION.clearGenreErrors());
                }
            }));
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
