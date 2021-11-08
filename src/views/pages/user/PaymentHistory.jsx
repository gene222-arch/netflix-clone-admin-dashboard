import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectAuthUserSubscriptions, selectSubscription } from './../../../redux/modules/subscription/selector';
import * as SUBSCRIPTION_ACTION from './../../../redux/modules/subscription/actions';
import { connect, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container'
import MaterialTable from './../../../components/styled-components/MaterialTable';
import SubscriptionChip from './../../../components/SubscriptionChip';
import { makeStyles, Typography } from '@material-ui/core';
import Colors from './../../../constants/Colors';
import { selectAuth } from './../../../redux/modules/auth/selector';

const paymentHistoryUseStyles = makeStyles(theme => ({
    container: {
        height: '90vh'
    },
    headerTitle: {
        marginBottom: '2rem'
    }
}));

const PaymentHistory = ({ AUTH, SUBSCRIPTION, PAYMENT_HISTORY }) => 
{
    const classes = paymentHistoryUseStyles();
    const dispatch = useDispatch();

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'Subscription date', field: 'subscribed_at', searchable: false },
        { title: 'Type', field: 'type' },
        { title: 'Cost', field: 'cost', render: (({ cost }) => `P${ cost.toFixed(2) }`) },
        { title: 'Expiration date', field: 'expired_at' },
        { 
            title: 'Status', 
            field: 'status',
            render: (({ status }) => <SubscriptionChip status={ status } /> )
        }
    ];

    useEffect(() => {
        dispatch(SUBSCRIPTION_ACTION.fetchSubscriptionByUserIdStart());
    }, []);

    return (
        <Container maxWidth="lg" className={ classes.container }>
            <Typography variant="h4" color="initial" className={ classes.headerTitle }>
                <strong>{ AUTH.user.first_name }'s Payment History</strong>
            </Typography>
            <MaterialTable 
                title=''
                columns={ columns }      
                data={ PAYMENT_HISTORY }
                isLoading={ SUBSCRIPTION.isLoading }
                options={{ 
                    selection: false,
                    loadingType: 'linear',
                    headerStyle: {
                        backgroundColor: Colors.dark
                    }
                }}
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    SUBSCRIPTION: selectSubscription,
    PAYMENT_HISTORY: selectAuthUserSubscriptions
});

export default connect(mapStateToProps)(PaymentHistory)
