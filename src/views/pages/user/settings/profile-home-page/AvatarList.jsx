import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Collapse, ListItemSecondaryAction, Divider, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../../redux/modules/auth/selector';
import * as CONFIRMATION_ACTION from './../../../../../redux/modules/confirm/actions';
import * as AUTH_ACTION from './../../../../../redux/modules/auth/actions';
import { connect, useDispatch, batch } from 'react-redux';
import PATH from './../../../../../routes/path';
import StyledNavLink from './../../../../../components/styled-components/StyledNavLink';
import { ChildCareRounded } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import Colors from './../../../../../constants/Colors';
import { useHistory } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';
import InputPinDialog from './../../InputPinDialog';

const PIN_PROPS = {
    num1: '',
    num2: '',
    num3: '',
    num4: ''
}

const avatarListUseStyles = makeStyles(theme => ({
    avatar: {
        width: '90%',
        height: '10vh',
        borderRadius: 5,
        marginRight: '1rem'
    },
    collapse: {
        paddingLeft: '5rem'
    },
    container: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    deleteIcon: {
        '&:hover': {
            color: Colors.error
        }
    },
    divider: {
        marginTop: '1rem',
    },
    expandIcon: {
        fontSize: '2rem'
    },
    updateIcon: {
        '&:hover': {
            color: Colors.warning
        }
    }
}));

const AvatarList = ({ AUTH, id, handleClickSetId, handleChangePinLock }) => 
{
    const classes = avatarListUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ isIncorrectPin, setIsIncorrectPin ] = useState(false);
    const [ pin, setPin ] = useState(PIN_PROPS);
    const [ showInputPinDialog, setShowInputPinDialog ] = useState(false);
    const [ selectedProfileId, setSelectedProfileId ] = useState('');
    const [ selectedProfileName, setSelectedProfileName ] = useState('');
    const [ selectedProfilePinCode, setSelectedProfilePinCode ] = useState('');
    const [ action, setAction ] = useState('');

    const cleanUp = () => 
    {
        setAction('');
        setIsIncorrectPin(false);
        setPin(PIN_PROPS);
        setShowInputPinDialog(false);
        setSelectedProfileId('');
        setSelectedProfileName('');
        setSelectedProfilePinCode('');
    }

    const handleDispatchDeleteProfile = (profileIdToDelete) => 
    {
        batch(() => {
            dispatch(AUTH_ACTION.deleteProfileByIdStart({ id: profileIdToDelete }));

            if (AUTH.profiles.length === 1) {
                dispatch(AUTH_ACTION.deletedSelectedProfile());
                history.push(PATH.USER_PROFILE);
            }
        });
    }

    const handleDeleteConfirmation = (profileId, profileName) => {
        dispatch(CONFIRMATION_ACTION.showConfirmationDialog({
            mainHeader: (
                <Typography variant="h6" color="error">
                    <strong>{ `Delete ${ profileName }` }</strong>
                </Typography>
            ),
            subHeader: 'Once confirmed, saved data in this profile will be deleted permanently and recovery of loss data is not possible',
            confirmCallback: () => handleDispatchDeleteProfile(profileId)
        }));
    }

    const handleClickUpdate = (profileId) => {
        history.push(PATH.MANAGE_PROFILE, {
            profileId
        });
    }
    
    const handleClickSelect = () => 
    {
        const pinValue = Object.values(pin).join('');

        if (pinValue === selectedProfilePinCode) 
        {   
            if (action === 'DELETE') {
                dispatch(CONFIRMATION_ACTION.showConfirmationDialog({
                    mainHeader: (
                        <Typography variant="h6" color="error">
                            <strong>{ `Delete ${ selectedProfileName }` }</strong>
                        </Typography>
                    ),
                    subHeader: 'Once confirmed, saved data in this profile will be deleted permanently and recovery of loss data is not possible',
                    confirmCallback: () => dispatch(AUTH_ACTION.deleteProfileByIdStart({ id: selectedProfileId }))
                }));
            }

            if (action === 'UPDATE') {
                history.push(PATH.MANAGE_PROFILE, {
                    profileId: selectedProfileId
                });
            }

            cleanUp();
        }
        
        if (pinValue !== selectedProfilePinCode) 
        {
            const nextfield = document.querySelector(`input[name=num1]`);
            nextfield.focus();  

            setIsIncorrectPin(true);
            setPin(PIN_PROPS);
        }
    }

    const handleClickToggleModal = (pinCode, profileId, profileName, actionName) => 
    {
        setAction(actionName);

        setShowInputPinDialog(! showInputPinDialog);
        setSelectedProfileId(!selectedProfileId ? profileId : '');
        setSelectedProfileName(profileName);
        setSelectedProfilePinCode(!selectedProfilePinCode ? pinCode : '');
    }

    useEffect(() => {
        return () => {
            cleanUp();
        }
    }, []);

    return (
        <List className={ classes.container }>
            <InputPinDialog
                isIncorrectPin={ isIncorrectPin }
                open={ showInputPinDialog }
                pin={ pin }
                setPin={ setPin }
                handleClickToggleModal={ handleClickToggleModal } 
                handleClickCancel={ cleanUp }
                handleClickSave={ handleClickSelect }
            />
            {
                AUTH
                    .profiles
                    .filter(({ enabled }) => enabled)
                    .map(({ id: profileId, name, avatar, pin_code, is_profile_locked, is_for_kids }, index) => (
                        <div key={ index }>
                            <List className={classes.profileContainer} onClick={ () => handleClickSetId(profileId) } >
                                <ListItem>
                                    <ListItemAvatar>
                                        <img src={ avatar } className={ classes.avatar } />
                                    </ListItemAvatar>
                                    <ListItemText primary={ name.toUpperCase() } secondary={
                                        !is_for_kids ? "All Maturity Ratings" : <ChildCareRounded /> 
                                    }/>
                                    {
                                        id === profileId 
                                            ? <ExpandLessIcon className={ classes.expandIcon }/> 
                                            : <ExpandMoreIcon className={ classes.expandIcon }/>
                                    }
                                </ListItem>
                            </List>
                            <Collapse in={ id === profileId } timeout="auto" unmountOnExit className={ classes.collapse }>
                                <List component="div" disablePadding>
                                    <ListItem button onClick={ handleChangePinLock }>
                                        <ListItemText primary="Profile Lock" secondary={ !is_profile_locked ? 'Off' : 'On' } />
                                        <ListItemSecondaryAction>
                                            <StyledNavLink 
                                                to={ PATH.PROFILE_LOCK.replace(':id', id) }
                                                text={ 'Change' }
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Delete" />
                                        <ListItemSecondaryAction onClick={ 
                                            () => is_profile_locked
                                                ? handleClickToggleModal(pin_code, profileId, name, 'DELETE')
                                                : handleDeleteConfirmation(profileId, name) 
                                        }>
                                            <DeleteIcon className={ classes.deleteIcon } />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Update Profile" />
                                        <ListItemSecondaryAction onClick={ 
                                            () => is_profile_locked
                                                ? handleClickToggleModal(pin_code, profileId, name, 'UPDATE')
                                                : handleClickUpdate(profileId)
                                        }>
                                            <EditIcon className={ classes.updateIcon } />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Collapse>
                            <Divider className={ classes.divider } />
                        </div>
                    ))
            }
        </List>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(AvatarList)
