import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import Colors from '../../../../constants/Colors';
import * as PAYMENT_METHOD_API from '../../../../services/payment-method/payment.method'
import { useHistory } from 'react-router'
import PATH from '../../../../routes/path';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../../../../redux/modules/auth/selector';
import { connect } from 'react-redux';

const cardPaymentUseStyles = makeStyles(theme => ({
    continueBtn: {
        padding: '1rem 0',
        backgroundColor: Colors.success,
        color: Colors.white,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.success,
            opacity: 0.95
        }
    },
    titleHeader: {
        marginBottom: '2rem'
    }
}));

const CARD_DETAILS_DEFAULT_PROPS = 
{
    payment_intent_id: '',
    card_number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    plan_type: ''
}

const ERROR_MESSAGE_PROPS = {
    first_name: "",
    last_name: "",
    card_number: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
    phone_number: ""
};

const CardPayment = ({ AUTH, planType, paymentIntentId, action = 'POST' }) => 
{
    const user = AUTH.user;

    const classes = cardPaymentUseStyles();
    const history = useHistory();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ cardDetails, setCardDetails ] = useState({ ...CARD_DETAILS_DEFAULT_PROPS, 
        payment_intent_id: paymentIntentId,
        first_name: user.first_name,
        last_name: user.last_name
    });
    const [ errorMessage, setErrorMessage ] = useState(ERROR_MESSAGE_PROPS);

    const handleChange = (e) => setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

    const handleClickAttachPayment = async () =>
    {
        setErrorMessage(ERROR_MESSAGE_PROPS);
        setIsLoading(true);
        try {
            const { status } = await PAYMENT_METHOD_API.attachPaymentMethodToIntentAsync({
                ...cardDetails,
                plan_type: planType,
                email: user.email
            });

            if (status === 'success') 
            {
                const subscriptionPath = action === 'POST' ? 'subscribed-successfully' : 'updated-successfully';

                const queryParam = `?email=${ user.email }&type=${ planType }&paymentMethod=Card`;
                const path = `/subscriptions/${ subscriptionPath + queryParam }`;

                history.push(path, {
                    email: user.email,
                    type: planType,
                    paymentMethod: 'Card'
                });
            }
        } catch (error) {
            if (typeof error.message === 'string') 
            {
                const errors = JSON.parse(error.message)
                    .errors
                    .map(err => ({
                        [err.source.attribute]: err.detail.substring(err.detail.indexOf('must'))
                    }))
                    .reduce((errs, err) => ({ ...errs, ...err }), {});

                setErrorMessage(errors);
            }

            if (typeof error.message === 'object') {
                setErrorMessage(error.message);
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        return () => {
            setCardDetails(CARD_DETAILS_DEFAULT_PROPS);
            setIsLoading(false);
            setErrorMessage(ERROR_MESSAGE_PROPS);
        }
    }, []);

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" color="initial" gutterBottom className={ classes.titleHeader }>
                <strong>Set up your debit or credit card</strong>
            </Typography>
            <Grid container spacing={ 4 } justify='center'>
                <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
                    <TextField
                        name='first_name'
                        label='First Name'
                        variant='outlined'
                        fullWidth
                        value={ cardDetails.first_name }
                        onChange={ handleChange }
                        error={ Boolean(errorMessage.first_name) }
                        helperText={ errorMessage.first_name }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
                    <TextField
                        name='last_name'
                        label='Last Name'
                        variant='outlined'
                        fullWidth
                        value={ cardDetails.last_name }
                        onChange={ handleChange }
                        error={ Boolean(errorMessage.last_name) }
                        helperText={ errorMessage.last_name }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <TextField
                        name='phone_number'
                        label='Phone Number'
                        variant='outlined'
                        fullWidth
                        value={ cardDetails.phone_number }
                        onChange={ handleChange }
                        error={ Boolean(errorMessage.phone_number) }
                        helperText={ errorMessage.phone_number }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <TextField
                        name='card_number'
                        label='Card Number'
                        variant='outlined'
                        fullWidth
                        value={ cardDetails.card_number }
                        onChange={ handleChange }
                        error={ Boolean(errorMessage.card_number) }
                        helperText={ errorMessage.card_number }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                    <TextField
                        name='exp_month'
                        label='Expiration Month'
                        variant='outlined'
                        fullWidth
                        value={ cardDetails.exp_month }
                        onChange={ handleChange }
                        error={ Boolean(errorMessage.exp_month) }
                        helperText={ errorMessage.exp_month }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                    <TextField
                        name='exp_year'
                        label='Expiration Year'
                        variant='outlined'
                        fullWidth
                        value={ cardDetails.exp_year }
                        onChange={ handleChange }
                        error={ Boolean(errorMessage.exp_year) }
                        helperText={ errorMessage.exp_year }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                    <TextField
                        name='cvc'
                        label='CVC'
                        variant='outlined'
                        fullWidth
                        value={ cardDetails.cvc }
                        onChange={ handleChange }
                        error={ Boolean(errorMessage.cvc) }
                        helperText={ errorMessage.cvc }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        className={ classes.continueBtn } 
                        onClick={ handleClickAttachPayment }
                        disabled={ isLoading }
                    >
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(CardPayment)
