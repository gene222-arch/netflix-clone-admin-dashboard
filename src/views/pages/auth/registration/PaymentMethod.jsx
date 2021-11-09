import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles, Typography, Button } from '@material-ui/core';
import Colors from '../../../../constants/Colors';
import G_CASH_LOGO from './../../../../assets/images/app/gcash.png'
import GRAB_PAY_LOGO from './../../../../assets/images/app/grabpay.png'
import CARD_LOGO from './../../../../assets/images/app/card.png'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as PAYMENT_METHOD_API from './../../../../services/payment-method/payment.method'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useHistory, useLocation } from 'react-router-dom';
import PATH from './../../../../routes/path';
import CardPayment from './CardPayment';
import * as CONFIRMATION_ACTION from './../../../../redux/modules/confirm/actions'
import { useDispatch } from 'react-redux';

const paymentMethodUseStyles = makeStyles(theme => ({
    authorizedBtnContainer: {
        marginTop: '12.5rem'
    },
    authorizedPaymentBtn: {
        height: '3.5rem',
        fontWeight: 'bold',
        backgroundColor: Colors.success,
        marginBottom: '1rem'
    },
    checkIcon: {
        color: Colors.netflixRed
    },
    chevronRightIcon: {
        fontSize: '2.5rem'
    },
    card: {
        width: '100%',
        height: '7rem',   
        '& :hover': {
            cursor: 'pointer'
        },
        marginBottom: '1rem'
    },
    propagateLoader: {
        color: Colors.white
    },
    propagateLoaderContainer: {
        textAlign: 'center',
        marginTop: '12.5rem'
    },
    processingText: {
        marginTop: '2rem'
    },

}));

const PAYMENT_SOURCE_DEFAULT_PROPS = {
    amount: '',
    billing: null,
    created_at: '',
    currency: 'PHP',
    description: null,
    id: '',
    livemode: false,
    redirect: {
        checkout_url: '', 
        failed: '', 
        success: ''
    },
    source_type: '',
    statement_descriptor: null,
    status: '',
    type: '',
    updated_at: ''
}

