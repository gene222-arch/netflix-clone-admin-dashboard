import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

/** Material UI Components */
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from '@material-ui/core';
import Key from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'
import { selectAuth, selectAuthErrorMessages, selectAuthHasErrorMessages } from './../../../redux/modules/auth/selector';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PATH from './../../../routes/path';
import Colors from './../../../constants/Colors';


const forgotPasswordUseStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
    },
    forgotPasswordContainer: {
        marginTop: theme.spacing(3)
    },
    sendMailBtn: {
        backgroundColor: Colors.netflixRed,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.netflixRed,
            fontWeight: 'bold'
        }
    }
}))


const ForgotPasswordForm = ({ AUTH, AUTH_HAS_ERROR_MESSAGE, AUTH_ERROR_MESSAGE }) => 
{
    const classes = forgotPasswordUseStyles();
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState('');

    const handleChangeMail = (e) => setEmail(e.target.value);
    
    const handleClickForgotPassword = () => dispatch(AUTH_ACTION.forgotPassword({ email }));


    useEffect(() => {
        window.addEventListener('load', () => dispatch(AUTH_ACTION.clearErrors()));
        return () => {
            dispatch(AUTH_ACTION.clearErrors());
        }
    }, []);

    return (
        <Container component='main' maxWidth="sm" className={ classes.container }>
            <Grid container spacing={1} direction='column' alignItems='center' justify='center'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" color="initial" align='center'>
                        <Key />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" color="initial" align='center' gutterBottom>
                        <strong>Forgot your password?</strong>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" color="textSecondary" align='center'>
                        Enter your registered email below
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" align='center' gutterBottom={true}>
                        to receive password reset notification through gmail
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} className={ classes.forgotPasswordContainer }>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                        variant='outlined'
                        label="Your email"
                        fullWidth
                        value={ email }
                        onChange={ handleChangeMail }
                        error={ AUTH_HAS_ERROR_MESSAGE.email }
                        helperText={ AUTH_ERROR_MESSAGE.email }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle2" color="inherit" align='center'>
                        Remember password? <Link href={ PATH.LOGIN } color='inherit'>Login</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={ handleClickForgotPassword }
                        disabled={ AUTH.isLoading }
                        fullWidth
                        className={ classes.sendMailBtn }
                    >
                        Send mail
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    AUTH_HAS_ERROR_MESSAGE: selectAuthHasErrorMessages,
    AUTH_ERROR_MESSAGE: selectAuthErrorMessages
});

export default connect(mapStateToProps, null)(ForgotPasswordForm);
