import React from 'react'
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom'
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Card, CardHeader, IconButton, CardActions, Typography, CardContent, TextField, Grid, Container, FormHelperText } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/** Components */
import SaveCancelButtons from './SaveCancelButtons';


const InputFields = ({ data, setData, saveButtonCallback, cancelButtonCallback, isLoading = false, cardHeaderTitle = '', errors = null, errorMessages = null }) => 
{
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        name !== 'enabled'
            ? setData({ ...data, [name]: value })
            : setData({ ...data, enabled: checked });
    }

    const handleChangeBirthDate = (date) => setData({ ...data, date_of_birth: format(date, 'yyyy-MM-dd') });
    const handleChangeDateOfDeath = (date) => setData({ ...data, date_of_death: format(date, 'yyyy-MM-dd') })

    
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
                                id='pseudonym'
                                name='pseudonym'
                                label='Pseudonym'
                                variant='filled'
                                fullWidth
                                error={ errors.pseudonym }
                                helperText={ errorMessages?.pseudonym }
                                value={ data.pseudonym ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='birth_name'
                                name='birth_name'
                                label='Birth Name'
                                variant='filled'
                                fullWidth
                                error={ errors.birth_name }
                                helperText={ errorMessages?.birth_name }
                                value={ data.birth_name ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <FormControl component='fieldset' error={ errors.gender } >
                                <FormLabel component='legend'>Gender</FormLabel>
                                <RadioGroup aria-label='gender' name='gender' value={ data.gender ?? '' } onChange={ handleChange }>
                                    <FormControlLabel value='Female' control={<Radio />} label='Female' />
                                    <FormControlLabel value='Male' control={<Radio />} label='Male' />
                                    <FormControlLabel value='other' control={<Radio />} label='Other' />
                                </RadioGroup>
                                <FormHelperText>{ errorMessages?.gender } </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='height_in_cm'
                                name='height_in_cm'
                                label='Height (cm)'
                                variant='filled'
                                fullWidth
                                error={ errors.height_in_cm }
                                helperText={ errorMessages?.height_in_cm }
                                value={ data.height_in_cm ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='biographical_information'
                                name='biographical_information'
                                label='Bio'
                                variant='outlined'
                                fullWidth
                                multiline
                                rows={ 4 }
                                error={ errors.biographical_information }
                                helperText={ errorMessages?.biographical_information }
                                value={ data.biographical_information ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <KeyboardDatePicker
                                id='date-of-birth'
                                label='Date of Birth'
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
                                error={ errors.date_of_birth }
                                helperText={ errorMessages?.date_of_birth }
                                value={ data.date_of_birth }
                                onChange={ handleChangeBirthDate }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='place_of_birth'
                                name='place_of_birth'
                                label='Place of Birth'
                                variant='outlined'
                                fullWidth
                                multiline
                                error={ errors.place_of_birth }
                                helperText={ errorMessages?.place_of_birth }
                                value={ data.place_of_birth ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='birth_details'
                                name='birth_details'
                                label='Birth Details'
                                variant='outlined'
                                fullWidth
                                multiline
                                rows={ 4 }
                                error={ errors.birth_details }
                                helperText={ errorMessages?.birth_details }
                                value={ data.birth_details ?? '' }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <KeyboardDatePicker
                                id='date-of-death'
                                label='Date of Death'
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
                                error={ errors.date_of_death }
                                helperText={ errorMessages?.date_of_death }
                                value={ data.date_of_death }
                                onChange={ handleChangeDateOfDeath }
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } lg={ 12 } xl={ 12 }>
                            <TextField
                                id='death_details'
                                name='death_details'
                                label='Death Details'
                                variant='outlined'
                                fullWidth
                                multiline
                                rows={ 4 }
                                error={ errors.death_details }
                                helperText={ errorMessages?.death_details }
                                value={ data.death_details ?? '' }
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
                        cancelButtonCallback={ cancelButtonCallback }
                        isLoading={ isLoading }
                    />
                </CardActions>
            </Card>
        </Container>
    )
}

export default InputFields
