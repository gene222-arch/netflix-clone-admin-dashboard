import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'
import G_CASH_LOGO from './../../../assets/images/app/gcash.png'
import GRAB_PAY_LOGO from './../../../assets/images/app/grabpay.png'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Colors from './../../../constants/Colors';
import { Card, CardContent } from '@material-ui/core';
import shadows from '@material-ui/core/styles/shadows';

const updatePasswordStyles = makeStyles(theme => ({
    card: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    container: {
        height: '90vh',
        marginTop: '2.9vh'
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
    paymentMethodImg: {
        width: '100%',
        height: '4.5rem',
        objectFit: 'contain'
    },
}));

const RenewSubscription = () => 
{
    const classes = updatePasswordStyles();
    const history = useHistory();

    const [ isLoading, setIsLoading ] = useState(false);

    const handleClickGcash = async () => 
    {
        try {
            
        } catch (error) {
            
        }
    }

    const handleClickGrabPay = async () => 
    {
        try {
            
        } catch (error) {
            
        }
    }

    const handleClickCancel = () => history.goBack();

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
    

    return (
        <Container maxWidth="md" className={ classes.container } >
            <Grid container spacing={ 5 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h4" color="initial" gutterBottom>
                        <strong>Renew Subscription</strong>
                    </Typography>
                </Grid>
                {
                    paymentMethods.map(({ type, logo, style, className, onClick }) => (
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
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="default"
                                disabled={ isLoading }
                                onClick={ handleClickCancel }
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(RenewSubscription)
