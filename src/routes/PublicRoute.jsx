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
    return (
        (!AUTH.isAuthenticated || !Cookies.has('access_token'))
            ? <Component { ...props } />
            : <Redirect to={ PATH.DASHBOARD } />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PublicRoute)
