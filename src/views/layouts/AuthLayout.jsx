import React from 'react'
import Typography from '@material-ui/core/Typography'

const AuthLayout = ({ children }) => 
{
    return (
        <>
            <Typography variant="h4" color="initial">Auth layout</Typography>
            { children }
        </>
    )
}

export default AuthLayout
