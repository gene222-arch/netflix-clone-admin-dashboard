import React from 'react'
import Forbidden from '../views/pages/errors/Forbidden';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../redux/modules/auth/selector';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PATH from './path';
import MainLayout from '../views/layouts/MainLayout';
import UserLayout from '../views/layouts/UserLayout';
import UserProfile from './../views/pages/user/UserProfile';

const PrivateRoute = ({ AUTH, Component, access, ...props }) => 
{
    const history = useHistory();

    if (! AUTH.isAuthenticated) return <Redirect to={ PATH.LOGIN } />

    if ( access && ! AUTH.permissions.includes(access) ) return <Forbidden />

    /** Admin */

    if (AUTH.role !== 'Subscriber') {
        return (
            <MainLayout>
                <Component { ...props } />
            </MainLayout>
        )
    }

    /** Subscriber */

    if (AUTH.profileCountToDisable || !AUTH.selectedProfile.id) {
        return (
            <UserLayout>
                <UserProfile { ...props } />
            </UserLayout>
        )
    }

    return (
        <UserLayout>
            <Component { ...props } />
        </UserLayout>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(PrivateRoute)
