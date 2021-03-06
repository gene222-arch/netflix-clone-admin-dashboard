import React from 'react'
import { Card, CardHeader, IconButton, Typography, Divider, CardContent, Grid, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageWithPreview from './../ImageWithPreview';
import { createStructuredSelector } from 'reselect';
import { selectMovieErrorMessages } from '../../redux/modules/movie/selector';
import { selectMovieHasErrorMessages } from './../../redux/modules/movie/selector';
import { connect } from 'react-redux';
import VideoWithPreview from './../VideoWithPreview';


const movieImagesUseStyles = makeStyles(theme => ({
    posterImg: {
        height: '40vh',
        width: '20vh'
    },
    wallpaperImg: {
        height: '40vh',
        width: '100%'
    },
    titleLogoImg: {
        height: '30vh',
        width: '100%'
    }
}));


const MovieImages = ({ movie, MOVIE_ERROR_MESSAGES, MOVIE_HAS_ERROR_MESSAGES, videoPreview, isVideoPreviewUploading, handleChangeVideoPreviewFile, handleChangePosterFile, handleChangeWallpaperFile, handleChangeTitleLogoFile, filePreviews }) => 
{
    const classes = movieImagesUseStyles();

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton aria-label=''>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Typography variant='h5'>Displays</Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <VideoWithPreview
                            label='Video Preview'
                            inputID='video_preview'
                            inputName='video_preview'
                            filePreview={ videoPreview }
                            isUploading={ isVideoPreviewUploading }
                            apiSource={ movie.video_preview_path }
                            handleChangeVideoFile={ handleChangeVideoPreviewFile }
                            error={ MOVIE_HAS_ERROR_MESSAGES.video_preview_path }
                            helperText={ MOVIE_ERROR_MESSAGES.video_preview_path }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Poster'
                            inputID='poster'
                            inputName='poster'
                            apiSource={ movie.poster_path }
                            filePreview={ filePreviews.poster }
                            imgClass={ classes.posterImg }
                            handleChangeFile={ handleChangePosterFile }
                            error={ MOVIE_HAS_ERROR_MESSAGES.poster_path }
                            helperText={ MOVIE_ERROR_MESSAGES.poster_path }
                            isUploading={ filePreviews.isPosterUploading }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Wallpaper'
                            inputID='wallpaper'
                            inputName='wallpaper'
                            apiSource={ movie.wallpaper_path }
                            filePreview={ filePreviews.wallpaper }
                            imgClass={ classes.wallpaperImg }
                            handleChangeFile={ handleChangeWallpaperFile }
                            error={ MOVIE_HAS_ERROR_MESSAGES.wallpaper_path }
                            helperText={ MOVIE_ERROR_MESSAGES.wallpaper_path }
                            isUploading={ filePreviews.isWallpaperUploading }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Title Logo'
                            inputID='title_logo'
                            inputName='title_logo'
                            apiSource={ movie.title_logo_path }
                            filePreview={ filePreviews.title_logo }
                            imgClass={ classes.titleLogoImg }
                            handleChangeFile={ handleChangeTitleLogoFile }
                            error={ MOVIE_HAS_ERROR_MESSAGES.title_logo_path }
                            helperText={ MOVIE_ERROR_MESSAGES.title_logo_path }
                            isUploading={ filePreviews.isTitleLogoUploading }
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = createStructuredSelector({
    MOVIE_ERROR_MESSAGES: selectMovieErrorMessages,
    MOVIE_HAS_ERROR_MESSAGES: selectMovieHasErrorMessages
});

export default connect(mapStateToProps)(MovieImages)
