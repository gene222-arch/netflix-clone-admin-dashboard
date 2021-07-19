import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as AUTHOR_ACTION from '../../../../redux/modules/author/actions'; 
import { selectAuthor } from '../../../../redux/modules/author/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const UpdateAuthor = ({ AUTHOR, match }) => 
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

    useEffect(() => {
        onLoadFetchAuthorByID();
        return () => {
            setAuthor(AUTHOR.author);
        }
    }, []);

    return (
        <InputFields 
            cardHeaderTitle='Edit Author'
            data={ author }
            setData={ setAuthor }
            saveButtonCallback={ handleClickUpdateAuthor }
            cancelButtonCallback={ () => history.push(PATH.VIDEO_MANAGEMENT_AUTHOR) }
            isLoading={ AUTHOR.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTHOR: selectAuthor
});

export default connect(mapStateToProps)(UpdateAuthor)
