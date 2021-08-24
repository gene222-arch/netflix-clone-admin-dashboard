import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Card, CardHeader, IconButton, Typography, Divider, CardContent, Grid, TextField } from '@material-ui/core';
import StyledReactSelect from './../styled-components/StyledReactSelect';
import COUNTRIES from './../../constants/Countries';
import LANGUAGES from './../../constants/Languages';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VideoWithPreview from './../VideoWithPreview';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createStructuredSelector } from 'reselect';
import { selectMovieErrorMessages } from '../../redux/modules/movie/selector';
import { selectMovieHasErrorMessages } from './../../redux/modules/movie/selector';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CardBackButton from './../CardBackButton';


const MovieInfoFields = ({
    movie, 
    MOVIE_ERROR_MESSAGES,
    MOVIE_HAS_ERROR_MESSAGES,
    filePreview = null, 
    isUploading = false,
    handleChange, 
    handleChangeVideoFile, 
    handleChangeReleaseDate, 
    handleSelectSingleOption 
}) => {
    
    const history = useHistory();
    const location = useLocation();

    return (
        <Card>
            <CardHeader
                title={
                    <CardBackButton 
                        actionName={ history.location.state?.actionName ?? location.actionName } 
                        title='Movies' 
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
                                            error={ MOVIE_HAS_ERROR_MESSAGES.title }
                                            helperText={ MOVIE_ERROR_MESSAGES.title }
                                            value={ movie.title }
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
                                            error={ MOVIE_HAS_ERROR_MESSAGES.plot }
                                            helperText={ MOVIE_ERROR_MESSAGES.plot }
                                            value={ movie.plot }
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
                                            error={ MOVIE_HAS_ERROR_MESSAGES.date_of_release }
                                            helperText={ MOVIE_ERROR_MESSAGES.date_of_release }
                                            value={ movie.date_of_release}
                                            onChange={ handleChangeReleaseDate }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 } lg={ 7 } md={ 7 }>
                                <VideoWithPreview
                                    inputID='video'
                                    inputName='video'
                                    filePreview={ filePreview }
                                    isUploading={ isUploading }
                                    apiSource={ movie.video_path }
                                    handleChangeVideoFile={ handleChangeVideoFile }
                                    error={ MOVIE_HAS_ERROR_MESSAGES.video_path }
                                    helperText={ MOVIE_ERROR_MESSAGES.video_path }
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
                            error={ MOVIE_HAS_ERROR_MESSAGES.duration_in_minutes }
                            helperText={ MOVIE_ERROR_MESSAGES.duration_in_minutes }
                            value={ movie.duration_in_minutes }
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
                            error={ MOVIE_HAS_ERROR_MESSAGES.age_restriction }
                            helperText={ MOVIE_ERROR_MESSAGES.age_restriction }
                            value={ movie.age_restriction }
                            onChange={ handleChange }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 6 } md={ 6 }>
                        <StyledReactSelect 
                            data={ COUNTRIES }
                            value={[ movie.country ]}
                            isMulti={ false }
                            placeholder='Select Country'
                            onChange={ selectedOption => handleSelectSingleOption(selectedOption, 'country') }
                            error={ MOVIE_HAS_ERROR_MESSAGES.country }
                            helperText={ MOVIE_ERROR_MESSAGES.country }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } lg={ 6 } md={ 6 }>
                        <StyledReactSelect 
                            data={ LANGUAGES }
                            value={[ movie.language ]}
                            isMulti={ false }
                            placeholder='Select Language'
                            onChange={ selectedOption => handleSelectSingleOption(selectedOption, 'language') }
                            error={ MOVIE_HAS_ERROR_MESSAGES.language }
                            helperText={ MOVIE_ERROR_MESSAGES.language }
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

export default connect(mapStateToProps)(MovieInfoFields)
