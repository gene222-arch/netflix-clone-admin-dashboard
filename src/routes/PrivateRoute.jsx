import React from 'react'
import Forbidden from './../views/pages/errors/Forbidden';

/** Utils */
import * as Cookie from '../utils/cookies'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Cookies from './../utils/cookies'
import PATH from './path';

const PrivateRoute = ({ AUTH, Component, ...props }) => 
{
    const history = useHistory();

    if (!AUTH.isAuthenticated && !Cookies.has('access_token')) {
        history.push(PATH.LOGIN);
    }
    
    return <Component { ...props } />
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PrivateRoute)
