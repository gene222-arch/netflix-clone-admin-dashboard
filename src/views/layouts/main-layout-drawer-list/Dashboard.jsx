import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import { selectAuth } from './../../../redux/modules/auth/selector';
import ToolTipComponent from './../../../components/ToolTipComponent';

const Dashboard = ({ MAIN_LAYOUT, AUTH }) => 
{
    const dispatch = useDispatch();

    const handleClickDashboard = () => dispatch(MAIN_LAYOUT_ACTION.selectDashboard());

    return AUTH.permissions?.includes('View Dashboard') && (
        <StyledNavLink 
            to={ PATH.DASHBOARD }
            text={
                <ToolTipComponent
                    withToolTip={ !MAIN_LAYOUT.drawer }
                    title='Dashboard'
                    component={ 
                        <ListItem 
                            button 
                            onClick={ handleClickDashboard }
                            selected={ MAIN_LAYOUT.dashboard }
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItem>
                    }
                />
            }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(Dashboard)
