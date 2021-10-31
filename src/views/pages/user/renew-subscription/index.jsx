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
import { Link } from '@material-ui/core';


const renewSubscriptionStyles = makeStyles(theme => ({
    container: {
        height: '90vh',
        marginTop: '2.9vh'
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

const RenewSubscription = () => 
{
    const classes = renewSubscriptionStyles();
    const history = useHistory();

    const [ isPlanTypeSet, setIsPlanTypeSet ] = useState(false);
    const [ planType, setPlanType ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ cardIndex, setCardIndex ] = useState(0);
    const [ isPaymentAuthorizationSent, setIsPaymentAuthorizationSent ] = useState(true);

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
                />
            );
        }
    }

    useEffect(() => 
    {
        return () => {
            setIsLoading(false);
            setPlanType('');
            setAmount('');
            setIsPlanTypeSet(false);
            setIsPaymentAuthorizationSent(false);
        }
    }, []);
    

    return (
        <Container maxWidth="md" className={ classes.container } >
            <Grid container spacing={ 5 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h4" color="initial" gutterBottom>
                        <strong>Renew Subscription</strong>
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    { displayComponent() }
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="default"
                                disabled={ isLoading }
                                onClick={ handleClickCancel }
                            >
                                { `${ !isPaymentAuthorizationSent ? 'Cancel' : 'Go back' }` }
                            </Button>
                        </Grid>
                        {
                            (isPlanTypeSet && !isPaymentAuthorizationSent ) && (
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        color="default"
                                        disabled={ isLoading }
                                        onClick={ handleClickResetPlanType }
                                    >
                                        Previous
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
export default RenewSubscription
