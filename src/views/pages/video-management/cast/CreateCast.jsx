import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as CAST_ACTION from './../../../../redux/modules/cast/actions'; 
import { selectCast } from './../../../../redux/modules/cast/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateCast = ({ CAST }) => 
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
        }
    }, []);

    return (
        <InputFields 
            data={ cast }
            cardHeaderTitle='Add Cast'
            setData={ setCast }
            saveButtonCallback={ handleClickCreateCast }
            cancelButtonCallback={ handleClickCancel }
            isLoading={ CAST.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    CAST: selectCast
});

export default connect(mapStateToProps)(CreateCast)
