import React from 'react'
import { Card, CardHeader, CardActions, IconButton, Typography, Divider, CardContent, Grid, Switch, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectComingSoonMovie, selectComingSoonMovieErrorMessages, selectComingSoonMovieHasErrorMessages } from './../../redux/modules/coming-soon-movie/selector';
import { selectAuthorNames } from '../../redux/modules/author/selector';
import { selectCastNames } from '../../redux/modules/cast/selector';
import { selectDirectorNames } from '../../redux/modules/director/selector';
import { selectGenreNames } from '../../redux/modules/genre/selector';
import { createStructuredSelector } from 'reselect';
import StyledReactSelect from './../styled-components/StyledReactSelect';
import SaveCancelButtons from './../SaveCancelButtons';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const HumanResourceFields = ({ 
    COMING_SOON_MOVIE, 
    AUTHOR_NAMES, 
    CAST_NAMES, 
    DIRECTOR_NAMES, 
    GENRE_NAMES, 
    COMING_SOON_MOVIE_ERROR_MESSAGES, 
    COMING_SOON_MOVIE_HAS_ERROR_MESSAGES, 
    comingSoonMovie, 
    handleSelectMultipleOptions, 
    handleChange,
    saveButtonCallback, 
    handleClickCancel }) => 
{
    return (
        <Card>
            <CardHeader
                action={
                    <IconButton aria-label=''>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Typography variant='h5'>Human Resources</Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <StyledReactSelect
                            data={ AUTHOR_NAMES }
                            value={ comingSoonMovie.authors }
                            isMulti={ true }
                            placeholder='Select Authors'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'author_ids', 'authors')}
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.authors }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.authors }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <StyledReactSelect 
                            data={ CAST_NAMES }
                            value={ comingSoonMovie.casts }
                            isMulti={ true }
                            placeholder='Select Casts'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'cast_ids', 'casts')}
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.casts }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.casts }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <StyledReactSelect 
                            data={ DIRECTOR_NAMES }
                            value={ comingSoonMovie.directors }
                            isMulti={ true }
                            placeholder='Select Directors'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'director_ids', 'directors')}
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.directors }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.directors }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <StyledReactSelect 
                            data={ GENRE_NAMES }
                            value={ comingSoonMovie.genres }
                            isMulti={ true }
                            placeholder='Select Genres'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'genre_ids', 'genres')}
                            error={ COMING_SOON_MOVIE_HAS_ERROR_MESSAGES.genres }
                            helperText={ COMING_SOON_MOVIE_ERROR_MESSAGES.genres }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <FormControlLabel
                            label='Release'
                            control={
                                <Switch
                                    name='status'
                                    value={ comingSoonMovie.status }
                                    checked={ comingSoonMovie.status === 'Released' }
                                    onChange={ handleChange }
                                    disabled
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <SaveCancelButtons 
                    saveButtonCallback={ saveButtonCallback }
                    cancelButtonCallback={ handleClickCancel }
                    isLoading={ COMING_SOON_MOVIE.isLoading }
                />
            </CardActions>
        </Card>

    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie,
    AUTHOR_NAMES: selectAuthorNames,
    CAST_NAMES: selectCastNames,
    DIRECTOR_NAMES: selectDirectorNames,
    GENRE_NAMES: selectGenreNames,
    COMING_SOON_MOVIE_ERROR_MESSAGES: selectComingSoonMovieErrorMessages,
    COMING_SOON_MOVIE_HAS_ERROR_MESSAGES: selectComingSoonMovieHasErrorMessages
});

export default connect(mapStateToProps)(HumanResourceFields)
