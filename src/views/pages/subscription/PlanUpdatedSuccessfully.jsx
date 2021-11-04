import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import PATH from '../../../routes/path';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WarningIcon from '@material-ui/icons/Warning';
import * as QueryParam from '../../../utils/queryParams'
import * as SUBSCRIPTION_API from '../../../services/subscription'
import PropagateLoader from 'react-spinners/PropagateLoader';
import Colors from '../../../constants/Colors';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { connect } from 'react-redux';

const planUpdatedSucessfullyUseStyles = makeStyles(theme => ({
    container: {
        height: '80vh'
    },
    cardMembeshipIcon: {
        fontSize: '10rem'
    },
    errorIcon: {
        fontSize: '10rem',
        color: Colors.warning
    },
    errorMessageContainer: {
        textAlign: 'center'
    },
    loginBtn: {
        backgroundColor: Colors.netflixRed,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.netflixRed,
            fontWeight: 'bold'
        }
    },
    propagateLoader: {
        color: Colors.white,
        marginBottom: '2rem'
    },
    propagateLoaderContainer: {
        textAlign: 'center'
    },
    processingText: {
        marginTop: '2rem',
        textAlign: 'center'
    },
}));


const PlanUpdatedSuccessfully = ({ AUTH }) => 
{
    const history = useHistory();
    const classes = planUpdatedSucessfullyUseStyles();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ hasError, setHasError ] = useState(false);

    const handleClickLogin = () => {
        !AUTH.isAuthenticated ? history.push(PATH.LOGIN) : history.push(PATH.PROFILE_HOME_PAGE);
        history.go(0);
    }

    const onLoadSubscribeUser = async (userEmail, type) => 
    {
        setIsLoading(true);
        try {
            await SUBSCRIPTION_API.updateAsync({ user_email: userEmail, type });
            setHasError(false);
        } catch (error) {
            console.log(error);
            setHasError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => 
    {
        const userEmail = QueryParam.get('email');
        const type = QueryParam.get('type');

        if (userEmail && type) {
            onLoadSubscribeUser(userEmail, type);
        }

        return () => {
            setIsLoading(true);
            setHasError(false);
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
                {
                    (!isLoading && hasError) && (
                        <Grid item className={ classes.errorMessageContainer }>
                            <WarningIcon className={ classes.errorIcon } />
                            <Typography variant="h4" color="initial" align='center'>
                                <strong>Invalid Source</strong>
                            </Typography>
                            <Typography variant="subtitle1" color="initial" align='center'>
                                The source you've entered has already expired.
                            </Typography>
                        </Grid>
                    )
                }
                {
                    (!isLoading && !hasError) && (
                        <Grid item>
                            <SubscriptionsIcon className={ classes.cardMembeshipIcon } />
                        </Grid>
                    )
                }
                <Grid item>
                    {
                        (!isLoading && !hasError) && (
                            <>
                                <Typography variant="h4" color="initial" gutterBottom>
                                    Account Subscription Updated Successfully
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    onClick={ handleClickLogin }
                                    className={ classes.loginBtn }
                                >
                                    { `${ !AUTH.isAuthenticated ? 'LOGIN TO YOUR ACCOUNT' : 'HOME' }` }
                                </Button>
                            </>
                        )
                    }
                    {
                        isLoading && (
                            <>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } className={ classes.propagateLoaderContainer }>
                                    <Grid container spacing={1} direction='column' alignItems='center'>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <PropagateLoader size={ 25 } className={ classes.propagateLoader } color={ Colors.info } />
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <Typography variant="h6" color="initial" className={ classes.processingText }>Updating Subscriptions</Typography>
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <PropagateLoader size={ 25 } className={ classes.propagateLoader } color={ Colors.info } />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PlanUpdatedSuccessfully)
