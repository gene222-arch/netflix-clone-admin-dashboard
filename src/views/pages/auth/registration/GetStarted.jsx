import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button'
import Colors from '../../../../constants/Colors';
import { grey } from '@material-ui/core/colors';
import BACKGROUND_IMG from './../../../../assets/images/app/Netflix-Background.jpg'
import AuthLayoutHeader from '../../../../components/app/AuthLayoutHeader';
import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path'

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: '3rem'
    },
    email: {
        backgroundColor: Colors.white,
        color: '#000000',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    errorText: {
        color: Colors.warningMain,
        paddingLeft: theme.spacing(1)
    },
    getStartedBtn: {
        backgroundColor: Colors.netflixRed,
        color: Colors.white,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.netflixRed
        }
    },
    inputContainer: {
    },
    text: {
        textAlign: 'center'
    }
}));

const GetStarted = () => 
{
    const classes = useStyles();
    const history = useHistory();

    const [ email, setEmail ] = useState('');
    const [ hasError, setHasError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleChangeEmail = (e) => 
    {
        const text = e.target.value;
        setEmail(text);
        const isValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (! text.length) {
            setErrorMessage('Email is required');
            setHasError(true);
        }
        
        if (text.length && text.length < 5) {
            setErrorMessage('Email should be between 5 and 50 characters');
            setHasError(true);
        }

        if (text.length >= 5 && !text.match(isValid)) {
            setErrorMessage('Please enter a valid email address');
            setHasError(true);
        }

        if (text.length && text.length >= 5 && text.match(isValid)) {
            setErrorMessage('');
            setHasError(false);
        }
    }

    const handleClickGetStarted = () => 
    {
        if (! email.length) {
            setHasError(true);
            setErrorMessage('Email is required');
        }

        if (! hasError && email.length) 
        {
            setHasError(false);
            setErrorMessage('');

            history.push(PATH.ALLOW_ACCESS_TO_LOCATION, {
                email
            });
        }
    }


    useEffect(() => {
        return () => {
            setEmail('');
            setHasError(false);
            setErrorMessage('');
        }
    }, []);
    

    return (
        <Container maxWidth='xl'>
            <Grid container alignItems='center' className={ classes.container }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Grid container spacing={3} direction='column'>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Typography variant="h2" color="initial" className={ classes.text }>
                                <strong>Unlimited</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Typography variant="h2" color="initial" className={ classes.text }>
                                <strong>movies, and more.</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Typography variant="h5" color="textSecondary" className={ classes.text }>
                                Watch anywhere. Cancel anytime.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Grid container spacing={3}>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Typography variant="subtitle1" color="initial" className={ classes.text }>
                                Ready to watch? Enter your email to create or restart your membership.
                            </Typography>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Grid container justify='center' className={ classes.inputContainer }>
                                <Grid item xs={ 12 } sm={ 10 } md={ 7 } lg={ 7 }>
                                    <TextField
                                        id="email-address"
                                        label="Email address"
                                        variant='filled'
                                        className={ classes.email }
                                        InputLabelProps={{
                                            style: { 
                                                color: grey[500]
                                            }, 
                                        }}
                                        InputProps={{
                                            style: {
                                                color: '#000000'
                                            }
                                        }}
                                        fullWidth
                                        value={ email }
                                        onChange={ handleChangeEmail }
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="default" 
                                        fullWidth
                                        className={ classes.getStartedBtn }
                                        onClick={ handleClickGetStarted }
                                    >
                                        <Typography variant="h6" color="initial">
                                            <strong>Get Started</strong>
                                        </Typography>
                                    </Button>
                                    {
                                        hasError && (
                                            <Typography variant="subtitle2" className={ classes.errorText }>
                                                { errorMessage }
                                            </Typography>
                                        )
                                    }
                                </Grid>
                            </Grid>            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GetStarted
