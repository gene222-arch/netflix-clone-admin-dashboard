import React, { useCallback, useState, useRef, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import Colors from './../../../constants/Colors';
import Webcam from 'react-webcam'
import { uploadAvatarAsync } from './../../../services/auth/upload.avatar';
import * as FILE_UTIL from './../../../utils/file'
import CircularProgress from '@material-ui/core/CircularProgress';
import PhotoCamera from '@material-ui/icons/PhotoCamera'



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
    captureText: {
        color: Colors.info
    },
    container: {
        height: '90.5vh'
    },
    headerTitle: {
        marginBottom: '2rem'
    },
    webcam: {
        borderRadius: 10,
        width: '100%',
        height: '100%'
    },
    webcamContainer: {
        textAlign: 'center',
        width: '100%',
        height: '18.75rem',
        display: 'flex',
        alignItems: 'center'
    }
}));

const UploadByCamera = ({ handleUpload }) => 
{
    const classes = uploadByCameraUseStyles();
    const webcamRef = useRef(null);

    const [ isCapturing, setIsCapturing ] = useState(false);
    const [ isWebcamReady, setIsWebcamReady ] = useState(false);

    const handleClickCapture = useCallback(
        async () => 
        {
            setIsCapturing(true);
            const imageSrc = webcamRef.current.getScreenshot({ width: 300, height: 300 });
            const file = FILE_UTIL.base64ToFile(imageSrc, 'avatar-webcam.jpg');

            const { data } = await uploadAvatarAsync({ avatar: file });

            setIsCapturing(false);
            handleUpload(data);
        },
        [ webcamRef ]
    );

    useEffect(() => 
    {
        setTimeout(() => {
            setIsWebcamReady(true);
        }, 2500)

        return () => {
            webcamRef.current = null;
            setIsCapturing(false);
            setIsWebcamReady(false);
        }
    }, []);
    
    return (
        <Container maxWidth="md" className={ classes.container }>
            <Typography variant="h4" color="initial" className={ classes.headerTitle }>
                Click <strong className={ classes.captureText }>capture</strong>
            </Typography>
            <Grid container spacing={ 3 } justify='center'>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <div className={ classes.webcamContainer }>
                        
                        {
                            !isWebcamReady
                                ? (
                                    <Grid container spacing={1} alignItems='center'>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <PhotoCamera />
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <Typography variant="subtitle1" color="initial" align="center">
                                                Webcam starting...
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )
                                : (
                                    <Webcam
                                        audio={ false }
                                        ref={ webcamRef }
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={ videoConstraints }
                                        className={ classes.webcam }
                                    />
                                )
                        }
                    </div>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Button 
                        variant="contained" 
                        color="default" 
                        onClick={ handleClickCapture } 
                        fullWidth
                        className={ classes.btn }
                        disabled={ isCapturing }
                    >
                        {
                            isCapturing ? <CircularProgress /> : 'Capture'
                        }
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UploadByCamera