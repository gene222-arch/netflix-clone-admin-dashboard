import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

/** Material UI Components */
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from '@material-ui/core';
import Key from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';

/** Actions */
import * as AUTH from '../../../redux/modules/auth/actions'

/** Selector */
import { selectAuth } from './../../../redux/modules/auth/selector';

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

/** Routes */
import PATH from './../../../routes/path';




const forgotPasswordUseStyles = makeStyles((theme) => ({
    forgotPasswordContainer: {
        marginTop: theme.spacing(3)
    }
}))


const ForgotPasswordForm = ({ auth }) => 
{
    const classes = forgotPasswordUseStyles();
    const { error } = auth;
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState('');

    const handleChangeMail = (e) => setEmail(e.target.value);
    
    const handleClickForgotPassword = () =>dispatch(AUTH.forgotPassword({ email }));

    return (
        <>
            <Container maxWidth="sm">
                <Grid container spacing={1} justify='center'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h4" color="initial" align='center'>
                            <Key />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h4" color="initial" align='center' gutterBottom={true}>
                            Forgot your password?
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
                            error={ Boolean(error.email) }
                            helperText={ error.email }
                            label="Your email"
                            fullWidth
                            value={ email }
                            onChange={ handleChangeMail }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle2" color="inherit" align='center'>
                            Remember password? <Link href={ PATH.LOGIN }>Login</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={ handleClickForgotPassword }
                            disabled={ auth.isLoading }
                            fullWidth
                        >
                            Send mail
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: selectAuth
});

export default connect(mapStateToProps, null)(ForgotPasswordForm);
