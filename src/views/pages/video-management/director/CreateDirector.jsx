import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as DIRECTOR_ACTION from './../../../../redux/modules/director/actions'; 
import { selectDirector } from './../../../../redux/modules/director/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateDirector = ({ DIRECTOR }) => 
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
        }
    }, []);

    return (
        <InputFields 
            data={ director }
            cardHeaderTitle='Add Director'
            setData={ setDirector }
            saveButtonCallback={ handleClickCreateDirector }
            cancelButtonCallback={ handleClickCancel }
            isLoading={ DIRECTOR.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    DIRECTOR: selectDirector
});

export default connect(mapStateToProps)(CreateDirector)
