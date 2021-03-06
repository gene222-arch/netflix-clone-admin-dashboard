import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Error from '../../../../components/Error';
import registrationFormUseStlyes from '../../../../assets/js/material-ui/registrationFormUseStyles';
import * as AUTH_ACTION from '../../../../redux/modules/auth/actions'
import { selectAuth, selectAuthErrorMessages, selectAuthHasErrorMessages } from '../../../../redux/modules/auth/selector';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';


const CREDENTIALS_PROPS = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    allow_access_to_location: false
}

const RegistrationForm = ({ AUTH, AUTH_ERROR_MESSAGES, AUTH_HAS_ERROR_MESSAGES }) => 
{
    const dispatch = useDispatch();
    const classes = registrationFormUseStlyes();
    const { state } = useLocation();

    const credentialsDefaultValue = { 
        ...CREDENTIALS_PROPS, 
        ...state,
        role: 'Subscriber'
    };

    const [ credentials, setCredentials ] = useState(credentialsDefaultValue);

    const handleChangeCredentials = (e) => setCredentials({...credentials, [e.target.name]: e.target.value});

    const onClickSignUp = (e) => {
        e.preventDefault();
        dispatch(AUTH_ACTION.register(credentials));
    }

    useEffect(() => {
        window.addEventListener('load', () => dispatch(AUTH_ACTION.clearErrors()));
        return () => {
            dispatch(AUTH_ACTION.clearErrors());
        }
    }, []);

    return (
        <Container component="main" maxWidth="xl" className={ classes.container }>
            <CssBaseline />
            <div className={classes.paper}>
                <div>
                    <Typography variant="subtitle2">Step 4 of 4</Typography>
                    <Typography component="h1" variant="h5">Joining Flicklify is Easy.</Typography>
                    <Typography variant="subtitle1" gutterBottom className={ classes.headerLabel}>
                        Fill in your account details and you're ready to go.
                    </Typography>
                </div>
                <Error error={ AUTH.error }/>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='first_name'
                            name='first_name'
                            variant='outlined'
                            required
                            fullWidth
                            label='First Name'
                            autoFocus
                            value={credentials.first_name}
                            onChange={handleChangeCredentials}
                            error={ AUTH_HAS_ERROR_MESSAGES.first_name }
                            helperText={ AUTH_ERROR_MESSAGES.first_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete='last_name'
                            name='last_name'
                            variant='outlined'
                            required
                            fullWidth
                            label='Last Name'
                            autoFocus
                            value={credentials.last_name}
                            onChange={handleChangeCredentials}
                            error={ AUTH_HAS_ERROR_MESSAGES.last_name }
                            helperText={ AUTH_ERROR_MESSAGES.last_name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete='email'
                            name='email'
                            variant='outlined'
                            required
                            fullWidth
                            label='Email'
                            autoFocus
                            value={credentials.email}
                            onChange={handleChangeCredentials}
                            error={ AUTH_HAS_ERROR_MESSAGES.email }
                            helperText={ AUTH_ERROR_MESSAGES.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='password'
                            variant='outlined'
                            required
                            fullWidth
                            label='Password'
                            type='password'
                            autoFocus
                            autoComplete='password'
                            value={credentials.password}
                            onChange={handleChangeCredentials}
                            error={ AUTH_HAS_ERROR_MESSAGES.password }
                            helperText={ AUTH_ERROR_MESSAGES.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='password_confirmation'
                            variant='outlined'
                            required
                            fullWidth
                            label='Confirm Password'
                            type='password'
                            autoFocus
                            autoComplete='password_confirmation'
                            value={credentials.password_confirmation}
                            onChange={handleChangeCredentials}
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={ AUTH.isLoading }
                            onClick={ onClickSignUp }
                        >
                            { !AUTH.isLoading ? 'Create Account' : (
                                <>
                                    <CircularProgress size='1rem' className={ classes.progress } />
                                    { '  Creating Account. . . .' }
                                </> 
                            )}
                        </Button>
                </Grid>
                </Grid>
            </div>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    AUTH_ERROR_MESSAGES: selectAuthErrorMessages,
    AUTH_HAS_ERROR_MESSAGES: selectAuthHasErrorMessages
});


export default connect(mapStateToProps, null)(RegistrationForm);