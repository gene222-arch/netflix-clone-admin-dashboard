import React,{ useEffect, useState } from 'react'
import { uploadAvatarAsync } from './../../../services/auth/upload.avatar';
import { Button, FormHelperText, makeStyles, Container, Typography } from '@material-ui/core';
import { MoonLoader } from 'react-spinners';
import Colors from './../../../constants/Colors';
import { PhotoLibrary } from '@material-ui/icons';

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
        padding: '0.5rem'
    },
    photoLibraryIcon: {
        fontSize: '6rem',
        width: '100%',
        textAlign: 'center',
        margin: '3rem 0'
    },
    startText: {
        color: Colors.info
    }
}));

const UploadAvatar = ({ handleUpload }) => 
{
    const classes = uploadAvatarUseStyles();

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

    useEffect(() => {
        return () => {
            setHasError(false);
            setErrorMessage('');
            setIsUploading(false);
        }
    }, []);

    return (
        <Container maxWidth="xs" className={ classes.container }>
            <Typography variant="h6" color="initial" align='center' className={ classes.headerTitle }>
                Click <strong className={ classes.startText }>start</strong> to begin uploading
            </Typography>
            <PhotoLibrary className={ classes.photoLibraryIcon } />
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
