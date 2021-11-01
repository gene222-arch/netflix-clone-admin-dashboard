import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
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


const Membership = ({ AUTH }) => 
{
    const theme = useTheme();

    const classes = membershipUseStyles();
    const dispatch = useDispatch();

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));

    const memberShipActionButtons = 
    [
        {
            id: 'email',
            icon: MailOutlineIcon,
            primaryText: AUTH.user.email,
            actionText: 'Change account email',
            actionPath: PATH.UPDATE_EMAIL,
            isTextSecondary: false,
            onClick: () => dispatch(USER_ACTION.sendChangeEmailVerificationCodeStart())
        },
        {
            id: 'password',
            icon: LockOpenIcon,
            primaryText: 'Password: ***********',
            actionText: 'Change account password',
            actionPath: PATH.UPDATE_PASSWORD,
            isTextSecondary: true,
            onClick: () => console.log('')
        },
        {
            id: 'billing_details',
            icon: SubscriptionIcon,
            primaryText: `Billing Details ${ !AUTH.subscription_details.is_expired ? '' : '(expired)' }`,
            actionText: 
                `${ 
                    !AUTH.subscription_details.subscribed_at || AUTH.subscription_details.is_cancelled
                        ? 'Account has not been subscribed' 
                        : ( `${ !AUTH.subscription_details.is_expired ? 'Manage Plan' : 'Renew Subscription'  }` ) 
                }`,
            actionPath: `${ 
                (
                    AUTH.subscription_details.subscribed_at && AUTH.subscription_details.is_expired || 
                    !AUTH.subscription_details.expired_at ||
                    AUTH.subscription_details.is_cancelled
                )
                    ? PATH.RENEW_SUBSCRIPTION
                    : PATH.MANAGE_PLAN
            }`,
            isTextSecondary: true,
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
                        memberShipActionButtons.map(({ id, icon: Icon, primaryText, actionText, actionPath, isTextSecondary, onClick }) => (
                            <ListItem key={ id }>
                                <ListItemAvatar>
                                    <Icon color={ isTextSecondary ? 'disabled' : 'action' } />
                                </ListItemAvatar>
                                <ListItemText primary={ 
                                    <Typography variant="subtitle1" color={ isTextSecondary ? 'textSecondary' : 'inherit' }>
                                        { primaryText }
                                    </Typography>
                                } />
                                <ListItemSecondaryAction>
                                    <StyledNavLink 
                                        to={ actionPath }
                                        text={ isXs ? 'Change' : actionText }
                                        onClick={ onClick } 
                                    />
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
