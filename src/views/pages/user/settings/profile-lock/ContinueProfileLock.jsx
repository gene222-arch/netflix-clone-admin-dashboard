import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Button, Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const continueLockProfileUseStyles = makeStyles(theme => ({
    btnContainer: {
        marginTop: '3rem'
    },
    checkBoxContainer: {
        width: '100%'
    }
}));

const PIN_PROPS = {
    num1: '',
    num2: '',
    num3: '',
    num4: '' 
};

/**
 * * Note: UseEffect does not force another UseEffect to render
 */

const ContinueProfileLock = ({ profileName = '' }) => 
{
    const classes = continueLockProfileUseStyles();
    const history = useHistory();

    const [ isPinCreated, setIsPinCreated ] = useState(false);
    const [ pin, setPin ] = useState(PIN_PROPS);
    const [ isRequired, setIsRequired ] = useState(false);

    const handleChange = (e, nextFieldName) => 
    {
        const { value, name } = e.target;
        setPin({ ...pin, [name]: value });

        let nextfield = document.querySelector(`input[name=${ nextFieldName }]`);
        nextfield.focus();
    };

    const handleClickSave = () => {
        const pinValue = Object.values(pin);
        window.alert('pin' + pinValue);
    }

    const checkPinEveryInput = () => 
    {
        const pinValues = Object.values(pin);

        const filterPinValues = pinValues.filter(val => Boolean(val));

        filterPinValues.length === 4 ?  setIsPinCreated(true) :  setIsPinCreated(false);
    }

    useEffect(() => 
    {
        return () => {
            setIsRequired(false);
            setPin(PIN_PROPS);
            setIsPinCreated(false);
        }
    }, []);

    useEffect(() => {
        checkPinEveryInput();
    }, [pin])

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h6" color="textSecondary">
                        Lock this profile by creating a 4-digit pin.
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <FormControlLabel
                        className={ classes.checkBoxContainer }
                        control={ 
                            <Checkbox
                                checked={ isRequired } 
                                onChange={ () => setIsRequired(! isRequired) }
                            /> 
                        }
                        label={ 
                            <Typography variant="caption" color="textSecondary">
                                { `Required a PIN to access ${ profileName }'s profile.` }
                            </Typography>
                        }
                    />
                </Grid>
                {
                    isRequired && (
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Grid container spacing={1}>
                                <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                    <TextField
                                        name='num1'
                                        variant='outlined'
                                        inputProps={{ 
                                            min: 1, 
                                            style: { textAlign: 'center' },
                                            maxLength: 1
                                        }}
                                        onChange={ (e) => handleChange(e, 'num2') }
                                    />
                                </Grid>
                                <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                    <TextField
                                        name='num2'
                                        variant='outlined'
                                        inputProps={{ 
                                            min: 1, 
                                            style: { textAlign: 'center' },
                                            maxLength: 1
                                        }}
                                        onChange={ (e) => handleChange(e, 'num3') }
                                    />
                                </Grid>
                                <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                    <TextField
                                        name='num3'
                                        variant='outlined'
                                        inputProps={{ 
                                            min: 1, 
                                            style: { textAlign: 'center' },
                                            maxLength: 1
                                        }}
                                        onChange={ (e) => handleChange(e, 'num4') }
                                    />
                                </Grid>
                                <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                    <TextField
                                        name='num4'
                                        variant='outlined'
                                        inputProps={{ 
                                            min: 1, 
                                            style: { textAlign: 'center' },
                                            maxLength: 1
                                        }}
                                        onChange={ (e) => handleChange(e, 'num4') }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
                <Grid item className={ classes.btnContainer }>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="default"
                                onClick={ handleClickSave }
                                disabled={ !isPinCreated }
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="default"
                                onClick={ () => history.goBack() }
                            >
                                Cancel 
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ContinueProfileLock
