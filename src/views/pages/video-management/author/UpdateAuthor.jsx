import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as AUTHOR_ACTION from '../../../../redux/modules/author/actions'; 
import * as AUTHOR_API from './../../../../services/movies/author'; 
import { selectAuthor, selectAuthorErrorMessages, selectAuthorHasErrorMessages } from '../../../../redux/modules/author/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';
import DataNotFound from './../../../../components/not-found-components/DataNotFound';
import { PersonAddDisabled } from '@material-ui/icons';


const UpdateAuthor = ({ AUTHOR, match, AUTHOR_ERROR_MESSAGES, AUTHOR_HAS_ERROR_MESSAGES }) => 
{
    const { id } = match.params; 
    const dispatch = useDispatch();
    const history = useHistory();

    const [ author, setAuthor ] = useState(AUTHOR.author);
    const [ isAvatarUploading, setIsAvatarUploading ] = useState(false);
    const [ avatarPreview, setAvatarPreview ] = useState(null);
    const [ uploadErrorMessage, setUploadErrorMessage ] = useState('');
    const [ isAuthorFound, setIsAuthorFound ] = useState(true);

    const handleClickUpdateAuthor = () => {
        delete author.tableData
        dispatch(AUTHOR_ACTION.updateAuthorStart(author));
    }

    const onLoadFetchAuthorByID = () => 
    {
        const findAuthor = AUTHOR.authors.find(author => author.id === parseInt(id));

        if (! findAuthor) {
            setIsAuthorFound(false);
        }

        if (findAuthor) {
            setIsAuthorFound(true);
            setAuthor(findAuthor);
        }
    }

    const handleClickCancel = () => {
        dispatch(AUTHOR_ACTION.clearAuthorErrors());
        history.push(PATH.VIDEO_MANAGEMENT_AUTHOR);
    }

    const handleChangeAvatar = async (e) => 
    {
        setIsAvatarUploading(true);

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data: avatar_path, status } = await AUTHOR_API.uploadAvatarAsync({ avatar: file });
            
            if (status === 'success') 
            {
                setAuthor({ ...author, avatar_path });

                reader.onload = (e) => setAvatarPreview(e.target.result);
                reader.readAsDataURL(file);
                setUploadErrorMessage('');
            }
        } catch ({ message }) {
            setUploadErrorMessage(message.avatar);
        }

        setIsAvatarUploading(false);
        e.target.value = null;
    }

    useEffect(() => 
    {
        dispatch(AUTHOR_ACTION.fetchAllAuthorsStart());
        onLoadFetchAuthorByID();
        window.addEventListener('load', () => dispatch(AUTHOR_ACTION.clearAuthorErrors()));
        return () => {
            setAuthor(AUTHOR.author);
            dispatch(AUTHOR_ACTION.clearAuthorErrors());
            setIsAvatarUploading(false);
            setAvatarPreview(null);
            setUploadErrorMessage('');
            setIsAuthorFound(false);
        }
    }, []);

    if (! isAuthorFound) 
    {
        return (
            <DataNotFound 
                type='Author' 
                Icon={ PersonAddDisabled } 
                handleClickRefresh={ onLoadFetchAuthorByID } 
            />
        )
    }

    return (
        <InputFields 
            cardHeaderTitle='Edit Author'
            data={ author }
            setData={ setAuthor }
            isAvatarUploading={ isAvatarUploading }
            avatarPreview={ avatarPreview }
            uploadErrorMessage={ uploadErrorMessage }
            handleChangeAvatar={ handleChangeAvatar }
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
