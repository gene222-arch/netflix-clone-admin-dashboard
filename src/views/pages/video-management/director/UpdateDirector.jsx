import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as DIRECTOR_ACTION from '../../../../redux/modules/director/actions'; 
import { selectDirector, selectDirectorErrorMessages, selectDirectorHasErrorMessages } from '../../../../redux/modules/director/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const UpdateDirector = ({ DIRECTOR, match, DIRECTOR_ERROR_MESSAGES, DIRECTOR_HAS_ERROR_MESSAGES }) => 
{
    const { id } = match.params; 
    const dispatch = useDispatch();
    const history = useHistory();

    const [ director, setDirector ] = useState(DIRECTOR.director);

    const handleClickUpdateDirector = () => {
        delete director.tableData
        dispatch(DIRECTOR_ACTION.updateDirectorStart(director));
    }

    const onLoadFetchDirectorByID = () => {
        const findDirector = DIRECTOR.directors.find(director => director.id === parseInt(id));
        setDirector(findDirector);
    }

    const handleClickCancel = () => {
        dispatch(DIRECTOR_ACTION.clearDirectorErrors());
        history.push(PATH.VIDEO_MANAGEMENT_DIRECTOR);
    }

    useEffect(() => {
        onLoadFetchDirectorByID();
        return () => {
            setDirector(DIRECTOR.director);
            dispatch(DIRECTOR_ACTION.clearDirectorErrors());
        }
    }, []);

    return (
        <InputFields 
            cardHeaderTitle='Edit Director'
            data={ director }
            setData={ setDirector }
            saveButtonCallback={ handleClickUpdateDirector }
            cancelButtonCallback={ handleClickCancel }
            errors={ DIRECTOR_HAS_ERROR_MESSAGES }
            errorMessages={ DIRECTOR_ERROR_MESSAGES }
            isLoading={ DIRECTOR.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    DIRECTOR: selectDirector,
    DIRECTOR_ERROR_MESSAGES: selectDirectorErrorMessages,
    DIRECTOR_HAS_ERROR_MESSAGES: selectDirectorHasErrorMessages
});

export default connect(mapStateToProps)(UpdateDirector)
