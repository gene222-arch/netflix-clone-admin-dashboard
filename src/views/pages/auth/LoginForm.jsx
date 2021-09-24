/** Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

/** Custom Components */
import Copyright from './../../../components/Copyright';
import Error from './../../../components/Error';

/** Material UI Components */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

/** Material UI Styling */
import loginFormUseStyles from '../../../assets/js/material-ui/loginFormUseStyles';

/** Actions */
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'

/** Routes */
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
            ? setCredentials({...credentials, remember_me: checked})
            : setCredentials({...credentials, [name]: value});
    };

    const handleClickTogglePasswordVisibility = () => setShowPassword(! showPassword);

    const handleMouseDownPassword = (e) => e.preventDefault();

    const onClickLogin = (e) => {
        e.preventDefault();
        dispatch(AUTH_ACTION.login(credentials));
    }

    const loginUserViaToken = async (profileId, action) => 
    {
        try {
            const { data } = await USER_API.fetchByTokenAsync();

            const selectedProfile = data.profiles.find(({ id }) => id === parseInt(profileId));

            dispatch(AUTH_ACTION.loginViaToken({ ...data, selectedProfile }));

            history.push(PATH.PROFILE_LOCK.replace(':id', data.user.id));
        } catch ({ message }) {
            
        }
    }

    useEffect(() => 
    {
        const token = QueryParam.get('token');
        const profileId = QueryParam.get('profileId');
        const action = QueryParam.get('action');

        if (token) {
            Cookies.set('access_token', token);
            loginUserViaToken(profileId, action);
        }
        
        window.addEventListener('load', () => dispatch(AUTH_ACTION.clearErrors()));
        return () => {
            dispatch(AUTH_ACTION.clearErrors());
        }
    }, []);

    return (
        <Container component='main' maxWidth='xs'>
            <div className={ classes.paper }>
                <Avatar className={ classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>Sign in</Typography>
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
                        <Checkbox value='remember' 
                            color='primary' 
                            checked={ credentials.remember_me }
                            onChange={ handleChangeCredentials }
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
                    <Grid item xs>
                        <Typography variant="subtitle2" color="initial">
                            <Link href={ PATH.FORGOT_PASSWORD } color='inherit' variant='body2'>
                                Forgot password?
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle2">
                        <Link href={ PATH.GET_STARTED } color='inherit' variant='body2'>
                            Don't have an account? Sign Up
                        </Link>
                    </Typography>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    ERROR_MESSAGE: selectAuthErrorMessages,
    HAS_ERROR_MESSAGE: selectAuthHasErrorMessages
});


export default connect(mapStateToProps)(LoginForm);