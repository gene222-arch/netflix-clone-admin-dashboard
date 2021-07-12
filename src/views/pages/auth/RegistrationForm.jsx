/** Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

/** Material UI Components */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/** Custom Components */
import Copyright from './../../../components/Copyright';
import AlertPopUp from './../../../components/AlertPopUp';
import Error from './../../../components/Error';

/** Custom material ui styling */
import registrationFormUseStlyes from '../../../assets/js/material-ui/registrationFormUseStyles';

/** Actions */
import * as AUTH from '../../../redux/modules/auth/actions'
import * as ALERT from '../../../redux/modules/alert/actions';

/** selectors */
import { selectAuth } from './../../../redux/modules/auth/selector';
import { selectAlert } from './../../../redux/modules/alert/selector';





const CREDENTIALS_PROPS = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: ''
}

const RegistrationForm = ({ alert, auth }) => 
{
    const { error } = auth;
    const dispatch = useDispatch();
    const classes = registrationFormUseStlyes();

    const [ credentials, setCredentials ] = useState(CREDENTIALS_PROPS);

    const handleChangeCredentials = (e) => setCredentials({...credentials, [e.target.name]: e.target.value});

    const onSubmitCredentails = (e) => 
    {
        e.preventDefault();
        dispatch(AUTH.register(credentials));
    }

    useEffect(() => {
        return () => {
            setCredentials(CREDENTIALS_PROPS);
        }
    }, [])

    return (
        <Container component="main" maxWidth="sm">
            <AlertPopUp 
                status={ alert.status }
                message={ alert.message }
                open={ alert.isOpen }
                handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
            />
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Error error={ error }/>
                <form className={classes.form} noValidate onSubmit={onSubmitCredentails}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(error.firstName)}
                                helperText={error.firstName}
                                autoComplete='firstName'
                                name='firstName'
                                variant='outlined'
                                required
                                fullWidth
                                label='First Name'
                                autoFocus
                                value={credentials.firstName}
                                onChange={handleChangeCredentials}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(error.lastName)}
                                helperText={error.lastName}
                                autoComplete='lastName'
                                name='lastName'
                                variant='outlined'
                                required
                                fullWidth
                                label='Last Name'
                                autoFocus
                                value={credentials.lastName}
                                onChange={handleChangeCredentials}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={Boolean(error.email)}
                                helperText={error.email}
                                autoComplete='email'
                                name='email'
                                variant='outlined'
                                required
                                fullWidth
                                label='Email'
                                autoFocus
                                value={credentials.email}
                                onChange={handleChangeCredentials}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={Boolean(error.password)}
                                helperText={error.password}
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
                        <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I agree to the terms and policy."
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={ auth.isLoading }
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/auth/sign-in" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    auth: selectAuth
});


export default connect(mapStateToProps, null)(RegistrationForm);