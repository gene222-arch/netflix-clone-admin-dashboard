import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Button, CircularProgress } from '@material-ui/core';
import StyledNavLink from './../../../../../components/styled-components/StyledNavLink';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../../redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import PATH from './../../../../../routes/path';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import * as USER_ACTION from './../../../../../redux/modules/user/actions'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';


const membershipUseStyles = makeStyles(theme => ({
    container: {
        padding: '2rem 0'
    },
    gridContainer: {
        padding: '1.5rem 0'
    },
}));


const Membership = ({ AUTH, paymentAuthorizationNotif, isFetchingPaymentAuthNotif }) => 
{
    const theme = useTheme();

    const classes = membershipUseStyles();
    const dispatch = useDispatch();

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));

    const billingDetailsActionText = () =>
    {
        if (isFetchingPaymentAuthNotif) return <CircularProgress />

        if (AUTH.subscription_details.status === 'subscribed') return 'Manage Plan';

        if (paymentAuthorizationNotif.status === 'pending' || AUTH.payment_authorization_status === 'sent') return 'Pending email';

        if (['expired', 'cancelled'].includes(AUTH.subscription_details.status) && AUTH.payment_authorization_status !== 'sent') {
            return 'Renew Subscription'
        }
    }

    const billingDetailsPath = () => 
    {
        const statuses = [ 'expired', 'cancelled', 'pending' ];
        const isInStatuses = statuses.includes(AUTH.subscription_details.status);

        return !isInStatuses ? PATH.MANAGE_PLAN : PATH.RENEW_SUBSCRIPTION;
    }

    const memberShipActionButtons = 
    [
        {
            id: 'email',
            icon: MailOutlineIcon,
            primaryText: AUTH.user.email,
            actionText: 'Change account email',
            actionPath: PATH.UPDATE_EMAIL,
            isTextSecondary: false,
            isNavigatable: true,
            onClick: () => dispatch(USER_ACTION.sendChangeEmailVerificationCodeStart())
        },
        {
            id: 'password',
            icon: LockOpenIcon,
            primaryText: 'Password: ***********',
            actionText: 'Change account password',
            actionPath: PATH.UPDATE_PASSWORD,
            isTextSecondary: true,
            isNavigatable: true,
            onClick: () => console.log('')
        },
        {
            id: 'billing_details',
            icon: SubscriptionIcon,
            primaryText: `Billing Details ${ !AUTH.subscription_details.is_expired ? '' : '(expired)' }`,
            actionText: billingDetailsActionText(),
            actionPath: billingDetailsPath(),
            isTextSecondary: true,
            isNavigatable: [ 'Renew Subscription', 'Manage Plan' ].includes(billingDetailsActionText()),
            onClick: () => console.log('')
        },
        {
            id: 'payment_history',
            icon: null,
            primaryText: '',
            actionText: 'Payment History',
            actionPath: PATH.PAYMENT_HISTORY,
            isTextSecondary: true,
            isNavigatable: true,
            onClick: () => console.log('')
        },
    ];


    return (
        <Grid container spacing={1} className={ classes.gridContainer } >
            <Grid item xs={ 12 } sm={ 3 } md={ 3 } lg={ 3 }>
                <Typography variant="subtitle1" color="initial">MEMBERSHIP</Typography>
            </Grid>
            <Grid item xs={ 12 } sm={ 8 } md={ 8 } lg={ 8 }>
                <List>
                    {
                        memberShipActionButtons.map(({ id, icon: Icon, primaryText, actionText, actionPath, isTextSecondary, isNavigatable, onClick }) => (
                            <ListItem key={ id }>
                                <ListItemAvatar>
                                    { Icon && <Icon color={ isTextSecondary ? 'disabled' : 'action' } /> }
                                </ListItemAvatar>
                                <ListItemText primary={ 
                                    <Typography variant="subtitle1" color={ isTextSecondary ? 'textSecondary' : 'inherit' }>
                                        { primaryText }
                                    </Typography>
                                } />
                                <ListItemSecondaryAction>
                                    {
                                        isNavigatable && (
                                            <StyledNavLink 
                                                to={ actionPath }
                                                text={ isXs ? 'Change' : actionText }
                                                onClick={ onClick } 
                                            />
                                        )
                                    }
                                    {
                                        !isNavigatable && (
                                            <Typography variant="subtitle1" color="initial">
                                                { actionText }
                                            </Typography>
                                        )
                                    }
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(Membership)
