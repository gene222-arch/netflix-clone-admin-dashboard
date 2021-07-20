import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as AUTHOR_ACTION from '../../../../redux/modules/author/actions'; 
import { selectAuthor, selectAuthorErrorMessages, selectAuthorHasErrorMessages } from '../../../../redux/modules/author/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const UpdateAuthor = ({ AUTHOR, match, AUTHOR_ERROR_MESSAGES, AUTHOR_HAS_ERROR_MESSAGES }) => 
{
    const { id } = match.params; 
    const dispatch = useDispatch();
    const history = useHistory();

    const [ author, setAuthor ] = useState(AUTHOR.author);

    const handleClickUpdateAuthor = () => {
        delete author.tableData
        dispatch(AUTHOR_ACTION.updateAuthorStart(author));
    }

    const onLoadFetchAuthorByID = () => {
        const findAuthor = AUTHOR.authors.find(author => author.id === parseInt(id));
        setAuthor(findAuthor);
    }

    const handleClickCancel = () => {
        dispatch(AUTHOR_ACTION.clearAuthorErrors());
        history.push(PATH.VIDEO_MANAGEMENT_AUTHOR);
    }

    useEffect(() => {
        onLoadFetchAuthorByID();
        return () => {
            setAuthor(AUTHOR.author);
            dispatch(AUTHOR_ACTION.clearAuthorErrors());
        }
    }, []);

    return (
        <InputFields 
            cardHeaderTitle='Edit Author'
            data={ author }
            setData={ setAuthor }
            saveButtonCallback={ handleClickUpdateAuthor }
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

export default connect(mapStateToProps)(UpdateAuthor)
