import React, { useState, useEffect, forwardRef } from 'react';
import * as AUTH_ACTION from './../../redux/modules/auth/actions'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from './../Menu';
import { useDispatch, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PATH from './../../routes/path';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../redux/modules/auth/selector';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Divider, makeStyles, useMediaQuery } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputPinDialog from './../../views/pages/user/InputPinDialog';
import { useTheme } from '@material-ui/core/styles';

const appHeaderMenuUseStyles = makeStyles(theme => ({
    avatar: {
        width: '1.5rem',
        borderRadius: 5
    },
    lockIcon: {
        fontSize: '1rem'
    }
}));

const PIN_PROPS = {
    num1: '',
    num2: '',
    num3: '',
    num4: ''
}

const AvatarMenu = forwardRef(({ profile, avatarClassName, lockIconClassName, handleClick }, ref) => (
    <MenuItem onClick={ handleClick } ref={ ref }>
        <Grid container justify='space-between' alignItems='center'>
            <Grid item xs={ 9 } sm={ 9 } md={ 9 } lg={ 9 }>
                <Grid container spacing={ 1 }>
                    <Grid item>
                        <img src={ profile.avatar } className={ avatarClassName } />
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="textSecondary">
                            { profile.name.toUpperCase() }
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 }>
                {
                    Boolean(profile.is_profile_locked) && <LockOutlinedIcon color='disabled' className={ lockIconClassName } />
                }
            </Grid>
        </Grid>
    </MenuItem>
));

const AppHeaderMenu = ({ AUTH, anchorEl, setAnchorEl }) => 
{
    const classes = appHeaderMenuUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();

    const [ id, setId ] = useState('');
    const [ pin, setPin ] = useState(PIN_PROPS);
    const [ isIncorrectPin, setIsIncorrectPin ] = useState(false);
    const [ selectedProfilePin, setSelectedProfilePin ] = useState('');
    const [ showInputPin, setShowInputPin ] = useState(false);


    const menuStyle = !useMediaQuery(theme.breakpoints.down('sm')) ? 
    {  
        width: '12rem',
        height: '18rem'
    } : {
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0
    };


    const cleanUp = () => {
        setShowInputPin(false);
        setPin(PIN_PROPS);
        setSelectedProfilePin('');
        setId('');
        setIsIncorrectPin(false);
    }

    const handleClickSelect = () => 
    {
        const pinValue = Object.values(pin).join('');

        if (pinValue === selectedProfilePin) 
        {
            dispatch(AUTH_ACTION.selectProfileStart(id));
            cleanUp();
        }
        else {
            setIsIncorrectPin(true);
            setPin(PIN_PROPS);
    
            let nextfield = document.querySelector(`input[name=num1]`);
            nextfield.focus();  
        }
    }

    const handleClickSelectNonPin = (profileId) => dispatch(AUTH_ACTION.selectProfileStart(profileId));

    const handleClickToggleModal = (pin, profileId) => {
        setShowInputPin(! showInputPin);
        setSelectedProfilePin(!selectedProfilePin ? pin : '');
        setId(!id ? profileId : '');
        setAnchorEl(null);
    }

    const handleClickToggleMenu = (event, reason) => {
        setAnchorEl(!anchorEl ? event.currentTarget : null);
    }

    const handleClickLogout = () => {
        dispatch(AUTH_ACTION.logoutStart());
        handleClickToggleMenu();
    }

    useEffect(() => 
    {
        return () => {
            cleanUp();
            setAnchorEl(null);
        }
    }, []);

    return (
        <div onMouseLeave={ () => setAnchorEl(null) }>
            <InputPinDialog
                isIncorrectPin={ isIncorrectPin }
                open={ showInputPin }
                pin={ pin }
                setPin={ setPin }
                handleClickToggleModal={ handleClickToggleModal } 
                handleClickCancel={ cleanUp }
                handleClickSave={ handleClickSelect }
            />
            <Menu
                id="app-header-menu"
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ handleClickToggleMenu }
                PaperProps={{ 
                    style: menuStyle
                }}
            >
                {
                    AUTH.profiles.map((profile, index) => 
                        AUTH.selectedProfile.id !== profile.id && (
                            <AvatarMenu 
                                key={ index }
                                profile={ profile }
                                avatarClassName={ classes.avatar } 
                                lockIconClassName={ classes.lockIcon }
                                handleClick={ 
                                    () => profile.is_profile_locked 
                                        ? handleClickToggleModal(profile.pin_code, profile.id) 
                                        : handleClickSelectNonPin(profile.id) 
                                } 
                            />
                        )
                    )
                }
                <Divider />
                <MenuItem onClick={ handleClickLogout }>Logout</MenuItem>
            </Menu>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(AppHeaderMenu)
