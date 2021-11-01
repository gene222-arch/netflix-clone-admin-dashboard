import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import AppHeader from '../../components/app/AppHeader'
import { makeStyles } from '@material-ui/core/styles'
import Colors from './../../constants/Colors';
import ECHO_UTIL from './../../utils/echo'
import { useDispatch } from 'react-redux';
import * as AUTH_ACTION from './../../redux/modules/auth/actions'

const userLayoutUseStyles = makeStyles(theme => ({
    container: {
        backgroundColor: Colors.dark,
        height: 'auto',
        padding: 0
    }
}));

const UserLayout = ({ children }) => 
{
    const classes = userLayoutUseStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        ECHO_UTIL()
            .private('subscribed.successfully')
            .listen('SubscribedSuccessfullyEvent', ({ data }) => {
                dispatch(AUTH_ACTION.updateSubscriptionDetails({ subscription_details: data }));
            });
    }, []);

    return (
        <Container maxWidth='xl' className={ classes.container }>
            <AppHeader />
            { children }
        </Container>
    )
}

export default UserLayout
