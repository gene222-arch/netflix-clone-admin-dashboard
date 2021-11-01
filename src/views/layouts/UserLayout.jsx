import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import AppHeader from '../../components/app/AppHeader'
import { makeStyles } from '@material-ui/core/styles'
import Colors from './../../constants/Colors';
import ECHO_UTIL from './../../utils/echo'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../redux/modules/auth/selector';
import { connect } from 'react-redux';

const userLayoutUseStyles = makeStyles(theme => ({
    container: {
        backgroundColor: Colors.dark,
        height: 'auto',
        padding: 0
    }
}));

const UserLayout = ({ AUTH, children }) => 
{
    const classes = userLayoutUseStyles();

    useEffect(() => {
        ECHO_UTIL()
            .private('subscribed.successfully')
            .listen('SubscribedSuccessfullyEvent', (response) => {
                console.log(response);
            });

        return () => {
            if (! AUTH.isAuthenticated) {
                console.log('Leaving the Subscribed Successfully Event channel');
                ECHO_UTIL().leaveChannel('SubscribedSuccessfullyEvent');
            }
        }
    }, [AUTH.isAuthenticated]);

    return (
        <Container maxWidth='xl' className={ classes.container }>
            <AppHeader />
            { children }
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(UserLayout)
