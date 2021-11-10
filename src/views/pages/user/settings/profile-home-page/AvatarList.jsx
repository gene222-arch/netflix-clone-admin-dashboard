import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Collapse, ListItemSecondaryAction, Divider, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../../redux/modules/auth/selector';
import * as CONFIRMATION_ACTION from './../../../../../redux/modules/confirm/actions';
import * as AUTH_ACTION from './../../../../../redux/modules/auth/actions';
import { connect, useDispatch } from 'react-redux';
import PATH from './../../../../../routes/path';
import StyledNavLink from './../../../../../components/styled-components/StyledNavLink';
import { ChildCareRounded } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import Colors from './../../../../../constants/Colors';
import { useHistory } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';

const avatarListUseStyles = makeStyles(theme => ({
    avatar: {
        width: '4rem',
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

    const deleteProfileById = (id) => dispatch(AUTH_ACTION.deleteProfileByIdStart({ id }));

    const handleClickDeleteConfirmation = (id, profileName) => {
        dispatch(CONFIRMATION_ACTION.showConfirmationDialog({
            mainHeader: `Delete ${ profileName }`,
            subHeader: 'Once confirmed, saved data in this profile will be deleted permanently and recovery of loss data is not possible',
            confirmCallback: () => deleteProfileById(id)
        }));
    }

    const handleClickUpdateButton = (id) => {
        history.push(PATH.ADD_PROFILE, {
            profileId: id
        })
    }

    return (
        <List className={ classes.container }>
            <Typography variant="subtitle1" color="initial">
            </Typography>
            {
                AUTH.profiles.map(({ id: profileId, name, avatar, is_profile_locked, is_for_kids }, index) => (
                    <div key={ index }>
                        <List className={classes.profileContainer} onClick={ () => handleClickSetId(profileId) } >
                            <ListItem>
                                <ListItemAvatar>
                                    <img src={ avatar } className={ classes.avatar } />
                                </ListItemAvatar>
                                <ListItemText primary={ name } secondary={
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
                                    <ListItemSecondaryAction onClick={ () => handleClickDeleteConfirmation(profileId, name) }>
                                        <DeleteIcon className={ classes.deleteIcon } />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Update Profile" />
                                    <ListItemSecondaryAction onClick={ () => handleClickUpdateButton(profileId) }>
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
