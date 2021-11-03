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
import { Mail } from '@material-ui/icons';
import { Tooltip, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import MoreVert from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import * as NOTIFICATIONS_ACTION from './../../redux/modules/notifications/actions'

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
    },
    notifHeaderContainer: {
        padding: '1rem',
        paddingBottom: '0.5rem',
        paddingRight: '0.5rem'
    }
}));

const NotificationMenu = ({ PAYMENT_AUTH_NOTIFS, anchorEl, setAnchorEl }) => 
{
    const classes = notificationMenuUseStyles();
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);

    const [ moreOptionMenu, setMoreOptionMenu ] = useState(null);

    const handleClick = (event) => setMoreOptionMenu(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

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
            disabled: PAYMENT_AUTH_NOTIFS.length < 1
        },
        {
            label: 'Clear notifications',
            icon: DeleteIcon,
            onClick: handleClickClearAllNotif,
            disabled: PAYMENT_AUTH_NOTIFS.length < 1
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
                        <Typography variant="h5" color="initial" className={ classes.notifHeaderTitle }>Notifications</Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title='More options'>
                            <IconButton onClick={ handleClick }>
                                <MoreVert />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                 </Grid>
                {
                    PAYMENT_AUTH_NOTIFS.map(({ data, read_at }, index) => (
                        <MenuItem 
                            key={ index } 
                            onClick={ handleClose }
                            style={{ color: !read_at ? Colors.white : Colors.grey }}
                        >
                            <Mail 
                                className={ classes.mailIcon } 
                                style={{ color: !read_at ? Colors.white : Colors.grey }}
                            /> { data.type.split(/(?=[A-Z])/).join(" ") }
                        </MenuItem>
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
    PAYMENT_AUTH_NOTIFS: selectPaymentAuthorizationNotifications
});

export default connect(mapStateToProps)(NotificationMenu)
