import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as AUTHOR_ACTION from './../../../../redux/modules/author/actions'; 
import { selectAuthor } from './../../../../redux/modules/author/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateAuthor = ({ AUTHOR }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ author, setAuthor ] = useState(AUTHOR.author);

    const handleClickCreateAuthor = () => {
        dispatch(AUTHOR_ACTION.createAuthorStart(author));
    }

    useEffect(() => {
        return () => {
            setAuthor(AUTHOR.author);
        }
    }, []);

    return (
        <InputFields 
            data={ author }
            cardHeaderTitle='Add Author'
            setData={ setAuthor }
            saveButtonCallback={ handleClickCreateAuthor }
            cancelButtonCallback={ () => history.push(PATH.VIDEO_MANAGEMENT_AUTHOR) }
            isLoading={ AUTHOR.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTHOR: selectAuthor
});

export default connect(mapStateToProps)(CreateAuthor)
