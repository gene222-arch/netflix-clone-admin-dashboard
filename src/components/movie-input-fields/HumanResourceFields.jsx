import React from 'react'
import { Card, CardHeader, CardActions, IconButton, Typography, Divider, CardContent, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectMovie, selectMovieErrorMessages, selectMovieHasErrorMessages } from './../../redux/modules/movie/selector';
import { selectAuthorNames } from '../../redux/modules/author/selector';
import { selectCastNames } from '../../redux/modules/cast/selector';
import { selectDirectorNames } from '../../redux/modules/director/selector';
import { selectGenreNames } from '../../redux/modules/genre/selector';
import { createStructuredSelector } from 'reselect';
import StyledReactSelect from './../styled-components/StyledReactSelect';
import SaveCancelButtons from './../SaveCancelButtons';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const HumanResourceFields = ({ movie, MOVIE, AUTHOR_NAMES, CAST_NAMES, DIRECTOR_NAMES, GENRE_NAMES, MOVIE_ERROR_MESSAGES, MOVIE_HAS_ERROR_MESSAGES, handleSelectMultipleOptions, saveButtonCallback, handleClickCancel }) => {
    
    console.log(movie.defaultGenres)
    
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
                            value={ movie.authors }
                            isMulti={ true }
                            placeholder='Select Authors'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'author_ids', 'authors')}
                            error={ MOVIE_HAS_ERROR_MESSAGES.authors }
                            helperText={ MOVIE_ERROR_MESSAGES.authors }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <StyledReactSelect 
                            data={ CAST_NAMES }
                            value={ movie.casts }
                            isMulti={ true }
                            placeholder='Select Casts'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'cast_ids', 'casts')}
                            error={ MOVIE_HAS_ERROR_MESSAGES.casts }
                            helperText={ MOVIE_ERROR_MESSAGES.casts }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <StyledReactSelect 
                            data={ DIRECTOR_NAMES }
                            value={ movie.directors }
                            isMulti={ true }
                            placeholder='Select Directors'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'director_ids', 'directors')}
                            error={ MOVIE_HAS_ERROR_MESSAGES.directors }
                            helperText={ MOVIE_ERROR_MESSAGES.directors }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } lg={ 12 } md={ 12 }>
                        <StyledReactSelect 
                            data={ GENRE_NAMES }
                            value={ movie.genres }
                            isMulti={ true }
                            placeholder='Select Genres'
                            onChange={ selectedOptions => handleSelectMultipleOptions(selectedOptions, 'genre_ids', 'genres')}
                            error={ MOVIE_HAS_ERROR_MESSAGES.genres }
                            helperText={ MOVIE_ERROR_MESSAGES.genres }
                        />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <SaveCancelButtons 
                    saveButtonCallback={ saveButtonCallback }
                    cancelButtonCallback={ handleClickCancel }
                    isLoading={ MOVIE.isLoading }
                />
            </CardActions>
        </Card>

    )
}

const mapStateToProps = createStructuredSelector({
    MOVIE: selectMovie,
    AUTHOR_NAMES: selectAuthorNames,
    CAST_NAMES: selectCastNames,
    DIRECTOR_NAMES: selectDirectorNames,
    GENRE_NAMES: selectGenreNames,
    MOVIE_ERROR_MESSAGES: selectMovieErrorMessages,
    MOVIE_HAS_ERROR_MESSAGES: selectMovieHasErrorMessages
});

export default connect(mapStateToProps)(HumanResourceFields)
