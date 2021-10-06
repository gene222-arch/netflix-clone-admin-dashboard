import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useHistory, useParams } from 'react-router-dom'
import PATH from '../../../routes/path';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email';
import { useDispatch } from 'react-redux';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions'
import * as QueryParam from './../../../utils/queryParams'

const emailVerifiedMessageUseStyles = makeStyles(theme => ({
    container: {
        height: '100vh'
    },
    emailIcon: {
        fontSize: '10rem'
    }
}));

const EmailVerifiedMessage = () => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = emailVerifiedMessageUseStyles();
    const { id, hash } = useParams();

    const handleClickLogin = () => history.push(PATH.LOGIN);

    const onLoadVerifyEmail = () => 
    {
        const expires = QueryParam.get('expires');
        const signature = QueryParam.get('signature');

        console.log({id, hash, expires, signature});

        // if (id && hash && signature && expires) {
        //     dispatch(AUTH_ACTION.verifyEmailStart({ id, hash, expires, signature }));
        // }
    }

    useEffect(() => {
        onLoadVerifyEmail();

        return () => {

        }
    }, []);

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
                        onClick={ handleClickLogin }
                    >
                        LOGIN TO YOUR ACCOUNT
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default EmailVerifiedMessage
