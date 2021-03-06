import React, { useState, useEffect } from 'react'
import APP_LOGO from './../../assets/images/app/iconflicklify.ico'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Colors from './../../constants/Colors';
import SubscriberMenu from './SubscriberMenu';
import { Badge, IconButton } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import { selectPaymentAuthorizationNotifications } from './../../redux/modules/notifications/selector';
import NotificationMenu from './NotificationMenu';
import { useLocation } from 'react-router-dom';
import PATH from './../../routes/path';

const appHeaderUseStyles = makeStyles(theme => ({
    avatar: {
        width: '2.5rem',
        height: '2.5rem',
        marginTop: '1.5rem',
        borderRadius: 5
    },
    container: {
        backgroundColor: Colors.dark,
        height: '10vh',
        marginBottom: '3rem'
    },
    logo: {
        width: '2.5rem',
        height: 'auto',
        marginTop: '1.5rem'
    },
    notifContainer: {
        marginRight: '1rem'
    },
    notifIconButton: {
        marginTop: '1rem'
    },
    profileNameText: {
    }
}));

const AppHeader = ({ AUTH, PAYMENT_AUTH_NOTIFS }) => 
{
    const classes = appHeaderUseStyles();
    const { pathname } = useLocation();

    const shouldHideNotifAndAvatar = ([ PATH.USER_PROFILE, PATH.ADD_PROFILE ].includes(pathname)) || !AUTH.selectedProfile.id;

    const paymentAuthorizationNotifCount = PAYMENT_AUTH_NOTIFS?.filter(notif => !notif.read_at).length || 0;
    const [ profileMenu, setProfileMenu ] = useState(null);
    const [ notifMenu, setNotifMenu ] = useState(null);

    useEffect(() => {
        return () => {
            setProfileMenu(null);
            setNotifMenu(null);
        }
    }, []);

    return (
        <Container maxWidth="xl" className={ classes.container }>
            <SubscriberMenu anchorEl={ profileMenu } setAnchorEl={ setProfileMenu } />
            <NotificationMenu anchorEl={ notifMenu } setAnchorEl={ setNotifMenu } />
            <Grid container spacing={1} justify='space-between'>
                <Grid item>
                    <img 
                        src={ APP_LOGO }
                        className={ classes.logo }
                    />
                </Grid>
                <Grid item>
                    <Grid container>
                    {
                        !shouldHideNotifAndAvatar && (
                            <Grid item className={ classes.notifContainer }>
                                <IconButton
                                    className={ classes.notifIconButton }
                                    onClick={ e => setNotifMenu(e.currentTarget) }
                                >
                                    <Badge badgeContent={ paymentAuthorizationNotifCount } color='error'>
                                        <Notifications 
                                            style={{ 
                                                fontSize: '2rem',
                                                color: paymentAuthorizationNotifCount ? Colors.gold : Colors.grey
                                            }}
                                        />
                                    </Badge>
                                </IconButton>
                            </Grid>
                            )
                        }
                        <Grid item>
                        {
                            !shouldHideNotifAndAvatar && (
                                <img 
                                    src={ AUTH.selectedProfile?.avatar || AUTH.user.avatar }
                                    className={ classes.avatar }
                                    onMouseOver={ e => setProfileMenu(e.currentTarget) }
                                />
                            )
                        }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    PAYMENT_AUTH_NOTIFS: selectPaymentAuthorizationNotifications
});

export default connect(mapStateToProps)(AppHeader)
