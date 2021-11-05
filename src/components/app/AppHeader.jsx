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
import AppHeaderMenu from './AppHeaderMenu';
import { Badge, IconButton } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import { selectPaymentAuthorizationNotifications } from './../../redux/modules/notifications/selector';
import NotificationMenu from './NotificationMenu';

const appHeaderUseStyles = makeStyles(theme => ({
    avatar: {
        width: '2.5rem',
        marginTop: '1.5rem',
        borderRadius: 5
    },
    avatarContainer: {
        
    },
    container: {
        backgroundColor: Colors.dark,
        height: '10vh'
    },
    logo: {
        width: '2.5rem',
        height: 'auto',
        marginTop: '1.5rem'
    },
    notifIconButton: {
        marginTop: '1rem'
    },
    profileNameText: {
        marginTop: '1.5rem'
    }
}));

const AppHeader = ({ AUTH, PAYMENT_AUTH_NOTIFS }) => 
{
    const classes = appHeaderUseStyles();

    const paymentAuthorizationNotifCount = PAYMENT_AUTH_NOTIFS.filter(notif => !notif.read_at).length;
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
            <AppHeaderMenu anchorEl={ profileMenu } setAnchorEl={ setProfileMenu } />
            <NotificationMenu anchorEl={ notifMenu } setAnchorEl={ setNotifMenu } />
            <Grid container spacing={1} justify='space-between'>
                <Grid item>
                    <img 
                        src={ APP_LOGO }
                        className={ classes.logo }
                    />
                </Grid>
                <Grid item>
                    <Grid container spacing={1} alignItems='center'>
                        {
                            AUTH.selectedProfile?.name && (
                                <Grid item>
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
                            <Typography 
                                variant="subtitle1" 
                                color="initial"
                                className={ classes.profileNameText }
                            >
                                { AUTH.selectedProfile.name }
                            </Typography>
                        </Grid>
                        <Grid item>
                            {
                                AUTH.selectedProfile.avatar && (
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
