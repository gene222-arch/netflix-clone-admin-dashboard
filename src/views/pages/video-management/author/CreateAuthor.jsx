import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as AUTHOR_ACTION from './../../../../redux/modules/author/actions'; 
import { selectAuthor, selectAuthorErrorMessages, selectAuthorHasErrorMessages } from './../../../../redux/modules/author/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateAuthor = ({ AUTHOR, AUTHOR_ERROR_MESSAGES, AUTHOR_HAS_ERROR_MESSAGES }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ author, setAuthor ] = useState(AUTHOR.author);

    const handleClickCreateAuthor = () => {
        dispatch(AUTHOR_ACTION.createAuthorStart(author));
    }

    const handleClickCancel = () => {
        dispatch(AUTHOR_ACTION.clearAuthorErrors());
        history.push(PATH.VIDEO_MANAGEMENT_AUTHOR);
    }

    useEffect(() => {
        return () => {
            setAuthor(AUTHOR.author);
            dispatch(AUTHOR_ACTION.clearAuthorErrors());
        }
    }, []);

    return (
        <InputFields 
            data={ author }
            cardHeaderTitle='Add Author'
            setData={ setAuthor }
            saveButtonCallback={ handleClickCreateAuthor }
            cancelButtonCallback={ handleClickCancel }
            errors={ AUTHOR_HAS_ERROR_MESSAGES }
            errorMessages={ AUTHOR_ERROR_MESSAGES }
            isLoading={ AUTHOR.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTHOR: selectAuthor,
    AUTHOR_ERROR_MESSAGES: selectAuthorErrorMessages,
    AUTHOR_HAS_ERROR_MESSAGES: selectAuthorHasErrorMessages
});

export default connect(mapStateToProps)(CreateAuthor)
