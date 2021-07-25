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

/** Material UI Styling */
import loginFormUseStyles from '../../../assets/js/material-ui/loginFormUseStyles';

/** Actions */
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'

/** Reselect */
import { selectAuth } from './../../../redux/modules/auth/selector';

/** Routes */
import PATH from './../../../routes/path';


const LoginForm = ({ AUTH }) => 
{
    const dispatch = useDispatch();
    const classes = loginFormUseStyles();

    const [ credentials, setCredentials ] = useState(AUTH.credentials);

    
    const handleChangeCredentials = (e) => 
    {
        const { name, value, checked } = e.target;

        name === 'remember_me'
            ? setCredentials({...credentials, remember_me: checked})
            : setCredentials({...credentials, [name]: value});
    };

    const onSubmitCredentails = (e) => 
    {
        e.preventDefault();
        dispatch(AUTH_ACTION.login(credentials));
    }

    useEffect(() => {
        return () => {
            setCredentials(AUTH.credentials);
        }
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Error error={ AUTH.error } />
                <form className={classes.form} noValidate onSubmit={onSubmitCredentails}>
                    <TextField
                        error={Boolean(AUTH.error.email)}
                        helperText={AUTH.error.email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={credentials.email}
                        onChange={handleChangeCredentials}
                    />
                    <TextField
                        error={Boolean(AUTH.error.password)}
                        helperText={AUTH.error.password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChangeCredentials}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox value="remember" 
                            color="primary" 
                            checked={credentials.remember_me}
                            onChange={handleChangeCredentials}
                        />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={ AUTH.isLoading }
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href={ PATH.FORGOT_PASSWORD } variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/auth/create-an-account" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});


export default connect(mapStateToProps, null)(LoginForm);