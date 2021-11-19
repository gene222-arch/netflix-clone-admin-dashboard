import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStructuredSelector } from 'reselect';
import { selectPaymentAuthorizationNotifications } from '../../redux/modules/notifications/selector';
import { connect, useDispatch } from 'react-redux';
import Colors from './../../constants/Colors';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { Mail, MoreHorizRounded, Notifications } from '@material-ui/icons';
import { Tooltip, Typography, ListItemText } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import MoreVert from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import * as NOTIFICATIONS_ACTION from './../../redux/modules/notifications/actions'
import { selectUnreadPaymentAuthNotifications } from './../../redux/modules/notifications/selector';

const notificationMenuUseStyles = makeStyles(theme => ({
    emptyNotifText: {
        textAlign: 'center',
        padding: '4rem'
    },
    mailIcon: {
        marginRight: '1.5rem',
        fontSize: '0.9rem'
    },
    notifMenu: {
        width: '30rem'
    },
    notifHeaderTitle: {
        fontWeight: 'bold'
    },
    notifHeaderContainer: {
        padding: '1rem',
        paddingBottom: '0.5rem',
        paddingRight: '0.5rem'
    },
    timeAgo: {
        color: Colors.info,
        fontWeight: 'bold',
        fontSize: '0.75rem',
        display: 'block'
    }
}));

const NotificationMenu = ({ PAYMENT_AUTH_NOTIFS, UNREAD_PAYMENT_AUTH_NOTIFS, anchorEl, setAnchorEl }) => 
{
    const classes = notificationMenuUseStyles();
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);

    const [ moreOptionMenu, setMoreOptionMenu ] = useState(null);

    const handleClick = (event) => setMoreOptionMenu(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleClickNotification = (notificationId, readAt) => {
        if (! readAt) {
            dispatch(NOTIFICATIONS_ACTION.markPaymentAuthNotificationsAsReadStart({
                id: notificationId
            }));
        }

        window.open('https://mail.google.com/mail/u/0/', '_blank');
    }

    const handleCloseMoreOption = () => setMoreOptionMenu(null);

    const handleClickMarkAllAsRead = () => {
        dispatch(NOTIFICATIONS_ACTION.markAllPaymentAuthNotificationsAsReadStart());
        setMoreOptionMenu(null);
    }

    const handleClickClearAllNotif = () => {
        dispatch(NOTIFICATIONS_ACTION.clearPaymentAuthNotificationsStart());
        setMoreOptionMenu(null);
    }

    const moreOptions = [
        {
            label: 'Mark all as read',
            icon: CheckIcon,
            onClick: handleClickMarkAllAsRead,
            disabled: !Boolean(UNREAD_PAYMENT_AUTH_NOTIFS.length)
        },
        {
            label: 'Clear notifications',
            icon: DeleteIcon,
            onClick: handleClickClearAllNotif,
            disabled: !Boolean(PAYMENT_AUTH_NOTIFS.length)
        }
    ];


    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={ moreOptionMenu }
                open={ Boolean(moreOptionMenu) }
                onClose={ handleCloseMoreOption }
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{ 
                    style: {  
                        width: '15rem',
                        height: '10rem'
                    } 
                }}
            >
                {
                    moreOptions.map(({ label, icon: Icon, onClick, disabled }, index) => (
                        <MenuItem key={ index } onClick={ onClick } disabled={ disabled }>
                            <Grid container spacing={1} alignItems='center' justify='space-between'>
                                <Grid item>{ label }</Grid>
                                <Grid item> <Icon /> </Grid>
                            </Grid>
                        </MenuItem>
                    ))
                }
            </Menu>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className={ classes.notifMenu }
                PaperProps={{ 
                    style: {  
                        width: '40rem'
                    } 
                }}
            >
                 <Grid container spacing={1} justify='space-between' alignItems='center' className={ classes.notifHeaderContainer }>
                    <Grid item>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <Notifications />
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" color="initial" className={ classes.notifHeaderTitle }>Notifications</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Tooltip title='Options' arrow>
                            <IconButton onClick={ handleClick }>
                                <MoreHorizRounded />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                 </Grid>
                {
                    PAYMENT_AUTH_NOTIFS.map(({ id, data, read_at, time_ago }, index) => (
                        <Tooltip key={ index } title={ data.data.message } placement='top-end' arrow>
                            <MenuItem 
                                onClick={ () => handleClickNotification(id, read_at) }
                                style={{ color: !read_at ? Colors.white : Colors.grey }}
                            >
                                <Mail 
                                    className={ classes.mailIcon } 
                                    style={{ color: !read_at ? Colors.info : Colors.grey }}
                                /> 
                                <ListItemText 
                                    primary={
                                        <Typography variant="subtitle1" color="initial">
                                            { data.type.split(/(?=[A-Z])/).join(" ") }
                                        </Typography>
                                    } 
                                    secondary={
                                        <small>
                                            <Typography variant="caption" color="initial" noWrap>
                                                { data.data.message.substring(0, 60) + '....' }
                                            </Typography>
                                            <Typography variant="caption" color="initial" className={ classes.timeAgo }>
                                                { time_ago }
                                            </Typography>
                                        </small>
                                    } 
                                />
                            </MenuItem>
                        </Tooltip>
                    ))
                }
                {
                    !PAYMENT_AUTH_NOTIFS.length && (
                        <Typography variant="h6" color="textSecondary" className={ classes.emptyNotifText }>
                            Empty Notifications
                        </Typography>
                    )
                }
            </Menu>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    PAYMENT_AUTH_NOTIFS: selectPaymentAuthorizationNotifications,
    UNREAD_PAYMENT_AUTH_NOTIFS: selectUnreadPaymentAuthNotifications
});

export default connect(mapStateToProps)(NotificationMenu)
