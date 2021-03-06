import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {  useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'
import Colors from '../../../../constants/Colors';
import PaymentMethod from './PaymentMethod';
import PlanTypeList from './PlanTypeList';
import { Send } from '@material-ui/icons';
import { IconButton, Link } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import Forbidden from './../../errors/Forbidden';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const updatePlanSubscriptionStyles = makeStyles(theme => ({
    container: {
        marginTop: '1vh',
        height: '114vh',
        [theme.breakpoints.down('sm')]: {
            height: 'auto'
        }
    },
    currentSubscriptionType: {
        color: Colors.info
    },
    sendIcon: {
        fontSize: '8rem',
    },
    paymentAuthorizationSentContainer: {
        width: '100%',
        textAlign: 'center'
    },
    paymentAuthorizationText: {
        color: Colors.success,
        padding: '0 0.25rem'
    },
    link: {
        '&:hover': {
            textDecorationColor: Colors.white
        }
    }
}));

const planTypes = {
    basic: 0,
    standard: 1,
    premium: 2  
};

const UpdatePlanSubscription = ({ AUTH }) => 
{
    const classes = updatePlanSubscriptionStyles();
    const history = useHistory();

    const [ isPlanTypeSet, setIsPlanTypeSet ] = useState(false);
    const [ planType, setPlanType ] = useState(AUTH.subscription_details.type);
    const [ amount, setAmount ] = useState(AUTH.subscription_details.cost);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ cardIndex, setCardIndex ] = useState(planTypes[AUTH.subscription_details.type.toLowerCase()]);
    const [ isPaymentAuthorizationSent, setIsPaymentAuthorizationSent ] = useState(false);
    const [ isAllowedToAccessPage, setIsAllowedToAccessPage ] = useState(true);

    const handleClickCancel = () => history.goBack();

    const handleClickCardPlan = (index, planType, cost) => {
        setCardIndex(index);
        setPlanType(planType);
        setAmount(cost);
    }

    const handleClickResetPlanType = () => {
        setPlanType('');
        setIsPlanTypeSet(false);
    }

    const handleClickContinue = () => setIsPlanTypeSet(true);

    const displayComponent = () =>
    {
        if (isPaymentAuthorizationSent) {
            return (
                <Grid container spacing={1} justify='center' className={ classes.paymentAuthorizationSentContainer }>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Send className={ classes.sendIcon } />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant="subtitle1" color="textSecondary">
                            A 
                            <Link href='https://mail.google.com/mail/u/0/' target='_blank' className={ classes.link }>
                                <strong className={ classes.paymentAuthorizationText }>Payment Authorization</strong>
                            </Link> 
                            is sent through your gmail 
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        if (! isPlanTypeSet) {
            return (
                <PlanTypeList 
                    cardIndex={ cardIndex } 
                    handleClickCardPlan={ handleClickCardPlan } 
                    handleClickContinue={ handleClickContinue }
                />
            );
        }

        if (isPlanTypeSet) {
            return (
                <PaymentMethod 
                    planType={ planType } 
                    amount={ amount } 
                    setIsPaymentAuthorizationSent={ setIsPaymentAuthorizationSent } 
                    isLoading={ isLoading }
                    setIsLoading={ setIsLoading }
                />
            );
        }
    }

    useEffect(() => 
    {
        if (AUTH.subscription_details.status !== 'subscribed') {
            setIsAllowedToAccessPage(false);
        }

        return () => {
            setIsLoading(false);
            setPlanType('');
            setAmount('');
            setIsPlanTypeSet(false);
            setIsPaymentAuthorizationSent(false);
            setIsAllowedToAccessPage(true);
        }
    }, []);
    
    if (! isAllowedToAccessPage) {
        return (
            <Container maxWidth="lg" style={{ height: '80vh' }}>
                <Forbidden />
            </Container>
        )
    }

    return (
        <Container maxWidth="md" className={ classes.container }>
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Grid container spacing={1}>
                        <Grid item>
                            <IconButton onClick={ () => history.goBack() }>
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" color="initial">
                                <strong>Change Streaming Plan</strong>
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                Current Plan: <strong className={ classes.currentSubscriptionType }>{ AUTH.subscription_details.type }</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    { displayComponent() }
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <Grid container spacing={1}>
                        {
                            isPaymentAuthorizationSent && (
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        color="default"
                                        disabled={ isLoading }
                                        onClick={ handleClickCancel }
                                    >
                                        Go back
                                    </Button>
                                </Grid>
                            )
                        }
                        {
                            (isPlanTypeSet && !isPaymentAuthorizationSent ) && (
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        color="default"
                                        disabled={ isLoading }
                                        onClick={ handleClickResetPlanType }
                                    >
                                        Get back
                                    </Button>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(UpdatePlanSubscription)
