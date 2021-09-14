import React from 'react'
import Container from '@material-ui/core/Container'
import AppHeader from '../../components/app/AppHeader'

const UserLayout = ({ children }) => 
{
    return (
        <Container maxWidth="xl">
            <AppHeader />
            { children }
        </Container>
    )
}

export default UserLayout
