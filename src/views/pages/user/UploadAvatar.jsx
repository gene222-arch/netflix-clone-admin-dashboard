import React,{ useEffect, useState } from 'react'
import { uploadAvatarAsync } from './../../../services/auth/upload.avatar';
import { Button, FormHelperText, makeStyles, Container, Typography } from '@material-ui/core';
import { MoonLoader } from 'react-spinners';
import Colors from './../../../constants/Colors';

const uploadAvatarUseStyles = makeStyles(theme => 
({
    button: {
        padding: '1rem 0',
        color: Colors.white,
        backgroundColor: Colors.netflixRed,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.netflixRed,
            fontWeight: 'bold'
        }
    },
    container: {
        height: '91.5vh'
    },
    errorText: {
        paddingLeft: '1rem'
    },
    input: {
        display: 'none',
    },
    headerTitle: {
        margin: '3rem 0 2rem'
    }
}));

const UploadAvatar = ({ handleUpload }) => 
{
    const classes = uploadAvatarUseStyles();

    const [ avatarPath, setAvatarPath ] = useState(null);
    const [ hasError, setHasError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isUploading, setIsUploading ] = useState(false);

    const handleChangePosterFile = async (e) => 
    {
        setIsUploading(true);

        let files = e.target.files || e.dataTransfer.files;

        if (! files.length) return;
        
        const file = files[0];

        try {
            const { data, status } = await uploadAvatarAsync({ avatar: file });
            
            if (status === 'success') 
            {
                setAvatarPath(data);
                setHasError(false);
                setErrorMessage('');
                handleUpload(data);
            }
        } catch ({ message }) {
            setHasError(true);
            setErrorMessage(message.avatar);
        }

        setIsUploading(false);
    }

    return (
        <Container maxWidth="xs" className={ classes.container }>
            <Typography variant="h6" color="initial" align='center' className={ classes.headerTitle }>
                Click <strong>start</strong> to begin uploading
            </Typography>
            <input
                accept='image/*'
                id='upload_image'
                name='upload_image'
                type='file'
                onChange={ handleChangePosterFile }
                className={ classes.input }
            />
                <label htmlFor='upload_image'>
                    <Button 
                        variant='contained' 
                        color='primary'
                        component='span' 
                        fullWidth
                        className={ classes.button }
                        disabled={ isUploading }
                    >
                        { 
                            !isUploading ? 'Start' : <MoonLoader size={ 19 } color={ Colors.white } />
                        }
                    </Button>
                    {
                        hasError && (
                            <FormHelperText 
                                error={ hasError } 
                                className={ classes.errorText }
                            >
                                { errorMessage }
                            </FormHelperText>
                        )
                    }
                </label>          
        </Container>
    )
}

export default UploadAvatar
