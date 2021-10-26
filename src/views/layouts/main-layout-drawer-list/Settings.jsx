import React from 'react'
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import ToolTipComponent from '../../../components/ToolTipComponent';
import { makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const settingsUseStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.disabled
    }
}));

const Settings = ({ MAIN_LAYOUT }) => 
{
    const classes = settingsUseStyles();
    const dispatch = useDispatch();

    const handleClick = () => dispatch(MAIN_LAYOUT_ACTION.selectSettings());

    return (
        <StyledNavLink 
            to={ PATH.SETTINGS }
            text={
                <ToolTipComponent 
                    withToolTip={ !MAIN_LAYOUT.drawer }
                    title='Settings'
                    component={ 
                        <ListItem 
                            button 
                            onClick={ handleClick }
                            selected={ MAIN_LAYOUT.settings }
                        >
                            <ListItemIcon>
                                <SettingsIcon className={ classes.icon } />
                            </ListItemIcon>
                            <ListItemText primary='Settings' />
                        </ListItem>
                    }
                />
            }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(Settings)
