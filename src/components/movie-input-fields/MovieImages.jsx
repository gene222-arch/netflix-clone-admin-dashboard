import React from 'react'
import { Card, CardHeader, IconButton, Typography, Divider, CardContent, Grid } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageWithPreview from './../ImageWithPreview';
import { createStructuredSelector } from 'reselect';
import { selectMovieErrorMessages } from '../../redux/modules/movie/selector';
import { selectMovieHasErrorMessages } from './../../redux/modules/movie/selector';
import { connect } from 'react-redux';


const MovieImages = ({ movie, MOVIE_ERROR_MESSAGES, MOVIE_HAS_ERROR_MESSAGES, handleChangePosterFile, handleChangeWallpaperFile, handleChangeTitleLogoFile, filePreviews }) => {
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
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Poster'
                            inputID='poster'
                            inputName='poster'
                            apiSource={ movie.poster_path }
                            filePreview={ filePreviews.poster }
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
