import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VideoWithPreview from './VideoWithPreview';
import * as MOVIE_API from './../services/movies/movie'
import * as MOVIE_ACTION from './../redux/modules/movie/actions'
import * as COMING_SOON_MOVIE_ACTION from './../redux/modules/coming-soon-movie/actions'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import Colors from './../constants/Colors';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade';
import { selectComingSoonMovieHasErrorMessages, selectComingSoonMovieErrorMessages, selectComingSoonMovie } from '../redux/modules/coming-soon-movie/selector';

const Transition = React.forwardRef((props, ref) => <Fade in ref={ref} {...props} />);

const videoPreviewDialogUseStyles = makeStyles(theme => ({
    container: {
        width: '100%',
    },
    saveBtn: {
        backgroundColor: Colors.white
    }
}))


const VideoPreviewDialog = ({ COMING_SOON_MOVIE, open, setOpen, data, setData, onSave, onCancel, COMING_SOON_MOVIE_HAS_ERROR_MESSAGE, COMING_SOON_MOVIE_ERROR_MESSAGE }) => 
{
    const classes = videoPreviewDialogUseStyles();
    const dispatch = useDispatch();

    const [ filePreview, setFilePreview ] = useState(null);
    const [ isUploading, setIsUploading ] = useState(false);

    const handleClickCancel = () => {
        onCancel();
        setFilePreview(null);
        dispatch(COMING_SOON_MOVIE_ACTION.clearComingSoonMovieErrors());
    }

    const handleChangeVideoFile = async (e) => 
    {
        setIsUploading(true);

        let files = e.target.files || e.dataTransfer.files;

        if (! files.length) return;
        
        const file = files[0];
        const video_size_in_mb = file.size / 1000;
        const reader = new FileReader();

        try {
            const { data: path, status } = await MOVIE_API.uploadVideoAsync({ video: file });

            if (status === 'success') 
            {
                setData({ ...data, video_path: path, video_size_in_mb, duration_in_minutes: 1 });

                reader.onload = (e) => setFilePreview(e.target.result);
    
                reader.readAsDataURL(file);

                dispatch(MOVIE_ACTION.updateMovieErrorState({ video_path: '' }));
            }
            
        } catch ({ message }) {
            dispatch(MOVIE_ACTION.updateMovieErrorState({  video_path: message.video }));
        }

        setIsUploading(false);
        e.target.value = null;
    }

    const handleClickToggle = () => setOpen(! open);

    useEffect(() => 
    {
        return () => {
            setFilePreview(null);
            setIsUploading(false);
            dispatch(COMING_SOON_MOVIE_ACTION.clearComingSoonMovieErrors());
        }
    }, []);

    return (
        <Container maxWidth="xl">
            <Dialog 
                fullScreen
                open={ open } 
                onClose={ handleClickToggle }
                className={ classes.container }
                TransitionComponent={ Transition }
            >
                <DialogTitle>Upcoming Movie Release</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Upload a video for the movie to be release.
                    </DialogContentText>
                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <VideoWithPreview 
                                inputID='video'
                                inputName='video'
                                filePreview={ filePreview }
                                isUploading={ isUploading }
                                handleChangeVideoFile={ handleChangeVideoFile }
                                error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGE.video_path }
                                helperText={ COMING_SOON_MOVIE_ERROR_MESSAGE.video_path }
                                label='Upload Movie Video File'
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <TextField
                                label='Duration in minutes'
                                fullWidth
                                variant="outlined"
                                value={ data.duration_in_minutes }
                                onChange={ (e) => setData({ ...data, duration_in_minutes: e.target.value }) }
                                type='number'
                                error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGE.duration_in_minutes }
                                helperText={ COMING_SOON_MOVIE_ERROR_MESSAGE.duration_in_minutes }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button 
                        variant="contained" 
                        className={ classes.saveBtn } 
                        onClick={ onSave }
                        disabled={ COMING_SOON_MOVIE.isLoading || !data.video_path || !data.duration_in_minutes }
                    >
                        Save
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="default" 
                        onClick={ handleClickCancel }
                        disabled={ COMING_SOON_MOVIE.isLoading || !data.video_path || !data.duration_in_minutes}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie,
    COMING_SOON_MOVIE_HAS_ERROR_MESSAGE: selectComingSoonMovieHasErrorMessages,
    COMING_SOON_MOVIE_ERROR_MESSAGE: selectComingSoonMovieErrorMessages
});

export default connect(mapStateToProps)(VideoPreviewDialog)
