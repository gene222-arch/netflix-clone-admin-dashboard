import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'

/** Utils */
import * as Cookies from '../utils/cookies'
import PATH from './path';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';
import { connect } from 'react-redux';

const PublicRoute = ({ AUTH, Component, ...props }) => 
{
    if (! AUTH.isAuthenticated || ! Cookies.has('access_token')) {
        return <Component { ...props } />
    }
    else {
        if (AUTH.role === 'Subscriber') return <Redirect to={ PATH.PROFILE_HOME_PAGE } />
        if (AUTH.role !== 'Subscriber') return <Redirect to={ PATH.DASHBOARD } />
    }
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PublicRoute)
