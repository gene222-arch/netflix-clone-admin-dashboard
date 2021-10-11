import React from 'react'
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import { selectAuth } from './../../../redux/modules/auth/selector';
import ToolTipComponent from '../../../components/ToolTipComponent';
import { makeStyles } from '@material-ui/core';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';

const employeesUseStyles = makeStyles(theme => ({
    icon: {
        color: '#FFF'
    }
}));

const Employee = ({ MAIN_LAYOUT, AUTH }) => 
{
    const classes = employeesUseStyles();
    const dispatch = useDispatch();

    const handleClick = () => dispatch(MAIN_LAYOUT_ACTION.selectEmployee());

    return AUTH.permissions?.includes('Manage Employees') && (
        <StyledNavLink 
            to={ PATH.ACTIVITY_LOG }
            text={
                <ToolTipComponent 
                    withToolTip={ !MAIN_LAYOUT.drawer }
                    title='Employees'
                    component={ 
                        <ListItem 
                            button 
                            onClick={ handleClick }
                            selected={ MAIN_LAYOUT.employee }
                        >
                            <ListItemIcon>
                                <PeopleRoundedIcon className={ classes.icon } />
                            </ListItemIcon>
                            <ListItemText primary='Employees' />
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

export default connect(mapStateToProps)(Employee)
