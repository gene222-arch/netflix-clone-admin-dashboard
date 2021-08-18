/** Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

/** Material UI Components */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/** Custom Components */
import Copyright from '../../../../components/Copyright';
import Error from '../../../../components/Error';

/** Custom material ui styling */
import registrationFormUseStlyes from '../../../../assets/js/material-ui/registrationFormUseStyles';

/** Actions */
import * as AUTH from '../../../../redux/modules/auth/actions'

/** selectors */
import { selectAuth } from '../../../../redux/modules/auth/selector';
import Header from '../../../../components/app/Header';


const CREDENTIALS_PROPS = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    allow_access_to_location: false
}

const StepThree = ({ auth, setStepIndex, email = '', allowAccessToLocation = false }) => 
{
    console.log('STEP THREE RENDER')
    const { error } = auth;
    const dispatch = useDispatch();
    const classes = registrationFormUseStlyes();

    const [ credentials, setCredentials ] = useState({ 
        ...CREDENTIALS_PROPS, 
        email, 
        allow_access_to_location: allowAccessToLocation 
    });

    const handleChangeCredentials = (e) => setCredentials({...credentials, [e.target.name]: e.target.value});

    const onSubmitCredentails = () => {
        dispatch(AUTH.register(credentials));
    }

    useEffect(() => {
        return () => {
            setCredentials(CREDENTIALS_PROPS);
            dispatch(AUTH.clearErrors());
        }
    }, []);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Header />
            <div className={classes.paper}>
                <div className={ classes.description }>
                    <Typography variant="subtitle2">Step 1 of 2</Typography>
                    <Typography component="h1" variant="h5">Joining Flicklify is Easy.</Typography>
                    <Typography variant="subtitle1" gutterBottom className={ classes.headerLabel}>
                        Enter your password and you'll be watching in no time.
                    </Typography>
                </div>
                <Error error={ error }/>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={Boolean(error.first_name)}
                            helperText={error.first_name}
                            autoComplete='first_name'
                            name='first_name'
                            variant='outlined'
                            required
                            fullWidth
                            label='First Name'
                            autoFocus
                            value={credentials.first_name}
                            onChange={handleChangeCredentials}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={Boolean(error.last_name)}
                            helperText={error.last_name}
                            autoComplete='last_name'
                            name='last_name'
                            variant='outlined'
                            required
                            fullWidth
                            label='Last Name'
                            autoFocus
                            value={credentials.last_name}
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
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={ auth.isLoading }
                            onClick={ onSubmitCredentails }
                        >
                            Sign Up
                        </Button>
                </Grid>
                </Grid>
            </div>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    auth: selectAuth
});


export default connect(mapStateToProps, null)(StepThree);