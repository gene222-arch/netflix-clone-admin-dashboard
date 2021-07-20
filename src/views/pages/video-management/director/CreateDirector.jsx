import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as DIRECTOR_ACTION from './../../../../redux/modules/director/actions'; 
import { selectDirector, selectDirectorErrorMessages, selectDirectorHasErrorMessages } from './../../../../redux/modules/director/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateDirector = ({ DIRECTOR, DIRECTOR_ERROR_MESSAGES, DIRECTOR_HAS_ERROR_MESSAGES }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ director, setDirector ] = useState(DIRECTOR.director);

    const handleClickCreateDirector = () => {
        dispatch(DIRECTOR_ACTION.createDirectorStart(director));
    }

    const handleClickCancel = () => {
        dispatch(DIRECTOR_ACTION.clearDirectorErrors());
        history.push(PATH.VIDEO_MANAGEMENT_DIRECTOR);
    }

    useEffect(() => {
        return () => {
            setDirector(DIRECTOR.director);
            dispatch(DIRECTOR_ACTION.clearDirectorErrors());
        }
    }, []);

    return (
        <InputFields 
            data={ director }
            cardHeaderTitle='Add Director'
            setData={ setDirector }
            saveButtonCallback={ handleClickCreateDirector }
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

export default connect(mapStateToProps)(CreateDirector)
