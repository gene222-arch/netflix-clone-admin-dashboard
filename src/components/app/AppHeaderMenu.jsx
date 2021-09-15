import React from 'react';
import * as AUTH_ACTION from './../../redux/modules/auth/actions'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from './../Menu';
import { useDispatch } from 'react-redux';

const AppHeaderMenu = ({ anchorEl, setAnchorEl }) => 
{
    const dispatch = useDispatch();
    const handleClickToggleMenu = (event) => setAnchorEl(!anchorEl ? event.currentTarget : null);

    const handleClickLogout = () => {
        dispatch(AUTH_ACTION.logoutStart());
        handleClickToggleMenu();
    }

    return (
        <div onMouseLeave={ () => setAnchorEl(null) }>
            <Menu
                id="app-header-menu"
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ handleClickToggleMenu }
            >
                <MenuItem onClick={ handleClickLogout }>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default AppHeaderMenu
