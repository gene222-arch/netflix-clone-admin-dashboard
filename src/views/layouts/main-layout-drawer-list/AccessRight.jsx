import React from 'react'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
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

const accessRightUseStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.warning.main
    }
}));

const AccessRigh = ({ MAIN_LAYOUT, AUTH }) => 
{
    const classes = accessRightUseStyles();
    const dispatch = useDispatch();

    const handleClickAccessRight = () => dispatch(MAIN_LAYOUT_ACTION.selectAccessRight());

    return AUTH.permissions?.includes('Manage Access Rights') && (
        <StyledNavLink 
            to={ PATH.ACCESS_RIGHT }
            text={
                <ToolTipComponent 
                    withToolTip={ !MAIN_LAYOUT.drawer }
                    title='Access Rights'
                    component={ 
                        <ListItem 
                            button 
                            onClick={ handleClickAccessRight }
                            selected={ MAIN_LAYOUT.accessRight }
                        >
                            <ListItemIcon>
                                <VpnKeyIcon className={ classes.icon } />
                            </ListItemIcon>
                            <ListItemText primary='Access Rights' />
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

export default connect(mapStateToProps)(AccessRigh)
