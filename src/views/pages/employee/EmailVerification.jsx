import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useHistory, useParams } from 'react-router-dom'
import PATH from '../../../routes/path';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email';
import * as Cookies from './../../../utils/cookies'
import { useDispatch } from 'react-redux';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import * as QueryParam from './../../../utils/queryParams'

const emailVerificationUseStyles = makeStyles(theme => ({
    container: {
        height: '100vh'
    },
    emailIcon: {
        fontSize: '10rem'
    }
}));

const EmailVerification = () => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = emailVerificationUseStyles();

    const handleClickNavigateToLogin = () => history.push(PATH.LOGIN);

    return (
        <Container maxWidth="md">
            <Grid 
                container 
                spacing={ 5 } 
                direction='column'
                justify='center' 
                alignItems='center' 
                className={ classes.container }
            >
                <Grid item>
                    <EmailIcon className={ classes.emailIcon } />
                </Grid>
                <Grid item>
                    <Typography variant="h4" color="initial" gutterBottom>
                        Email verified successfully
                    </Typography>
                    <Button 
                        variant="outlined" 
                        color="default" 
                        fullWidth
                        onClick={ handleClickNavigateToLogin }
                    >
                        LOGIN TO YOUR ACCOUNT
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default EmailVerification
