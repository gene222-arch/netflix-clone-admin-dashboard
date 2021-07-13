import React from 'react'
import { useHistory } from 'react-router-dom'

/** Utils */
import * as Cookie from '../utils/cookies'
import PATH from './path';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';
import { connect } from 'react-redux';


const PublicRoute = ({ AUTH, Component, ...props }) => 
{
    const history = useHistory();

    return (
        <>
            {
                !AUTH.isAuthenticated 
                    ? <Component { ...props } />
                    : history.push(PATH.DASHBOARD)
            }
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PublicRoute)
