import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Button, Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import * as AUTH_ACTION from './../../../../../redux/modules/auth/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuth, selectAuthErrorMessages, selectAuthHasErrorMessages } from './../../../../../redux/modules/auth/selector'

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

const ContinueProfileLock = ({ profile, AUTH, AUTH_HAS_ERROR_MESSAGE, AUTH_ERROR_MESSAGE }) => 
{
    const classes = continueLockProfileUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ isPinCreated, setIsPinCreated ] = useState(false);
    const [ pin, setPin ] = useState(PIN_PROPS);
    const [ isRequired, setIsRequired ] = useState(profile.is_profile_locked);

    const handleChange = (e, nextFieldName) => 
    {
        const { value, name } = e.target;
        setPin({ ...pin, [name]: value });

        if (value) {
            let nextfield = document.querySelector(`input[name=${ nextFieldName }]`);
            nextfield.focus();
        }
    };

    const handleClickSave = () => 
    {
        const pinValue = Object.values(pin).join('');

        const payload = !isRequired 
            ? { user_profile_id: profile.id, pin_code: '', is_profile_locked: isRequired }
            : { user_profile_id: profile.id, pin_code: pinValue, is_profile_locked: isRequired }

        dispatch(AUTH_ACTION.manageProfileLockStart(payload));
        setPin(PIN_PROPS);
    }

    const checkPinEveryInput = () => 
    {
        const pinValues = Object.values(pin);

        const filterPinValues = pinValues.filter(val => Boolean(val));

        filterPinValues.length === 4 ?  setIsPinCreated(true) :  setIsPinCreated(false);
    }

    const handleClickKeyDown = (e) => {
        if (e.keyCode == 8) {
            setPin(PIN_PROPS);

            let nextfield = document.querySelector(`input[name=num1]`);
            nextfield.focus();
        }
    }

    useEffect(() => 
    {
        if (profile.is_profile_locked) 
        {
            setPin({
                num1: profile.pin_code[0],
                num2: profile.pin_code[1],
                num3: profile.pin_code[2],
                num4: profile.pin_code[3] 
            });
        }

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
                                { `Require a PIN to access ${ profile.name }'s profile.` }
                            </Typography>
                        }
                    />
                </Grid>
                {
                    Boolean(isRequired) && (
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
                                        value={ pin.num1 }
                                        onKeyDown={ handleClickKeyDown }
                                        onChange={ (e) => handleChange(e, 'num2') }
                                        error={ AUTH_HAS_ERROR_MESSAGE.pin_code }
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
                                        value={ pin.num2 }
                                        onKeyDown={ handleClickKeyDown }
                                        onChange={ (e) => handleChange(e, 'num3') }
                                        error={ AUTH_HAS_ERROR_MESSAGE.pin_code }
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
                                        value={ pin.num3 }
                                        onKeyDown={ handleClickKeyDown }
                                        onChange={ (e) => handleChange(e, 'num4') }
                                        error={ AUTH_HAS_ERROR_MESSAGE.pin_code }
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
                                        value={ pin.num4 }
                                        onKeyDown={ handleClickKeyDown }
                                        onChange={ (e) => handleChange(e, 'num4') }
                                        error={ AUTH_HAS_ERROR_MESSAGE.pin_code }
                                    />
                                </Grid>
                            </Grid>
                            {
                                AUTH_HAS_ERROR_MESSAGE.pin_code && (
                                    <Typography variant="subtitle1" color="error">
                                        { AUTH_ERROR_MESSAGE.pin_code }
                                    </Typography>
                                )
                            }
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
                                disabled={ !isPinCreated || AUTH.isLoading }
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="default"
                                onClick={ () => history.goBack() }
                                disabled={ AUTH.isLoading }
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

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    AUTH_HAS_ERROR_MESSAGE: selectAuthHasErrorMessages,
    AUTH_ERROR_MESSAGE: selectAuthErrorMessages
});

export default connect(mapStateToProps)(ContinueProfileLock)
