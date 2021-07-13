import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';

const Dashboard = ({ MAIN_LAYOUT }) => 
{
    const dispatch = useDispatch();

    const handleClickDashboard = () => dispatch(MAIN_LAYOUT_ACTION.selectDashboard());

    return (
        <StyledNavLink 
            to={ PATH.DASHBOARD }
            text={
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
    )
}

const mapStateToProps = createStructuredSelector({
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(Dashboard)
