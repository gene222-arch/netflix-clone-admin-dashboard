import React, { useCallback, useRef, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import Colors from './../../../constants/Colors';
import Webcam from 'react-webcam'
import { uploadAvatarAsync } from './../../../services/auth/upload.avatar';
import * as FILE_UTIL from './../../../utils/file'

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};
  
const uploadByCameraUseStyles = makeStyles(theme => ({
    btn: {
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
        height: '90.5vh'
    },
    webcam: {
        borderRadius: 10
    },
    webcamContainer: {
        textAlign: 'center'
    },
}));

const UploadByCamera = ({ handleUpload }) => 
{
    const classes = uploadByCameraUseStyles();
    const webcamRef = useRef(null);

    const handleClickCapture = useCallback(
        async () => 
        {
            const imageSrc = webcamRef.current.getScreenshot();
            const file = FILE_UTIL.base64ToFile(imageSrc, 'avatar-cam.jpg');

            const { data } = await uploadAvatarAsync({ avatar: file });

            handleUpload(data);
        },
        [ webcamRef ]
    );

    useEffect(() => {
        return () => {
            webcamRef.current = null;
        }
    }, []);
    
    return (
        <Container maxWidth="md" className={ classes.container }>
            <Typography variant="h4" color="initial">Click <strong>capture</strong></Typography>
            <Grid container spacing={1} justify='center'>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <div className={ classes.webcamContainer }>
                        <Webcam
                            audio={ false }
                            height={ 500 }
                            ref={ webcamRef }
                            screenshotFormat="image/jpeg"
                            width={ 780 }
                            videoConstraints={ videoConstraints }
                            className={ classes.webcam }
                        />
                    </div>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Button 
                        variant="contained" 
                        color="default" 
                        onClick={ handleClickCapture } 
                        fullWidth
                        className={ classes.btn }
                    >
                        Capture
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UploadByCamera