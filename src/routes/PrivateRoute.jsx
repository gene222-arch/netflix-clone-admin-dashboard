import React from 'react'
import Forbidden from './../views/pages/errors/Forbidden';

/** Utils */
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Cookies from './../utils/cookies'
import PATH from './path';
import MainLayout from '../views/layouts/MainLayout';

const PrivateRoute = ({ AUTH, Component, access, ...props }) => 
{
    if (! AUTH.isAuthenticated) return <Redirect to={ PATH.LOGIN } />

    if (AUTH.role && ! AUTH.permissions.includes(access)) return <Forbidden />
    
    if (!AUTH.role) 
    {
        if (! Cookies.has('access_token')) return <Redirect to={ PATH.LOGIN } />

        return <Component { ...props } />
    }

    return (
        <MainLayout>
            <Component { ...props } />
        </MainLayout>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PrivateRoute)
