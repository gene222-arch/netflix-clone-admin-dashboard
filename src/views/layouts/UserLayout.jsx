import React from 'react'
import Container from '@material-ui/core/Container'

const UserLayout = ({ children }) => 
{
    return <Container maxWidth="xl">{ children }</Container>
}

export default UserLayout
