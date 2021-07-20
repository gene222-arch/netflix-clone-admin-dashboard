import React, { useEffect } from 'react'
import { Card, CardHeader, IconButton, CardActions, Typography, CardContent, TextField, Grid, Container } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/** Components */
import SaveCancelButtons from './SaveCancelButtons';
import { useHistory } from 'react-router-dom';
import PATH from './../routes/path';
import { createStructuredSelector } from 'reselect';
import * as GENRE_ACTION from './../redux/modules/genre/actions';
import { selectGenre, selectGenreErrorMessages, selectGenreHasErrorMessages } from './../redux/modules/genre/selector';
import { connect, useDispatch } from 'react-redux';


const GenreInputFields = ({ GENRE, GENRE_ERROR_MESSAGE, GENRE_HAS_ERROR_MESSAGE, data, setData, saveButtonCallback, cardHeaderTitle = '', }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name !== 'enabled'
            ? setData({ ...data, [name]: value })
            : setData({ ...data, enabled: checked });
    }

    const handleClickCancel = () => {
        history.push(PATH.VIDEO_MANAGEMENT_GENRE);
    }
    
    return (
        <Container maxWidth='lg'>
            <Card>
                <CardHeader
                    action={
                        <IconButton aria-label=''>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <Typography variant='h5'>{ cardHeaderTitle }</Typography>
                    }
                />

                <Divider />
                
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='name'
                                name='name'
                                label='Name'
                                variant='filled'
                                fullWidth
                                error={ GENRE_HAS_ERROR_MESSAGE.name }
                                helperText={ GENRE_ERROR_MESSAGE.name }
                                value={ data.name ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='description'
                                name='description'
                                label='Description'
                                variant='outlined'
                                fullWidth
                                multiline
                                rows={ 4 }
                                value={ data.description ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <FormControlLabel
                                control={<Switch checked={ Boolean(data.enabled) } onChange={ handleChange } name='enabled' />}
                                label='Enabled'
                            />
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions>
                    <SaveCancelButtons 
                        saveButtonCallback={ saveButtonCallback }
                        cancelButtonCallback={ handleClickCancel }
                        isLoading={ GENRE.isLoading }
                    />
                </CardActions>
            </Card>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    GENRE: selectGenre,
    GENRE_ERROR_MESSAGE: selectGenreErrorMessages,
    GENRE_HAS_ERROR_MESSAGE: selectGenreHasErrorMessages
});

export default connect(mapStateToProps)(GenreInputFields)
