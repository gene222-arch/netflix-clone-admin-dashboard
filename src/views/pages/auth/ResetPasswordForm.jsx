import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

/** Material UI Components */
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

/** Material Icons */
import UpdateIcon from '@material-ui/icons/Update';
import LockIcon from '@material-ui/icons/Lock';

/** Components */
import AlertPopUp from '../../../components/AlertPopUp';

/** Actions */
import * as AUTH from '../../../redux/modules/auth/actions'
import * as ALERT from '../../../redux/modules/alert/actions'

/** Auth selectors */
import { selectAuth } from '../../../redux/modules/auth/selector';

/** Alert selector */
import { selectAlert } from '../../../redux/modules/alert/selector';

/** Utils */
import * as QueryParam from '../../../utils/queryParams'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'



const CREDENTIALS_DEFAULT = {
    email: QueryParam.get('email'),
    password: '',
    password_confirmation: '',
    token: QueryParam.get('token')
};

const resetPasswordUseStyles = makeStyles((theme) => ({
    lockIcon: {
        fontSize: '4rem'
    }
}))

const ResetPasswordForm = ({ alert, auth }) => 
{
    const classes = resetPasswordUseStyles();
    const { error } = auth;
    const dispatch = useDispatch();

    const [ credentials, setCredentials ] = useState(CREDENTIALS_DEFAULT);

    const handleChangeCredentials = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
    const handleClickChangePassword = () => dispatch(AUTH.resetPassword(credentials));

    return (
        <>
            <Container maxWidth="sm">
                <AlertPopUp 
                    status={ alert.status }
                    message={ alert.message }
                    open={ alert.isOpen }
                    handleClickCloseAlert={ () => dispatch(ALERT.hideAlert()) }
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h4" color="initial" align="center">
                            <LockIcon className={ classes.lockIcon }/><UpdateIcon />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h4" color="initial">
                            Create new password 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="subtitle1" color="textSecondary">
                            You new password must be different from your previous password for security.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            error={ Boolean(error.email) }
                            helperText={ error.email }
                            label="Your email"
                            fullWidth
                            value={ credentials.email }
                            onChange={ handleChangeCredentials }
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            error={ Boolean(error.password) }
                            helperText={ error.password }
                            name='password'
                            label="Password"
                            type='password'
                            fullWidth
                            value={ credentials.password }
                            onChange={ handleChangeCredentials }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            name='password_confirmation'
                            label="Password Confirmation"
                            type='password'
                            fullWidth
                            value={ credentials.password_confirmation }
                            onChange={ handleChangeCredentials }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth
                            onClick={ handleClickChangePassword }
                            disabled={ auth.isLoading }
                        >
                            Change password
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    alert: selectAlert,
    auth: selectAuth
});

export default connect(mapStateToProps, null)(ResetPasswordForm);
