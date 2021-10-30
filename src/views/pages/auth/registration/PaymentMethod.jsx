import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { Grid, Card, CardContent, Link } from '@material-ui/core';
import { makeStyles, Typography, Button } from '@material-ui/core';
import Colors from '../../../../constants/Colors';
import G_CASH_LOGO from './../../../../assets/images/app/gcash.png'
import GRAB_PAY_LOGO from './../../../../assets/images/app/grabpay.png'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as PAYMENT_METHOD_API from './../../../../services/payment-method/payment.method'
import { PulseLoader, PropagateLoader } from 'react-spinners'
import shadows from '@material-ui/core/styles/shadows';
import { useHistory } from 'react-router-dom';

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
    authorizePaymentLink: {
        color: Colors.white
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

const PaymentMethod = ({ amount }) => 
{
    const classes = paymentMethodUseStyles();
    const history = useHistory();

    const [ paymentSource, setPaymentSource ] = useState(PAYMENT_SOURCE_DEFAULT_PROPS);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isPaymentProcessed, setIsPaymentProcessed ] = useState(false);

    const handleClickGcash = async () => 
    {
        setIsLoading(true);
        try {
            const { data } = await PAYMENT_METHOD_API.ePaymentAsync({ 
                amount, 
                type: 'gcash' 
            });

            setPaymentSource(data);
            setIsPaymentProcessed(true);
        } catch (error) {
            console.log(error);
            setIsPaymentProcessed(false);
        }
        setIsLoading(false);
    }

    const handleClickGrabPay = async () => 
    {
        setIsLoading(true);
        try {
            const { data } = await PAYMENT_METHOD_API.ePaymentAsync({ 
                amount, 
                type: 'grab_pay' 
            });

            setPaymentSource(data);
            setIsPaymentProcessed(true);
        } catch (error) {
            console.log(error);
            setIsPaymentProcessed(false);
        }
        setIsLoading(false);
    }

    const paymentMethods = 
    [
        {
            type: 'Gcash',
            logo: G_CASH_LOGO,
            style: {
                backgroundColor: Colors.info,
                color: Colors.dark,
                fontWeight: 'bold'
            },
            onClick: handleClickGcash
        },
        {
            type: 'Grab Pay',
            logo: GRAB_PAY_LOGO,
            style: {
                backgroundColor: Colors.white,
                color: Colors.dark,
                fontWeight: 'bold'
            },
            onClick: handleClickGrabPay
        }
    ];

    useEffect(() => {
        return () => {
            setIsLoading(false);
            setPaymentSource(PAYMENT_SOURCE_DEFAULT_PROPS);
            setIsPaymentProcessed(false);
        }
    }, []); 

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
                                    paymentMethods.map(({ type, logo, style, onClick }) => (
                                        <Card key={ type } style={ style } className={ classes.card } onClick={ onClick }>
                                            <CardContent>
                                                <Grid container justify='space-between' alignItems='center'>
                                                    <Grid item>
                                                        <Grid container alignItems='center'>
                                                            <Grid item>
                                                                <img src={ logo } width={ 100 } height={ 90 } />
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
                                >
                                    <Link 
                                        href={ paymentSource.redirect.checkout_url } 
                                        className={ classes.authorizePaymentLink }
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Authorize { paymentSource.type.toUpperCase() } Payment
                                    </Link>
                                </Button>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Just one click away to start streaming unlimited movies.
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
