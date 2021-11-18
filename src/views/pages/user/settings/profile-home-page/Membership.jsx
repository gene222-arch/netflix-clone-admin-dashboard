import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
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
import { useHistory } from 'react-router';


const membershipUseStyles = makeStyles(theme => ({
    container: {
        padding: '2rem 0'
    },
    gridContainer: {
        padding: '1.5rem 0'
    },
}));


const Membership = ({ AUTH, paymentAuthorizationNotif }) => 
{
    const theme = useTheme();

    const classes = membershipUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));

    const billingDetailsActionText = () =>
    {
        if (AUTH.subscription_details.status === 'pending') return 'Pending Email';

        if (AUTH.subscription_details.status === 'subscribed') return 'Manage Plan';

        if (['expired', 'cancelled'].includes(AUTH.subscription_details.status) && AUTH.payment_authorization_status !== 'sent') {
            return 'Renew Subscription'
        }

        if (paymentAuthorizationNotif.status === 'pending' || AUTH.payment_authorization_status === 'sent') return 'Pending email';
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
            mobileSizeTextContent: 'Change',
            isTextSecondary: false,
            isNavigatable: true,
            onClick: () => history.push(PATH.UPDATE_EMAIL)
        },
        {
            id: 'password',
            icon: LockOpenIcon,
            primaryText: 'Password: ***********',
            actionText: 'Change account password',
            actionPath: PATH.UPDATE_PASSWORD,
            mobileSizeTextContent: 'Change',
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
            mobileSizeTextContent: billingDetailsActionText().substring(0, 5),
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
            mobileSizeTextContent: 'Payment History',
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
                        memberShipActionButtons.map(({ 
                            id, 
                            icon: Icon, 
                            primaryText, 
                            actionText, 
                            actionPath, 
                            mobileSizeTextContent,
                            isTextSecondary, 
                            isNavigatable, 
                            onClick 
                        }) => (
                            <ListItem key={ id }>
                                {
                                    Icon && (
                                        <ListItemAvatar>
                                            <Icon color={ isTextSecondary ? 'disabled' : 'action' } />
                                        </ListItemAvatar>
                                    )
                                }
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
                                                text={ isXs ? mobileSizeTextContent : actionText }
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
