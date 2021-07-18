import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as CAST_ACTION from '../../../../redux/modules/cast/actions'; 
import { selectCast } from '../../../../redux/modules/cast/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const UpdateCast = ({ CAST, match }) => 
{
    const { id } = match.params; 
    const dispatch = useDispatch();
    const history = useHistory();

    const [ cast, setCast ] = useState(CAST.cast);

    const handleClickUpdateCast = () => {
        delete cast.tableData
        dispatch(CAST_ACTION.updateCastStart(cast));
    }

    const fetchCastByID = () => {
        const findCast = CAST.casts.find(cast => cast.id === parseInt(id));
        setCast(findCast);
    }

    useEffect(() => {
        fetchCastByID();
        return () => {
            setCast(CAST.cast);
        }
    }, []);

    return (
        <InputFields 
            cardHeaderTitle='Edit Cast'
            data={ cast }
            setData={ setCast }
            saveButtonCallback={ handleClickUpdateCast }
            cancelButtonCallback={ () => history.push(PATH.VIDEO_MANAGEMENT_CAST) }
            isLoading={ CAST.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    CAST: selectCast
});

export default connect(mapStateToProps)(UpdateCast)
