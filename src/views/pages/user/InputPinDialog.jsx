import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Colors from './../../../constants/Colors';

const inputDialogUseStyles = makeStyles(theme => ({
    container: {
        width: '100%'
    },
    dialogContainer: {
        width: '100%',
        height: '25vh'
    },
    dialogTitle: {
        textAlign: 'center',
        color: theme.palette.text.disabled
    },
    directionText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: '2rem'
    },
    inputContainer: {
        fontSize: '1rem'
    },
    wrongPinText: {
        color: Colors.warning,
        fontWeight: 'bold',
        fontSize: '2rem'
    }
}));

const InputPinDialog = ({ open, pin, setPin, handleClickToggleModal, handleClickSave, handleClickCancel, isIncorrectPin = false}) => 
{
    const classes = inputDialogUseStyles();

    return (
        <div>
            <Dialog 
                open={ open } 
                onClose={ handleClickToggleModal } 
                aria-labelledby="form-dialog-title"
                maxWidth='md'
                fullWidth
                className={ classes.dialog }
            >
                <DialogTitle id="form-dialog-title" className={ classes.dialogTitle }>Profile Lock is currently on</DialogTitle>
                <DialogContent className={ classes.dialogContainer }>
                    <Grid container spacing={1} direction='column' justify='center' alignItems='center'>
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
                                <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                                    <TextField
                                        className={ classes.inputContainer }
                                        inputProps={{ 
                                            min: 4, 
                                            style: { textAlign: 'center' },
                                            maxLength: 4
                                        }}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="-- -- -- --"
                                        type="password"
                                        value={ pin }
                                        onChange={ (e) => setPin(e.target.value) }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClickCancel } color='default'>
                        Cancel
                    </Button>
                    <Button onClick={ handleClickSave } color='default'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default InputPinDialog
