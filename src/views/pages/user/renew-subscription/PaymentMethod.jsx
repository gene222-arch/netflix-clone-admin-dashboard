import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import G_CASH_LOGO from './../../../../assets/images/app/gcash.png'
import GRAB_PAY_LOGO from './../../../../assets/images/app/grabpay.png'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Colors from '../../../../constants/Colors';
import { Card, CardContent } from '@material-ui/core';
import * as PAYMENT_METHOD_API from '../../../../services/payment-method/payment.method'
import PropagateLoader from 'react-spinners/PropagateLoader';
import { selectAuth } from './../../../../redux/modules/auth/selector';

const paymentMethodStyles = makeStyles(theme => ({
    card: {
        '&:hover': {
            cursor: 'pointer'
        }
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
        width: '100%',
        height: '4.5rem',
        objectFit: 'contain'
    },
    processingPaymentText: {
        marginTop: '1.25rem'
    }
}));

const PaymentMethod = ({ AUTH, planType, amount, setIsPaymentAuthorizationSent }) => 
{
    const classes = paymentMethodStyles();

    const [ isLoading, setIsLoading ] = useState(false);

    const handleClickGcash = async () => 
    {
        setIsLoading(true);
        try {
            const gcashPayload = { 
                email: AUTH.user.email, 
                type: planType, 
                amount, 
                type: 'gcash' ,
                send_payment_authorization_notif: true
            };

            await PAYMENT_METHOD_API.ePaymentAsync(gcashPayload);

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
                send_payment_authorization_notif: true 
            };

            await PAYMENT_METHOD_API.ePaymentAsync(grabPayPayload);

            setIsPaymentAuthorizationSent(true);
        } catch (error) {
            console.log(error);
            setIsPaymentAuthorizationSent(false);
        }
        setIsLoading(false);
    }

    const paymentMethods = 
    [
        {
            type: 'Gcash',
            logo: G_CASH_LOGO,
            className: classes.gcash,
            onClick: handleClickGcash
        },
        {
            type: 'Grab Pay',
            logo: GRAB_PAY_LOGO,
            className: classes.grabPay,
            onClick: handleClickGrabPay
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
