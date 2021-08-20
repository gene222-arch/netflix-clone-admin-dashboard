import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button'
import Colors from '../../../../constants/Colors';
import { grey } from '@material-ui/core/colors';
import BACKGROUND_IMG from './../../../../assets/images/app/Netflix-Background.jpg'
import Header from '../../../../components/app/Header';
import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        width: '100%',
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ BACKGROUND_IMG })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    container: {
        height: '85vh'
    },
    email: {
        backgroundColor: Colors.white,
        color: '#000000'
    },
    getStartedBtn: {
        height: '100%',
        backgroundColor: Colors.netflixRed,
        color: Colors.white
    },
    inputContainer: {
    },
    text: {
        textAlign: 'center',
        color: Colors.white
    }
}));

const GetStarted = () => 
{
    const classes = useStyles();
    const history = useHistory();

    const [ email, setEmail ] = useState('');
 
    const handleClickGetStarted = () => {
        history.push(PATH.ALLOW_ACCESS_TO_LOCATION, {
            email
        });
    }

    return (
       <Container maxWidth="xl" className={ classes.root }>
            <Header />
            <Grid container alignItems='center' className={ classes.container }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h2" color="initial" className={ classes.text }>
                        <strong>Unlimited movies, TV</strong>
                    </Typography>
                    <Typography variant="h2" color="initial" className={ classes.text }>
                        <strong>shows, and more.</strong>
                    </Typography>
                    <Typography variant="h5" color="initial" className={ classes.text }>
                        Watch anywhere. Cancel anytime.
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="subtitle1" color="initial" className={ classes.text }>
                        Ready to watch? Enter your email to create or restart your membership.
                    </Typography>
                    <Grid container justify='center' className={ classes.inputContainer }>
                        <Grid item xs={ 12 } sm={ 12 } md={ 9 } lg={ 9 }>
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
                                onChange={ e => setEmail(e.target.value) }
                            />
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="default" 
                                className={ classes.getStartedBtn }
                                onClick={ handleClickGetStarted }
                            >
                                <Typography variant="h6" color="initial">Get Started</Typography> <ChevronRightIcon />
                            </Button>
                        </Grid>
                    </Grid>            
                </Grid>
            </Grid>
       </Container>
    )
}

export default GetStarted
