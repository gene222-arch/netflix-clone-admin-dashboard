import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import AppHeader from '../../components/app/AppHeader'
import { makeStyles } from '@material-ui/core/styles'
import Colors from './../../constants/Colors';
import ECHO_UTIL from './../../utils/echo'

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

    useEffect(() => {
        ECHO_UTIL()
            .private('subscribed.successfully')
            .listen('SubscribedSuccessfullyEvent', (response) => {
                console.log(response);
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
