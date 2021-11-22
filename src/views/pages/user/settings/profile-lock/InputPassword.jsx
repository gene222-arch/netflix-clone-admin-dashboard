import React, { useState, useEffect } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const inputPasswordUseStyles = makeStyles(theme => ({
    avatar: {
        width: '4rem',
        borderRadius: 5,
        marginRight: '1rem'
    },
    btnContainer: {
        marginTop: '3rem'
    },
    container: {
        height: '91.7vh'
    },
    emphasized: {
        color: '#FFF'
    }
}));


const InputPassword = ({ profileName = '', password = '', setPassword, passwordErrorMessage = '', handleClickContinue, handleClickCancel, isLoading = false }) => 
{
    const [ passwordVisibility, setPasswordVisibility ] = useState(false);

    const classes = inputPasswordUseStyles();

    const handleClickTogglePasswordVisibility = () => setPasswordVisibility(! passwordVisibility);

    const handleMouseDownPassword = (e) => e.preventDefault();

    return (
        <div>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Grid container spacing={1}>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant="h6" color="textSecondary">
                            Enter your account password to edit 
                            <strong className={ classes.emphasized }> Profile Lock</strong> for 
                            <strong className={ classes.emphasized }> { profileName + "'s" }</strong> profile.
                        </Typography>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } md={ 5 } lg={ 5 }>
                        <TextField
                            variant='filled'
                            fullWidth
                            onChange={ e => setPassword(e.target.value) }
                            type={ !passwordVisibility ? 'password' : '' }
                            error={ Boolean(passwordErrorMessage) }
                            helperText={ passwordErrorMessage }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={ handleClickTogglePasswordVisibility }
                                            onMouseDown={ handleMouseDownPassword }
                                        >
                                        { passwordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } className={ classes.btnContainer }>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button 
                            variant="outlined" 
                            color="default"
                            onClick={ handleClickContinue }
                            disabled={ !password || isLoading }
                        >
                            Continue
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="outlined" 
                            color="default"
                            onClick={ handleClickCancel }
                            disabled={ isLoading }
                        >
                            Cancel 
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default InputPassword
