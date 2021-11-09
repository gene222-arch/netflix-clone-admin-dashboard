import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import ImageWithPreview from './../../../../components/ImageWithPreview';
import { uploadAvatarAsync } from './../../../../services/auth/upload.avatar';
import { makeStyles } from '@material-ui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import PATH from './../../../../routes/path';
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core';
import AuthLayoutHeader from './../../../../components/app/AuthLayoutHeader';
import Colors from './../../../../constants/Colors';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

const uploadAvatarUseStyles = makeStyles(theme => ({
    avatar: {
        height: '50vh',
        width: '100%',
        textAlign: 'center'
    },
    avatarImg: {
        height: '50vh',
        width: '100%',
        marginBottom: '1rem'
    },
    btn: {
        backgroundColor: Colors.white,
        color: Colors.darkGrey,
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#FFF'
        }
    },
    subContainer: {
        marginTop: '1rem'
    }
}));

const UploadAvatar = () => 
{
    const classes = uploadAvatarUseStyles();
    const history = useHistory();
    const { state } = useLocation();

    const [ isUploading, setIsUploading ] = useState(false);
    const [ avatarPreview, setAvatarPreview ] = useState(null);
    const [ avatarPath, setAvatarPath ] = useState(null);
    const [ hasError, setHasError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleChangePosterFile = async (e) => 
    {
        setIsUploading(true);

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await uploadAvatarAsync({ avatar: file });
            
            if (status === 'success') 
            {
                setAvatarPath(data);

                reader.onload = (e) => setAvatarPreview(e.target.result);
        
                reader.readAsDataURL(file);

                setHasError(false);
                setErrorMessage('');
            }
        } catch ({ message }) {
            setHasError(true);
            setErrorMessage(message.avatar);
        }

        setIsUploading(false);
        e.target.value = null;
    }

    const handleClickContinue = () => {
        history.push(PATH.SELECT_PLAN, {
            ...state,
            avatar_path: avatarPath,
            allow_access_to_location: true
        });
    }

    useEffect(() => {
        return () => {
            setIsUploading(false);
            setAvatarPreview(null);
            setAvatarPath('');
            setHasError(false);
            setErrorMessage('');
        }
    }, []);

    return (
        <Container maxWidth="xl">
            <Container maxWidth="md" className={ classes.subContainer }>
                <Grid container spacing={2} alignItems='center' justify='flex-end'>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant="subtitle2">Step 2 of 4</Typography>
                    </Grid>
                    {
                        !avatarPreview && (
                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                <PersonIcon className={ classes.avatar } />
                            </Grid>
                        )
                    }
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <ImageWithPreview
                            name='Avatar'
                            inputID='avatar_preview'
                            inputName='avatar_preview'
                            apiSource={ avatarPath }
                            filePreview={ avatarPreview }
                            imgClass={ classes.avatarImg }
                            handleChangeFile={ handleChangePosterFile }
                            error={ hasError }
                            helperText={ errorMessage }
                            isUploading={ isUploading }
                        />
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="default"
                            className={ classes.btn } 
                            onClick={ handleClickContinue }
                            disabled={ isUploading || hasError || !avatarPath }
                        >
                            Continue
                        </Button>
                    </Grid>
                </Grid>
            </Container>
</Container>
    )
}

export default UploadAvatar
