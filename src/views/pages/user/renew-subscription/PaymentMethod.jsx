import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import G_CASH_LOGO from './../../../../assets/images/app/gcash.png'
import GRAB_PAY_LOGO from './../../../../assets/images/app/grabpay.png'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Colors from '../../../../constants/Colors';
import { Card, CardContent } from '@material-ui/core';
import * as PAYMENT_METHOD_API from '../../../../services/payment-method/payment.method'
import PropagateLoader from 'react-spinners/PropagateLoader';
import { selectAuth } from './../../../../redux/modules/auth/selector';
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions';
import * as CONFIRMATION_ACTION from './../../../../redux/modules/confirm/actions';
import CARD_LOGO from './../../../../assets/images/app/card.png';
import CardPayment from './../update-plan-subscription/CardPayment';

const paymentMethodStyles = makeStyles(theme => ({
    card: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    cardPayment: {
        backgroundColor: Colors.white,
        color: Colors.dark,
        fontWeight: 'bold'
    },
    chevronRightIcon: {
        fontSize: '2.5rem'
    },
    gcash: {
        backgroundColor: Colors.info,
        color: Colors.dark,
        fontWeight: 'bold'
    },
    grabPay: {
        backgroundColor: Colors.white,
        color: Colors.dark,
        fontWeight: 'bold'
    },
    loadingContainer: {
        width: '100%',
        textAlign: 'center',
        padding: '10rem'
    },
    paymentMethodImg: {
        width: 130,
        height: 90,
        objectFit: 'contain'
    },
    processingPaymentText: {
        marginTop: '1.25rem'
    }
}));

const PaymentMethod = ({ AUTH, planType, amount, setIsPaymentAuthorizationSent, isLoading, setIsLoading }) => 
{
    const classes = paymentMethodStyles();
    const dispatch = useDispatch();

    const [ paymentIntentId, setPaymentIntentId ] = useState('');
    const [ paymentMethod, setPaymentMethod ] = useState('');

    const handleCardPayment = async () => 
    {
        setIsLoading(true);
        try {
            const { data } = await PAYMENT_METHOD_API.storePaymentIntentAsync({ amount });
            setPaymentIntentId(data.id);
            setPaymentMethod('Card');
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const handleClickGcash = async () => 
    {
        setIsLoading(true);
        try {
            const gcashPayload = { 
                email: AUTH.user.email, 
                type: planType, 
                amount, 
                type: 'gcash' ,
                send_payment_authorization_notif: true,
                payment_method: 'Gcash'
            };

            await PAYMENT_METHOD_API.ePaymentAsync(gcashPayload);
            dispatch(AUTH_ACTION.updatePaymentAuthorizationStatus({ payment_authorization_status: 'sent' }));
            setIsPaymentAuthorizationSent(true);
        } catch (error) {
            console.log(error);
            setIsPaymentAuthorizationSent(false);
        }
        setIsLoading(false);
    }

    const handleClickGrabPay = async () => 
    {
        setIsLoading(true);
        try {
            const grabPayPayload = { 
                email: AUTH.user.email, 
                type: planType, 
                amount, 
                type: 'grab_pay',
                send_payment_authorization_notif: true,
                payment_method: 'Grab Pay'
            };

            await PAYMENT_METHOD_API.ePaymentAsync(grabPayPayload);
            dispatch(AUTH_ACTION.updatePaymentAuthorizationStatus({ payment_authorization_status: 'sent' }));

            setIsPaymentAuthorizationSent(true);
        } catch (error) {
            console.log(error);
            setIsPaymentAuthorizationSent(false);
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
            confirmCallback: () => handleClickGcash()
        }));
    }

    const handleClickGrabPayConfirmation = () => {
        dispatch(CONFIRMATION_ACTION.showConfirmationDialog({
            mainHeader: `Pay through Grab Pay?`,
            subHeader: 'Once confirmed, a Grab Pay payment authorization will be sent to you that is valid within an hour. If an hour passes the email sent to you will be rendered useless.',
            confirmCallback: () => handleClickGrabPay()
        }));
    }

    const paymentMethods = 
    [
        {
            type: 'Credit or Debit Card',
            logo: CARD_LOGO,
            className: classes.cardPayment,
            onClick: handleClickCardConfirmation
        },
        {
            type: 'Gcash',
            logo: G_CASH_LOGO,
            className: classes.gcash,
            onClick: handleClickGcashConfirmation
        },
        {
            type: 'Grab Pay',
            logo: GRAB_PAY_LOGO,
            className: classes.grabPay,
            onClick: handleClickGrabPayConfirmation
        }
    ];

    useEffect(() => 
    {
        return () => {
            setIsLoading(false);
        }
    }, []);
    

    if (isLoading) 
    {
        return (
            <Grid container spacing={1} justify='center' className={ classes.loadingContainer }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <PropagateLoader size={ 20 } color={ Colors.info } />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="subtitle1" color="initial" className={ classes.processingPaymentText }>Processing Payment</Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <PropagateLoader size={ 20 } color={ Colors.info } />
                </Grid>
            </Grid>
        )
    }

    if (paymentMethod === 'Card') {
        return (
            <CardPayment 
                planType={ planType }
                paymentIntentId={ paymentIntentId }
            />
        )
    }

    return (
        <Grid container spacing={ 5 }>
        {
            paymentMethods.map(({ type, logo, className, onClick }) => (
                <Grid key={ type } item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 } onClick={ onClick }>
                    <Card className={ `${ className } ${ classes.card }` }>
                        <CardContent>
                            <Grid container spacing={1} alignItems='center' justify='space-between'>
                                <Grid item>
                                    <Grid container spacing={1} alignItems='center'>
                                        <Grid item>
                                            <img src={ logo } className={ `${ classes.paymentMethodImg }` }/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" color="initial">
                                                { type }
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
                </Grid>
            ))
        }
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PaymentMethod)
