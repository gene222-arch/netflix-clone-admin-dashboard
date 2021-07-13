import React, { useState, useEffect } from 'react';

import * as AUTH_ACTION from '../../../redux/modules/auth/actions'

/** Material UI Components */
import Button from '@material-ui/core/Button';
import { MenuItem, Typography, makeStyles } from '@material-ui/core';

/** Material UI Icons */
import Avatar from '@material-ui/core/Avatar';
import { Skeleton } from '@material-ui/lab';

/** Components */
import Menu from './../../../components/Menu';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { useDispatch, connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    userAvatar: {
        backgroundColor: '#2c2c2c',
        color: '#FFF'
    },
}))

const Header = ({ AUTH }) => 
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleClickLogout = () => {
        handleClose();
        dispatch(AUTH_ACTION.logoutStart());
    }

    useEffect(() => {
        return () => {
            setAnchorEl(null);
        }
    }, []);

    return (
        <>
            <Button 
                aria-controls='vertical-toolbar' 
                aria-haspopup='true' 
                style={{ backgroundColor: 'transparent' }}
                onClick={ handleClick }
                disabled={ !AUTH.user }
            >
                <Typography variant='h6' color='initial'>
                    {
                        !AUTH.user
                            ? <Skeleton variant='circle'><Avatar /></Skeleton> 
                            : <Avatar className={ classes.userAvatar }>{ AUTH.user.first_name.substr(0, 1) }</Avatar>
                    }
                </Typography>
            </Button>
            <Menu
                id='header'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={ handleClose }
            >
                <MenuItem onClick={ handleClickLogout }>Logout</MenuItem>
            </Menu>
        
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(Header);