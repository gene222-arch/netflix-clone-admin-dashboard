import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import { Card, CardContent, Fab, FormHelperText, Button, InputLabel, Input } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Colors from './../constants/Colors';
import { MoonLoader } from 'react-spinners'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    videoIcon: {
        fontSize: 50,
        '&:hover': {
            color: Colors.tomato,
            cursor: 'pointer',
            fontSize: 52
        }
    },
    video: {
        width: '100%',
        height: '100%',
        backgroundSize: 'contain'
    },
    videoContainer: {
        height: '23.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    input: {
      display: 'none',
    },
}));

const VideoWithPreview = ({
    inputID, 
    inputName,
    apiSource = null,
    filePreview = null,
    isUploading = false,
    handleChangeVideoFile,
    error = false,
    helperText = ''
}) => {

    const classes = useStyles();

    const showVideo = () => 
    {
        return filePreview && (
            <React.Fragment key={ filePreview }>
                <video className={ classes.video } controls>
                    <source src={ filePreview } type='video/mp4'/>
                </video>
            </React.Fragment>
        )

        return apiSource && (
            <React.Fragment key={ apiSource }>
                <video className={ classes.video } controls>
                    <source src={ apiSource } type='video/mp4'/>
                </video>
            </React.Fragment>
        )
    }

    return (
        <Grid container spacing={1} justify='center' alignItems='center'>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                { showVideo() }
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <input
                    accept='video/mp4,video/x-m4v,video/*'
                    className={classes.input}
                    id={ inputID }
                    name={ inputName }
                    type='file'
                    onChange={ handleChangeVideoFile }
                />
                {
                    (!filePreview && !apiSource) && (
                        <label htmlFor={ inputID }>
                            <Card className={ classes.videoContainer }>
                                { 
                                    !isUploading 
                                        ? <CardContent>
                                            <Tooltip title='Select Video File' aria-label='select-file'>
                                                <VideocamIcon className={ classes.videoIcon } />
                                            </Tooltip>
                                        </CardContent>
                                        : <MoonLoader size={ 19 } color={ Colors.white } />
                                }
                                { error && <FormHelperText error={ error }>{ helperText }</FormHelperText> }
                            </Card>
                        </label>
                    )
                }
                {
                    (apiSource || filePreview) && (
                        <label htmlFor={ inputID }>
                            <Button 
                                variant="contained" 
                                color='primary' 
                                component="span"
                                fullWidth
                                disabled={ isUploading }
                            >
                                { !isUploading ? <VideocamIcon /> : <MoonLoader size={ 19 } color={ Colors.white } /> }
                            </Button>
                        </label>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default VideoWithPreview