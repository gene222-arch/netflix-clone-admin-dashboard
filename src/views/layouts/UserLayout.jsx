import React from 'react'
import Container from '@material-ui/core/Container'
import AppHeader from '../../components/app/AppHeader'
import { makeStyles } from '@material-ui/core/styles'

const userLayoutUseStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#000',
        height: '100vh'
    }
}));

const UserLayout = ({ children }) => 
{
    const classes = userLayoutUseStyles();

    return (
        <Container maxWidth="xl" className={ classes.container }>
            <AppHeader />
            { children }
        </Container>
    )
}

export default UserLayout
