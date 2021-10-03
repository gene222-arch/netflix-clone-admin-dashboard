import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as DIRECTOR_ACTION from './../../../../redux/modules/director/actions'; 
import * as DIRECTOR_API from './../../../../services/movies/director'; 
import { selectDirector, selectDirectorErrorMessages, selectDirectorHasErrorMessages } from './../../../../redux/modules/director/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateDirector = ({ DIRECTOR, DIRECTOR_ERROR_MESSAGES, DIRECTOR_HAS_ERROR_MESSAGES }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ director, setDirector ] = useState(DIRECTOR.director);
    const [ isAvatarUploading, setIsAvatarUploading ] = useState(false);
    const [ avatarPreview, setAvatarPreview ] = useState(null);
    const [ uploadErrorMessage, setUploadErrorMessage ] = useState('');

    const handleClickCreateDirector = () => {
        dispatch(DIRECTOR_ACTION.createDirectorStart(director));
    }

    const handleClickCancel = () => {
        dispatch(DIRECTOR_ACTION.clearDirectorErrors());
        history.push(PATH.VIDEO_MANAGEMENT_DIRECTOR);
    }

    const handleChangeAvatar = async (e) => 
    {
        setIsAvatarUploading(true);

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data: avatar_path, status } = await DIRECTOR_API.uploadAvatarAsync({ avatar: file });
            
            if (status === 'success') 
            {
                setDirector({ ...director, avatar_path });

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

    useEffect(() => {
        window.addEventListener('load', () => dispatch(DIRECTOR_ACTION.clearDirectorErrors()));
        return () => {
            setDirector(DIRECTOR.director);
            dispatch(DIRECTOR_ACTION.clearDirectorErrors());
            setIsAvatarUploading(false);
            setAvatarPreview(null);
            setUploadErrorMessage('');
        }
    }, []);

    return (
        <InputFields 
            data={ director }
            title='Directors'
            cardHeaderTitle='Add Director'
            setData={ setDirector }
            isAvatarUploading={ isAvatarUploading }
            avatarPreview={ avatarPreview }
            uploadErrorMessage={ uploadErrorMessage }
            handleChangeAvatar={ handleChangeAvatar }
            saveButtonCallback={ handleClickCreateDirector }
            cancelButtonCallback={ handleClickCancel }
            errors={ DIRECTOR_HAS_ERROR_MESSAGES }
            errorMessages={ DIRECTOR_ERROR_MESSAGES }
            isLoading={ DIRECTOR.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    DIRECTOR: selectDirector,
    DIRECTOR_ERROR_MESSAGES: selectDirectorErrorMessages,
    DIRECTOR_HAS_ERROR_MESSAGES: selectDirectorHasErrorMessages
});

export default connect(mapStateToProps)(CreateDirector)
