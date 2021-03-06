import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Grid, Typography, useTheme } from '@material-ui/core';
import Colors from './../../../constants/Colors';
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const inputDialogUseStyles = makeStyles(theme => ({
    container: {
        width: '100%'
    },
    dialog: {
        height: '100vh'
    },
    dialogContainer: {
        width: '100%',
        height: '30vh',
        [theme.breakpoints.down('sm')]: {
            height: '40vh',
            padding: 0
        }
    },
    dialogPaper: {
        height: '50vh',
        padding: '2rem',
        [theme.breakpoints.down('sm')]: {
            padding: '0 1rem',
            width: '100vw'
        }
    },
    dialogTitle: {
        textAlign: 'center',
        color: theme.palette.text.disabled,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    },
    directionText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    },
    inputContainer: {
        fontSize: '1rem'
    },
    pinInputContainer: {
        width: '100%'
    },
    wrongPinText: {
        color: Colors.warning,
        fontWeight: 'bold',
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem'
        }
    }
}));

const DEFAULT_PIN = {
    num1: '',
    num2: '',
    num3: '',
    num4: ''
};

const InputPinDialog = ({ id, open, pin, setPin, handleClickToggleModal, handleClickSave, handleClickCancel, isIncorrectPin = false }) => 
{
    const classes = inputDialogUseStyles();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));

    const handleOnKeyPressDown = (e) => {
        if (e.keyCode == 8) {
            setPin(DEFAULT_PIN);

            let nextfield = document.querySelector(`input[name=num1]`);
            nextfield.focus();
        }
    }

    const handleChange = (e, nextFieldName) => 
    {
        const { value, name } = e.target;

        setPin({ ...pin, [name]: value });

        if (value) {
            let nextfield = document.querySelector(`input[name=${ nextFieldName }]`);
            nextfield.focus();
        }
    };

    const checkPinEveryInput = () => 
    {
        const pinValues = Object.values(pin);

        const filterPinValues = pinValues.filter(val => Boolean(val));

        filterPinValues.length === 4 && handleClickSave();
    }
    
    useEffect(() => {
        checkPinEveryInput();
    }, [pin]);

    return (
        <div>
            <Dialog 
                open={ open } 
                onClose={ handleClickToggleModal } 
                aria-labelledby="form-dialog-title"
                maxWidth={ isXs ? 'xl' : 'md' }
                fullWidth
                className={ classes.dialog }
                disableBackdropClick
                classes={{ 
                    paper: classes.dialogPaper
                 }}
            >
                <DialogTitle id="form-dialog-title" className={ classes.dialogTitle }>Profile Lock is currently on</DialogTitle>
                <DialogContent className={ classes.dialogContainer }>
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            {
                                !isIncorrectPin
                                    ? (
                                        <Typography 
                                            variant="subtitle1" 
                                            className={ classes.directionText }
                                            align='center'
                                        >
                                            Enter your PIN to access this profile
                                        </Typography>
                                    )
                                    : (
                                        <Typography 
                                            variant="subtitle1" 
                                            className={ classes.wrongPinText }
                                            align='center'
                                        >
                                            Whoops, wrong PIN. Please try again.
                                        </Typography>
                                    )
                            }
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Grid container spacing={1} justify='center'>
                                <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                    <TextField
                                        name='num1'
                                        variant='outlined'
                                        inputProps={{ 
                                            min: 1, 
                                            style: { textAlign: 'center' },
                                            maxLength: 1
                                        }}
                                        type='password'
                                        value={ pin.num1 }
                                        onChange={ (e) => handleChange(e, 'num2') }
                                        onKeyDown={ handleOnKeyPressDown }
                                        focused
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
                                        type='password'
                                        value={ pin.num2 }
                                        onKeyDown={ handleOnKeyPressDown }
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
                                        type='password'
                                        value={ pin.num3 }
                                        onKeyDown={ handleOnKeyPressDown }
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
                                        type='password'
                                        value={ pin.num4 }
                                        onKeyDown={ handleOnKeyPressDown }
                                        onChange={ (e) => handleChange(e, 'num4') }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <StyledNavLink 
                                to={ PATH.PROFILE_LOCK.replace(':id', id) }
                                text={ 
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Forgot PIN?
                                    </Typography>
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClickCancel } color='default'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default InputPinDialog
