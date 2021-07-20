import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as CAST_ACTION from './../../../../redux/modules/cast/actions'; 
import { selectCast, selectCastErrorMessages, selectCastHasErrorMessages } from './../../../../redux/modules/cast/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateCast = ({ CAST, CAST_ERROR_MESSAGES, CAST_HAS_ERROR_MESSAGES }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ cast, setCast ] = useState(CAST.cast);

    const handleClickCreateCast = () => {
        dispatch(CAST_ACTION.createCastStart(cast));
    }

    const handleClickCancel = () => {
        dispatch(CAST_ACTION.clearCastErrors());
        history.push(PATH.VIDEO_MANAGEMENT_CAST);
    }

    useEffect(() => {
        return () => {
            setCast(CAST.cast);
            dispatch(CAST_ACTION.clearCastErrors());
        }
    }, []);

    return (
        <InputFields 
            data={ cast }
            cardHeaderTitle='Add Cast'
            setData={ setCast }
            saveButtonCallback={ handleClickCreateCast }
            cancelButtonCallback={ handleClickCancel }
            errors={ CAST_HAS_ERROR_MESSAGES }
            errorMessages={ CAST_ERROR_MESSAGES }
            isLoading={ CAST.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    CAST: selectCast,
    CAST_ERROR_MESSAGES: selectCastErrorMessages,
    CAST_HAS_ERROR_MESSAGES: selectCastHasErrorMessages
});

export default connect(mapStateToProps)(CreateCast)