const PaymentMethod = ({ planType, amount }) => 
{
    const classes = paymentMethodUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { state } = useLocation();

    const [ paymentSource, setPaymentSource ] = useState(PAYMENT_SOURCE_DEFAULT_PROPS);
    const [ paymentIntentId, setPaymentIntentId ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isPaymentProcessed, setIsPaymentProcessed ] = useState(false);
    const [ paymentMethod, setPaymentMethod ] = useState('');

    const handleCardPayment = async () => 
    {
        setIsLoading(true);
        try {
            const { data } = await PAYMENT_METHOD_API.storePaymentIntentAsync({ amount });
            setPaymentIntentId(data.id);
            setIsPaymentProcessed(true);
            setPaymentMethod('Card');
        } catch (error) {
            console.log(error);
            setIsPaymentProcessed(false);
        }
        setIsLoading(false);
    }

    const handleGcashPayment = async () => 
    {
        setIsLoading(true);
        try {
            const { data } = await PAYMENT_METHOD_API.ePaymentAsync({ 
                amount, 
                type: 'gcash',
                email: state?.email,
                payment_method: 'Gcash'
            });

            setPaymentSource(data);
            setIsPaymentProcessed(true);
            setPaymentMethod('Gcash');
        } catch (error) {
            console.log(error);
            setIsPaymentProcessed(false);
        }
        setIsLoading(false);
    }

    const handleGrabPayPayment = async () => 
    {
        setIsLoading(true);
        try {
            const { data } = await PAYMENT_METHOD_API.ePaymentAsync({ 
                amount, 
                type: 'grab_pay',
                email: state?.email,
                payment_method: 'Grab Pay'
            });

            setPaymentSource(data);
            setIsPaymentProcessed(true);
            setPaymentMethod('Grab Pay');
        } catch (error) {
            console.log(error);
            setIsPaymentProcessed(false);
        }
        setIsLoading(false);
    }

    const handleClickCardConfirmation = () => {
        dispatch(CONFIRMATION_ACTION.showConfirmationDialog({
            mainHeader: `Pay through Card?`,
            subHeader: '',
            confirmCallback: () => handleCardPayment()
        }));
    }

    const handleClickGcashConfirmation = () => {
        dispatch(CONFIRMATION_ACTION.showConfirmationDialog({
            mainHeader: `Pay through Gcash?`,
            subHeader: 'Once confirmed, a Gcash payment authorization will be sent to you that is valid within an hour. If an hour passes the email sent to you will be rendered useless.',
            confirmCallback: () => handleGcashPayment()
        }));
    }

    const handleClickGrabPayConfirmation = () => {
        dispatch(CONFIRMATION_ACTION.showConfirmationDialog({
            mainHeader: `Pay through Grab Pay?`,
            subHeader: 'Once confirmed, a Grab Pay payment authorization will be sent to you that is valid within an hour. If an hour passes the email sent to you will be rendered useless.',
            confirmCallback: () => handleGrabPayPayment()
        }));
    }


    const handleClickContinue = () => 
    {
        history.push(PATH.REGISTER, { 
            ...state, 
            plan_type: planType, 
            check_out_url: paymentSource.redirect.checkout_url,
            payment_method: paymentMethod
        });
    }

    const paymentMethods = 
    [
        {
            type: 'Credit or Debit Card',
            logo: CARD_LOGO,
            style: {
                backgroundColor: Colors.white,
                color: Colors.dark,
                fontWeight: 'bold'
            },
            onClick: handleClickCardConfirmation,
            imgStyle: {
                width: 130,
                height: 80,
                objectFit: 'contain'
            }
        },
        {
            type: 'Gcash',
            logo: G_CASH_LOGO,
            style: {
                backgroundColor: Colors.info,
                color: Colors.dark,
                fontWeight: 'bold'
            },
            onClick: handleClickGcashConfirmation,
            imgStyle: {
                width: 130,
                height: 90,
                objectFit: 'contain'
            }
        },
        {
            type: 'Grab Pay',
            logo: GRAB_PAY_LOGO,
            style: {
                backgroundColor: Colors.white,
                color: Colors.dark,
                fontWeight: 'bold'
            },
            onClick: handleClickGrabPayConfirmation,
            imgStyle: {
                width: 130,
                height: 90,
                objectFit: 'contain'
            }
        }
    ];

    useEffect(() => {
        return () => {
            setIsLoading(false);
            setPaymentSource(PAYMENT_SOURCE_DEFAULT_PROPS);
            setIsPaymentProcessed(false);
            setPaymentMethod('');
        }
    }, []); 


    if (isPaymentProcessed && paymentIntentId) {
        return (
            <CardPayment 
                paymentMethod={ paymentMethod }
                planType={ planType } 
                paymentIntentId={ paymentIntentId } 
            />
        )
    }

    return (
        <Container maxWidth='xl'>
            <Container maxWidth='md'>
                <Grid container spacing={1} justify='center'>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant='subtitle2' gutterBottom>Step 3 of 4</Typography>
                        <Typography variant='h5' gutterBottom align='center'>
                            { !isLoading ? 'Set up your payment' : 'Setting up your payment...' }
                        </Typography>
                    </Grid>
                    {
                        (!isLoading && !isPaymentProcessed) && (
                            <Grid item xs={ 12 } sm={ 10 } md={ 8 } lg={ 8 }>
                                <Grid container spacing={ 2 }>
                                {
                                    paymentMethods.map(({ type, logo, style, imgStyle, onClick }) => (
                                        <Card key={ type } style={ style } className={ classes.card } onClick={ onClick }>
                                            <CardContent>
                                                <Grid container justify='space-between' alignItems='center'>
                                                    <Grid item>
                                                        <Grid container alignItems='center'>
                                                            <Grid item>
                                                                <img src={ logo } style={ imgStyle } />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant='h5' color='initial'>
                                                                    <strong>{ type }</strong>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <ChevronRightIcon className={ classes.chevronRightIcon } />        
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                                </Grid>
                            </Grid>
                        )
                    }
                    {
                        (isLoading && !isPaymentProcessed) && (
                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } className={ classes.propagateLoaderContainer }>
                                <PropagateLoader size={ 20 } className={ classes.propagateLoader } color={ Colors.info } />
                                <Typography variant="h6" color="initial" className={ classes.processingText }>Processing</Typography>
                            </Grid>
                        )
                    }
                    {
                        isPaymentProcessed && (
                            <Grid item xs={ 12 } sm={ 8 } md={ 8 } lg={ 8 } className={ classes.authorizedBtnContainer }>
                                <Button 
                                    variant="outlined" 
                                    color="default" 
                                    fullWidth 
                                    className={ classes.authorizedPaymentBtn }
                                    onClick={ handleClickContinue }
                                >
                                    Continue
                                </Button>
                                <Typography variant="subtitle2" color="textSecondary">
                                    An email for payment authorization will be sent to you after account registration.
                                </Typography>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        </Container>
    )
}


export default PaymentMethod
