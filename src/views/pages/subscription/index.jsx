import React,{ useEffect, useState } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as SUBSCRIPTION_ACTION from './../../../redux/modules/subscription/actions'; 
import { selectSubscription } from './../../../redux/modules/subscription/selector';
import MaterialTable from './../../../components/styled-components/MaterialTable';
import Container from '@material-ui/core/Container'
import SubscriptionChip from './../../../components/SubscriptionChip';
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import Colors from './../../../constants/Colors';
import TimerIcon from '@material-ui/icons/Timer';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';

const subscriptionsUseStyles = makeStyles(theme => ({
    generalDataContainer: {
        marginBottom: '1rem'
    },
    subscribedCard: {
        backgroundColor: Colors.success
    },
    pendingCard: {
        backgroundColor: Colors.warningMain
    },
    cancelledCard: {
        backgroundColor: Colors.error
    },
    cardIcon: {
        fontSize: '2.5rem'
    }
}))

const Subscriptions = ({ SUBSCRIPTION }) => 
{
    const classes = subscriptionsUseStyles();
    const dispatch = useDispatch();
    
    const subscribedCount = SUBSCRIPTION.subscriptions.filter(({ status }) => status === 'subscribed').length;
    const pendingCount = SUBSCRIPTION.subscriptions.filter(({ status }) => status === 'pending').length;
    const cancelledCount = SUBSCRIPTION.subscriptions.filter(({ status }) => status === 'cancelled').length;

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { title: 'Subscription date', field: 'subscribed_at', searchable: false },
        { title: 'Type', field: 'type' },
        { title: 'Cost', field: 'cost', render: (({ cost }) => `P${ cost.toFixed(2) }`) },
        {
            title: 'Subscriber', 
            field: 'user',
            render: (({ user }) => `${ user.first_name } ${ user.last_name }`)
        },
        { title: 'Expiration date', field: 'expired_at' },
        { 
            title: 'Status', 
            field: 'status',
            render: (({ status }) => <SubscriptionChip status={ status } /> )
        }
    ];

    useEffect(() => {
        dispatch(SUBSCRIPTION_ACTION.fetchAllSubscriptionsStart());
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={1} className={ classes.generalDataContainer }>
                <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
                    <Card className={ classes.subscribedCard }>
                        <CardContent>
                            <Grid container spacing={1} justify='space-between' alignItems='center'>
                                <Grid item>
                                    <Typography variant="h6" color="textSecondary">
                                        <strong>Subscribed</strong>
                                    </Typography>
                                    <Typography variant="h6" color="initial">
                                        <strong>{ subscribedCount }</strong>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <CardMembershipIcon className={ classes.cardIcon } />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
                      <Card className={ classes.pendingCard }>
                        <CardContent>
                            <Grid container spacing={1} justify='space-between' alignItems='center'>
                                <Grid item>
                                    <Typography variant="h6" color="textSecondary">
                                        <strong>Pending</strong>
                                    </Typography>
                                    <Typography variant="h6" color="initial">
                                        <strong>{ pendingCount }</strong>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <TimerIcon className={ classes.cardIcon } />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
                      <Card className={ classes.cancelledCard }>
                        <CardContent>
                            <Grid container spacing={1} justify='space-between' alignItems='center'>
                                <Grid item>
                                    <Typography variant="h6" color="textSecondary">
                                        <strong>Cancelled</strong>
                                    </Typography>
                                    <Typography variant="h6" color="initial">
                                        <strong>{ cancelledCount }</strong>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <UnsubscribeIcon className={ classes.cardIcon } />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <MaterialTable 
                title='Subscriptions'
                columns={ columns }      
                data={ SUBSCRIPTION.subscriptions }
                isLoading={ SUBSCRIPTION.isLoading }
                options={{ 
                    selection: false,
                    loadingType: 'linear'
                }}
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    SUBSCRIPTION: selectSubscription
});

export default connect(mapStateToProps)(Subscriptions)