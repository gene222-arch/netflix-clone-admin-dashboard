import React from 'react'
import Forbidden from './../views/pages/errors/Forbidden';

/** Utils */
import * as Cookie from '../utils/cookies'

const PrivateRoute = ({ Component, ...props }) => 
{
    return (
        <>
            {
                !Cookie.has('access_token') 
                    ? <Forbidden />
                    : <Component { ...props } />
            }
        </>
    )
}

export default PrivateRoute
