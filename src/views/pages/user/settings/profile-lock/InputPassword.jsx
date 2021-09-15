import React from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    const classes = inputPasswordUseStyles();

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
                    <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
                        <TextField
                            variant='filled'
                            fullWidth
                            onChange={ e => setPassword(e.target.value) }
                            type='password'
                            error={ Boolean(passwordErrorMessage) }
                            helperText={ passwordErrorMessage }
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
