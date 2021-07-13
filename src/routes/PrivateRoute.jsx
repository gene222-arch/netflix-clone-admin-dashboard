import React from 'react'
import Forbidden from './../views/pages/errors/Forbidden';

/** Utils */
import * as Cookie from '../utils/cookies'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';
import { connect } from 'react-redux';

const PrivateRoute = ({ AUTH, Component, ...props }) => 
{
    return (
        <>
            {
                (!AUTH.isAuthenticated && !AUTH.isLoading)
                    ? <Forbidden />
                    : <Component { ...props } />
            }
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PrivateRoute)
