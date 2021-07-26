import React, { useState, useEffect } from 'react'
import { Card, CardHeader, Divider, CardContent, Grid, CardActions, TextField } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectComingSoonMovie } from './../redux/modules/coming-soon-movie/selector';
import * as COMING_SOON_MOVIE_ACTION from './../redux/modules/coming-soon-movie/actions';
import * as COMING_SOON_MOVIE_API from './../services/movies/coming.soon.movie'
import { connect, useDispatch } from 'react-redux';
import { selectTrailerErrorMessages, selectTrailerHasErrorMessages } from './../redux/modules/coming-soon-movie/selector';
import VideoWithPreview from './VideoWithPreview';
import { useHistory } from 'react-router-dom';
import SaveCancelButtons from './SaveCancelButtons';
import ImageWithPreview from './ImageWithPreview';
import CardBackButton from './CardBackButton';

const DEFAULT_FILE_PREVIEW_PROPS = {
    poster: null,
    isPosterUploading: false,
    wallpaper: null,
    isWallpaperUploading: false,
    title_logo: null,
    isTitleLogoUploading: false,
    video: null,
    isVideoUploading: false
};

const TrailerInputFields = ({ id, trailer, setTrailer, COMING_SOON_MOVIE, handleClickSave, TRAILER_ERROR_MESSAGES, TRAILER_HAS_ERROR_MESSAGES }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ filePreviews, setFilePreviews ] = useState(DEFAULT_FILE_PREVIEW_PROPS);

    const handleChangeVideoFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isVideoUploading: true });

        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await COMING_SOON_MOVIE_API.uploadTrailerVideoAsync({ video: file, coming_soon_movie_id: id });

            if (status === 'success') 
            {
                setTrailer({ ...trailer, video_path: data });

                reader.onload = (e) => setFilePreviews({ ...filePreviews, video: e.target.result });
    
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({ 
                    video_path: ''
                }));
            }
            
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({ video_path: message.video }));
        }

        setFilePreviews({ ...filePreviews, isVideoUploading: false });

        e.target.value = null;
    }

    const handleChangePosterFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isPosterUploading: true });

        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await COMING_SOON_MOVIE_API.uploadTrailerPosterAsync({ poster: file, coming_soon_movie_id: id });
            
            if (status === 'success') 
            {
                setTrailer({ ...trailer, poster_path: data });

                reader.onload = (e) => setFilePreviews({ ...filePreviews, poster: e.target.result });
        
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({ poster_path: '' }));
            }
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({ poster_path: message.poster }));
        }

        setFilePreviews({ ...filePreviews, isPosterUploading: false });
        e.target.value = null;
    }

    const handleChangeWallpaperFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isWallpaperUploading: true });

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await COMING_SOON_MOVIE_API.uploadWallpaperAsync({ wallpaper: file, coming_soon_movie_id: id });

            if (status === 'success') 
            {
                setTrailer({ ...trailer, wallpaper_path: data });

                reader.onload = (e) => setFilePreviews({ ...filePreviews, wallpaper: e.target.result });
        
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({ 
                    wallpaper_path: '' 
                }));
            }
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({  wallpaper_path: message.wallpaper }));
        }

        setFilePreviews({ ...filePreviews, isWallpaperUploading: false });

        e.target.value = null;
    }

    const handleChangeTitleLogoFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isTitleLogoUploading: true });

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await COMING_SOON_MOVIE_API.uploadTitleLogoAsync({ title_logo: file, coming_soon_movie_id: id });

            if (status === 'success') 
            {
                setTrailer({ ...trailer, title_logo_path: data });

                reader.onload = (e) => setFilePreviews({ ...filePreviews, title_logo: e.target.result });
        
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({ title_logo_path: '' }));
            }
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateTrailerErrorState({ 
                title_logo_path: message.title_logo
            }));
        }

        setFilePreviews({ ...filePreviews, isTitleLogoUploading: false });
        e.target.value = null;
    }

    const handleClickCancel = () => history.goBack();

    useEffect(() => {
        return () => {
            setFilePreviews(DEFAULT_FILE_PREVIEW_PROPS);
        }
    }, []);

    return (
        <Card>
            <CardHeader
                title={
                    <CardBackButton title={ trailer?.title ?? ''  } />
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                    <TextField
                        id="title"
                        label="Title"
                        value={ trailer?.title ?? '' }
                        onChange={ (e) => setTrailer({ ...trailer, title: e.target.value }) }
                        variant='filled'
                        fullWidth
                        error={ TRAILER_HAS_ERROR_MESSAGES?.title }
                        helperText={ TRAILER_ERROR_MESSAGES?.title }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                    <VideoWithPreview
                        inputID='video'
                        inputName='video'
                        filePreview={ filePreviews.video }
                        isUploading={ filePreviews.isVideoUploading }
                        apiSource={ trailer.video_path }
                        handleChangeVideoFile={ handleChangeVideoFile }
                        error={ TRAILER_HAS_ERROR_MESSAGES?.video_path }
                        helperText={ TRAILER_ERROR_MESSAGES?.video_path }
                    />
                </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Poster'
                            inputID='poster'
                            inputName='poster'
                            apiSource={ trailer.poster_path }
                            filePreview={ filePreviews.poster }
                            handleChangeFile={ handleChangePosterFile }
                            error={ TRAILER_HAS_ERROR_MESSAGES?.poster_path }
                            helperText={ TRAILER_ERROR_MESSAGES?.poster_path }
                            isUploading={ filePreviews.isPosterUploading }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Wallpaper'
                            inputID='wallpaper'
                            inputName='wallpaper'
                            apiSource={ trailer.wallpaper_path }
                            filePreview={ filePreviews.wallpaper }
                            handleChangeFile={ handleChangeWallpaperFile }
                            error={ TRAILER_HAS_ERROR_MESSAGES?.wallpaper_path }
                            helperText={ TRAILER_ERROR_MESSAGES?.wallpaper_path }
                            isUploading={ filePreviews.isWallpaperUploading }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Title Logo'
                            inputID='title_logo'
                            inputName='title_logo'
                            apiSource={ trailer.title_logo_path }
                            filePreview={ filePreviews.title_logo }
                            handleChangeFile={ handleChangeTitleLogoFile }
                            error={ TRAILER_HAS_ERROR_MESSAGES?.title_logo_path }
                            helperText={ TRAILER_ERROR_MESSAGES?.title_logo_path }
                            isUploading={ filePreviews.isTitleLogoUploading }
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <SaveCancelButtons 
                    saveButtonCallback={ handleClickSave }
                    cancelButtonCallback={ handleClickCancel }
                    isLoading={ COMING_SOON_MOVIE.isLoading }
                />
            </CardActions>
        </Card>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie,
    TRAILER_ERROR_MESSAGES: selectTrailerErrorMessages,
    TRAILER_HAS_ERROR_MESSAGES: selectTrailerHasErrorMessages
});

export default connect(mapStateToProps)(TrailerInputFields)
