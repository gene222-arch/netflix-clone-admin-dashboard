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
import ToolTipComponent from '../../../components/ToolTipComponent';
import { makeStyles } from '@material-ui/core';

const activityLogsUseStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.info.dark
    }
}));

const ActivityLog = ({ MAIN_LAYOUT, AUTH }) => 
{
    const classes = activityLogsUseStyles();
    const dispatch = useDispatch();

    const handleClick = () => dispatch(MAIN_LAYOUT_ACTION.selectActivityLog());

    return AUTH.permissions?.includes('Manage Activity Logs') && (
        <StyledNavLink 
            to={ PATH.ACTIVITY_LOG }
            text={
                <ToolTipComponent 
                    withToolTip={ !MAIN_LAYOUT.drawer }
                    title='Activity Logs'
                    component={ 
                        <ListItem 
                            button 
                            onClick={ handleClick }
                            selected={ MAIN_LAYOUT.activityLog }
                        >
                            <ListItemIcon>
                                <ViewList className={ classes.icon } />
                            </ListItemIcon>
                            <ListItemText primary='Activity Logs' />
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

export default connect(mapStateToProps)(ActivityLog)
