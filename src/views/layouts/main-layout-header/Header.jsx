import React, { useState, useEffect } from 'react';
import * as AUTH_ACTION from '../../../redux/modules/auth/actions'
import Button from '@material-ui/core/Button';
import { MenuItem, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Menu from './../../../components/Menu';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { useDispatch, connect } from 'react-redux';
import CircleContentLoader from '../../../components/content-loader/CircleContentLoader';

const useStyles = makeStyles((theme) => ({
    userAvatar: {
        width: '100%',
        height: '2.75rem'
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
                onMouseOver={ handleClick }
                disabled={ !AUTH.user }
            >
                {
                    !AUTH.user
                        ? <CircleContentLoader />
                        : <Avatar className={ classes.userAvatar } src={ AUTH.user.avatar_path } />
                }
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