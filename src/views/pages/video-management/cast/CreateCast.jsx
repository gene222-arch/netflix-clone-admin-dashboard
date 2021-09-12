import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as CAST_ACTION from './../../../../redux/modules/cast/actions'; 
import * as CAST_API from './../../../../services/movies/cast'; 
import { selectCast, selectCastErrorMessages, selectCastHasErrorMessages } from './../../../../redux/modules/cast/selector';
import InputFields from '../../../../components/InputFields';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';


const CreateCast = ({ CAST, CAST_ERROR_MESSAGES, CAST_HAS_ERROR_MESSAGES }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ cast, setCast ] = useState(CAST.cast);
    const [ isAvatarUploading, setIsAvatarUploading ] = useState(false);
    const [ avatarPreview, setAvatarPreview ] = useState(null);
    const [ uploadErrorMessage, setUploadErrorMessage ] = useState('');

    const handleClickCreateCast = () => {
        dispatch(CAST_ACTION.createCastStart(cast));
    }

    const handleClickCancel = () => {
        dispatch(CAST_ACTION.clearCastErrors());
        history.push(PATH.VIDEO_MANAGEMENT_CAST);
    }


    const handleChangeAvatar = async (e) => 
    {
        setIsAvatarUploading(true);

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data: avatar_path, status } = await CAST_API.uploadAvatarAsync({ avatar: file });
            
            if (status === 'success') 
            {
                setCast({ ...cast, avatar_path });

                reader.onload = (e) => setAvatarPreview(e.target.result);
                reader.readAsDataURL(file);
            }
        } catch ({ message }) {
            setUploadErrorMessage(message.avatar);
        }

        setIsAvatarUploading(false);
        e.target.value = null;
    }

    useEffect(() => {
        return () => {
            setCast(CAST.cast);
            dispatch(CAST_ACTION.clearCastErrors());
            setIsAvatarUploading(false);
            setAvatarPreview(null);
            setUploadErrorMessage('');
        }
    }, []);

    return (
        <InputFields 
            data={ cast }
            cardHeaderTitle='Add Cast'
            setData={ setCast }
            isAvatarUploading={ isAvatarUploading }
            avatarPreview={ avatarPreview }
            uploadErrorMessage={ uploadErrorMessage }
            handleChangeAvatar={ handleChangeAvatar }
            saveButtonCallback={ handleClickCreateCast }
            cancelButtonCallback={ handleClickCancel }
            errors={ CAST_HAS_ERROR_MESSAGES }
            errorMessages={ CAST_ERROR_MESSAGES }
            isLoading={ CAST.isLoading }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    CAST: selectCast,
    CAST_ERROR_MESSAGES: selectCastErrorMessages,
    CAST_HAS_ERROR_MESSAGES: selectCastHasErrorMessages
});

export default connect(mapStateToProps)(CreateCast)
