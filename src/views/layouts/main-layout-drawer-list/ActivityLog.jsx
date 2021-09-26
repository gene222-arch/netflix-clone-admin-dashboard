import React from 'react'
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { ViewList } from '@material-ui/icons';

const Dashboard = ({ MAIN_LAYOUT, AUTH }) => 
{
    const dispatch = useDispatch();

    const handleClick = () => dispatch(MAIN_LAYOUT_ACTION.selectActivityLog());

    return AUTH.permissions?.includes('Manage Activity Logs') && (
        <StyledNavLink 
            to={ PATH.ACTIVITY_LOG }
            text={
                <ListItem 
                    button 
                    onClick={ handleClick }
                    selected={ MAIN_LAYOUT.activityLog }
                >
                    <ListItemIcon>
                        <ViewList />
                    </ListItemIcon>
                    <ListItemText primary='Activity Logs' />
                </ListItem>
            }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(Dashboard)
