import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as DIRECTOR_ACTION from '../../../../redux/modules/director/actions'; 
import { selectDirector } from '../../../../redux/modules/director/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const UpdateDirector = ({ DIRECTOR, match }) => 
{
    const { id } = match.params; 
    const dispatch = useDispatch();
    const history = useHistory();

    const [ director, setDirector ] = useState(DIRECTOR.director);

    const handleClickUpdateDirector = () => {
        delete director.tableData
        dispatch(DIRECTOR_ACTION.updateDirectorStart(director));
    }

    const fetchDirectorByID = () => {
        const findDirector = DIRECTOR.directors.find(director => director.id === parseInt(id));
        setDirector(findDirector);
    }

    useEffect(() => {
        fetchDirectorByID();
        return () => {
            setDirector(DIRECTOR.director);
        }
    }, []);

    return (
        <InputFields 
            cardHeaderTitle='Edit Director'
            data={ director }
            setData={ setDirector }
            saveButtonCallback={ handleClickUpdateDirector }
            cancelButtonCallback={ () => history.push(PATH.VIDEO_MANAGEMENT_DIRECTOR) }
            isLoading={ DIRECTOR.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    DIRECTOR: selectDirector
});

export default connect(mapStateToProps)(UpdateDirector)
