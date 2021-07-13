import React from 'react'
import { useHistory } from 'react-router-dom'

/** Utils */
import * as Cookie from '../utils/cookies'
import PATH from './path';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../redux/modules/auth/selector';
import { connect } from 'react-redux';
import PageLoader from './../components/PageLoader';


const PublicRoute = ({ AUTH, Component, ...props }) => 
{
    const history = useHistory();

    if (AUTH.isLoading) {
        return <PageLoader />
    }

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
