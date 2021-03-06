import React from 'react'
import { Card, CardHeader, IconButton, Typography, Divider, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageWithPreview from '../ImageWithPreview';
import { createStructuredSelector } from 'reselect';
import { selectComingSoonMovieErrorMessages } from '../../redux/modules/coming-soon-movie/selector';
import { selectComingSoonMovieHasErrorMessages } from '../../redux/modules/coming-soon-movie/selector';
import { connect } from 'react-redux';

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


const ComingSoonMovieImages = ({ comingSoonMovie, MOVIE_ERROR_MESSAGES, MOVIE_HAS_ERROR_MESSAGES, handleChangePosterFile, handleChangeWallpaperFile, handleChangeTitleLogoFile, filePreviews }) => 
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
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <ImageWithPreview 
                            name='Poster'
                            inputID='poster'
                            inputName='poster'
                            apiSource={ comingSoonMovie.poster_path }
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
                            apiSource={ comingSoonMovie.wallpaper_path }
                            filePreview={ filePreviews.wallpaper }
                            imgClass={ classes.posterImg }
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
                            apiSource={ comingSoonMovie.title_logo_path }
                            filePreview={ filePreviews.title_logo }
                            imgClass={ classes.posterImg }
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
    MOVIE_ERROR_MESSAGES: selectComingSoonMovieErrorMessages,
    MOVIE_HAS_ERROR_MESSAGES: selectComingSoonMovieHasErrorMessages
});

export default connect(mapStateToProps)(ComingSoonMovieImages)
