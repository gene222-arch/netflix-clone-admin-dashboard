import React, { useState } from 'react';

/** Material UI Components */
import Button from '@material-ui/core/Button';
import { Menu, MenuItem, Typography, makeStyles } from '@material-ui/core';

/** Material UI Icons */
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    userAvatar: {
        backgroundColor: '#2c2c2c',
        color: '#FFF'
    },
}))

const Header = ({ user, handleClickLogout }) => 
{
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const logout = () => {
        handleClose();
        handleClickLogout();
    };

    return (
        <>
            <Button 
                aria-controls="vertical-toolbar" 
                aria-haspopup="true" 
                style={{ backgroundColor: 'transparent' }}
                onClick={ handleClick }
            >
                <Typography variant="h6" color="initial">
                    <Avatar className={ classes.userAvatar }>{ user.first_name.substr(0, 1) }</Avatar>
                </Typography>
            </Button>
            <Menu
                id="header"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={ handleClose }
            >
                <MenuItem onClick={ logout }>Logout</MenuItem>
            </Menu>
        
        </>
    );
}

export default Header;