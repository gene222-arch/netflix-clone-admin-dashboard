import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Card, CardHeader, IconButton, Typography, Divider, CardContent, Grid, TextField } from '@material-ui/core';
import StyledReactSelect from '../styled-components/StyledReactSelect';
import COUNTRIES from '../../constants/Countries';
import LANGUAGES from '../../constants/Languages';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VideoWithPreview from '../VideoWithPreview';
import { createStructuredSelector } from 'reselect';
import {
    selectComingSoonMovieErrorMessages, 
    selectComingSoonMovieHasErrorMessages 
} from '../../redux/modules/coming-soon-movie/selector';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CardBackButton from './../CardBackButton';
import { selectComingSoonMovie } from './../../redux/modules/coming-soon-movie/selector';


const ComingSoonMovieInfoFields = ({ 
    cardHeaderTitle, 
    comingSoonMovie, 
    COMING_SOON_MOVIE,
    COMING_SOON_MOVIE_ERROR_MESSAGES,
    COMING_SOON_MOVIE_HAS_ERROR_MESSAGES,
    filePreview = null, 
    isUploading = false,
    handleChange, 
    handleChangeVideoTrailerFile, 
    handleChangeReleaseDate, 
    handleSelectSingleOption,
    handleSelectMultipleOptions
}) => {

    const history = useHistory();
    const location = useLocation();
    
    return (
        <Card>
            <CardHeader
                title={ 
                    <CardBackButton 
                        actionName={ history.location.state?.actionName ?? location.actionName } 
                        title={ history.location.state?.routeName ?? 'Coming Soon Movies' } 
                    /> 
                }
            />

            <Divider />
            
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <Grid container spacing={1}>
                            <Grid item xs={ 12 } sm={ 12 } lg={ 5 } md={ 5 }>
                                <Grid container spacing={1}>
                                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                                        <TextField
                                            id='title'
                                            name='title'
                                            label='Title'
                                            variant='filled'
                                            fullWidth
                                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.title }
                                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.title }
                                            value={ comingSoonMovie.title }
                                            onChange={ handleChange }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                                        <TextField
                                            id='plot'
                                            name='plot'
                                            label='Plot'
                                            variant='filled'
                                            fullWidth
                                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.plot }
                                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.plot }
                                            value={ comingSoonMovie.plot }
                                            onChange={ handleChange }
                                            multiline 
                                            rows={ 5 }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                                        <KeyboardDatePicker
                                            id='date-of-release'
                                            label='Date of Release'
                                            variant='inline'
                                            inputVariant='filled'
                                            fullWidth
                                            format='yyyy-MM-dd'
                                            disableToolbar
                                            autoOk
                                            margin='normal'
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.date_of_release }
                                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.date_of_release }
                                            value={ comingSoonMovie.date_of_release}
                                            onChange={ handleChangeReleaseDate }
                                        />
                                    </Grid>
                                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>Select Similar Movies</Typography>
                                        <StyledReactSelect 
                                            data={ COMING_SOON_MOVIE.comingSoonMovies.map(({ id, title }) => ({ value: id, label: title })) }
                                            value={ comingSoonMovie.similar_movies }
                                            isMulti
                                            placeholder='Similar Movies'
                                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'similar_movie_ids', 'similar_movies') }
                                            error={ COMING_SOON_MOVIE_ERROR_MESSAGES.similar_movies }
                                            helperText={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.similar_movies }
                                            label={ 'Select Similar Movies' }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 } lg={ 7 } md={ 7 }>
                                <VideoWithPreview
                                    inputID='video_trailer'
                                    inputName='video_trailer'
                                    filePreview={ filePreview }
                                    isUploading={ isUploading }
                                    apiSource={ comingSoonMovie.video_trailer_path }
                                    handleChangeVideoFile={ handleChangeVideoTrailerFile }
                                    error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.video_trailer_path }
                                    helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.video_trailer_path }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 6 } md={ 6 }>
                        <TextField
                            id='duration_in_minutes'
                            name='duration_in_minutes'
                            label='Duration (mins)'
                            variant='filled'
                            fullWidth
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.duration_in_minutes }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.duration_in_minutes }
                            value={ comingSoonMovie.duration_in_minutes }
                            onChange={ handleChange }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 6 } md={ 6 }>
                        <TextField
                            id='age_restriction'
                            name='age_restriction'
                            label='Age Restriction'
                            variant='filled'
                            fullWidth
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.age_restriction }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.age_restriction }
                            value={ comingSoonMovie.age_restriction }
                            onChange={ handleChange }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 6 } md={ 6 }>
                        <StyledReactSelect 
                            data={ COUNTRIES }
                            value={[ comingSoonMovie.country ]}
                            isMulti={ false }
                            placeholder='Select Country'
                            onChange={ selectedOption => handleSelectSingleOption(selectedOption, 'country') }
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.country }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.country }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 6 } md={ 6 }>
                        <StyledReactSelect 
                            data={ LANGUAGES }
                            value={[ comingSoonMovie.language ]}
                            isMulti={ false }
                            placeholder='Select Language'
                            onChange={ selectedOption => handleSelectSingleOption(selectedOption, 'language') }
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.language }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.language }
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie,
    COMING_SOON_MOVIE_ERROR_MESSAGES: selectComingSoonMovieErrorMessages,
    COMING_SOON_MOVIE_HAS_ERROR_MESSAGES: selectComingSoonMovieHasErrorMessages
});

export default connect(mapStateToProps)(ComingSoonMovieInfoFields)
