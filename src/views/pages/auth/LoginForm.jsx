import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import Error from './../../../components/Error';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import loginFormUseStyles from '../../../assets/js/material-ui/loginFormUseStyles';
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'
import PATH from './../../../routes/path';
import { selectAuth, selectAuthErrorMessages, selectAuthHasErrorMessages } from './../../../redux/modules/auth/selector';
import InputAdornment from '@material-ui/core/InputAdornment'
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as USER_API from './../../../services/users/user'
import * as QueryParam from './../../../utils/queryParams'
import * as Cookies from './../../../utils/cookies'


const LoginForm = ({ AUTH, ERROR_MESSAGE, HAS_ERROR_MESSAGE }) => 
{
    const dispatch = useDispatch();
    const classes = loginFormUseStyles();
    const history = useHistory();

    const [ credentials, setCredentials ] = useState(AUTH.credentials);
    const [ showPassword, setShowPassword ] = useState(false);
    
    const handleChangeCredentials = (e) => 
    {
        const { name, value, checked } = e.target;

        name === 'remember_me'
            ? setCredentials({ ...credentials, remember_me: checked })
            : setCredentials({ ...credentials, [name]: value });
    };

    const handleClickTogglePasswordVisibility = () => setShowPassword(! showPassword);

    const handleMouseDownPassword = (e) => e.preventDefault();

    const onClickLogin = (e) => {
        e.preventDefault();
        dispatch(AUTH_ACTION.login(credentials));
    }

    const loginUserViaToken = async (profileId, path) => 
    {
        try {
            const { data } = await USER_API.fetchByTokenAsync();
            const { token, ...userData } = data;

            const selectedProfile = userData.profiles.find(({ id }) => id === parseInt(profileId));

            Cookies.set('access_token', token);

            dispatch(AUTH_ACTION.loginViaToken({ ...userData, selectedProfile, path }));

            if (path === 'profile-lock') {
                history.push(PATH.PROFILE_LOCK.replace(':id', profileId));
            } 

            if (path === 'home') {
                history.push(PATH.PROFILE_HOME_PAGE);
            }
        } catch ({ message }) {}
    }

    useEffect(() => 
    {
        const path = typeof QueryParam.get('path') === 'string' ? QueryParam.get('path') : '';
        const token = QueryParam.get('token');
        const profileId = QueryParam.get('profileId');

        if (path && token && profileId && AUTH.isAuthenticated) {
            history.push(PATH.PROFILE_LOCK.replace(':id', profileId));
        }

        if (! Cookies.has('access_token') && token)
        {
            Cookies.set('access_token', token);
            loginUserViaToken(profileId, path);
        }
        
        window.addEventListener('load', () => dispatch(AUTH_ACTION.clearErrors()));
        return () => {
            dispatch(AUTH_ACTION.clearErrors());
        }
    }, []);

    return (
        <Container maxWidth='xl'>
            <Container component='main' maxWidth='xs' className={ classes.container }>
                <div className={ classes.paper }>
                    <Typography component='h1' variant='h5' gutterBottom>
                        <strong>Sign in</strong>
                    </Typography>
                    <Error error={ AUTH.error } />
                    <TextField
                        id='email'
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={ credentials.email }
                        onChange={ handleChangeCredentials }
                        error={ HAS_ERROR_MESSAGE.email }
                        helperText={ ERROR_MESSAGE.email }
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type={ !showPassword ? 'password' : '' }
                        id='password'
                        autoComplete='current-password'
                        value={ credentials.password }
                        onChange={ handleChangeCredentials }
                        error={ HAS_ERROR_MESSAGE.password }
                        helperText={ ERROR_MESSAGE.password }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ handleClickTogglePasswordVisibility }
                                        onMouseDown={ handleMouseDownPassword }
                                    >
                                    { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                name='remember_me'
                                color='primary' 
                                checked={ Boolean(credentials.remember_me) }
                                onChange={ handleChangeCredentials }
                                style={{ color: '#FFF' }}
                            />}
                        label='Remember me'
                        className={ classes.rememberMe }
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={ classes.submit }
                        disabled={ AUTH.isLoading }
                        onClick={ onClickLogin }
                    >
                        { !AUTH.isLoading ? 'Sign In' : 'Signing In...' }
                    </Button>
                    <Grid container>
                        <Grid item xs={ 12 } sm={ 5 } md={ 5 } lg={ 5 }>
                            <Typography variant="subtitle2" color="initial">
                                <Link href={ PATH.FORGOT_PASSWORD } color='inherit' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 7 } md={ 7 } lg={ 7 }>
                        <Typography variant="subtitle2">
                            <Link href={ PATH.GET_STARTED } color='inherit' variant='body2'>
                                Don't have an account? Sign Up
                            </Link>
                        </Typography>
                        </Grid>
                    </Grid>
                </div>
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    className={ classes.termsAndServices }
                    align='center'
                >
                    By continuing, you agree to Flicklify's
                    <Link href={ PATH.TERMS_AND_CONDITION } color='textPrimary' variant='body2'>
                        <strong> Terms and Condition</strong>
                    </Link>,
                    <Link href={ PATH.PRIVACY_POLICY } color='textPrimary' variant='body2'>
                        <strong> Privacy Policy</strong>
                    </Link> and 
                    <Link href={ PATH.TERMS_AND_CONDITION } color='textPrimary' variant='body2'>
                        <strong> Cookie used.</strong>
                    </Link>
                </Typography>
            </Container>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    ERROR_MESSAGE: selectAuthErrorMessages,
    HAS_ERROR_MESSAGE: selectAuthHasErrorMessages
});


export default connect(mapStateToProps)(LoginForm);