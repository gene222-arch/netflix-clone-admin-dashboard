import React from 'react'
import { useHistory } from 'react-router-dom'

/** Utils */
import * as Cookie from '../utils/cookies'
import PATH from './path';

const PublicRoute = ({ Component, ...props }) => 
{
    const history = useHistory();

    return (
        <>
            {
                !Cookie.has('access_token') 
                    ? <Component { ...props } />
                    : history.push(PATH.DASHBOARD)
            }
        </>
    )
}

export default PublicRoute
