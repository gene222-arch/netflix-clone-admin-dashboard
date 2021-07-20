import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as CAST_ACTION from '../../../../redux/modules/cast/actions'; 
import { selectCast, selectCastErrorMessages, selectCastHasErrorMessages } from '../../../../redux/modules/cast/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const UpdateCast = ({ CAST, match, CAST_ERROR_MESSAGES, CAST_HAS_ERROR_MESSAGES }) => 
{
    const { id } = match.params; 
    const dispatch = useDispatch();
    const history = useHistory();

    const [ cast, setCast ] = useState(CAST.cast);

    const handleClickUpdateCast = () => {
        delete cast.tableData
        dispatch(CAST_ACTION.updateCastStart(cast));
    }

    const onLoadFetchCastByID = () => {
        const findCast = CAST.casts.find(cast => cast.id === parseInt(id));
        setCast(findCast);
    }

    const handleClickCancel = () => {
        dispatch(CAST_ACTION.clearCastErrors());
        history.push(PATH.VIDEO_MANAGEMENT_CAST);
    }

    useEffect(() => {
        onLoadFetchCastByID();
        return () => {
            setCast(CAST.cast);
            dispatch(CAST_ACTION.clearCastErrors());
        }
    }, []);

    return (
        <InputFields 
            cardHeaderTitle='Edit Cast'
            data={ cast }
            setData={ setCast }
            saveButtonCallback={ handleClickUpdateCast }
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

export default connect(mapStateToProps)(UpdateCast)
