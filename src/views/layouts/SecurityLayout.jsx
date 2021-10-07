import React from 'react'
import Container from '@material-ui/core/Container'
import AuthLayoutHeader from '../../components/app/AuthLayoutHeader'

const SecurityLayout = ({ children }) => 
{
    return (
        <Container maxWidth="xl">
            <AuthLayoutHeader />
            { children }
        </Container>
    )
}

export default SecurityLayout
