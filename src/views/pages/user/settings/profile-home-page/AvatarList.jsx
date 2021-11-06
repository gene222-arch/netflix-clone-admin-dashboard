import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Collapse, ListItemSecondaryAction, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import PATH from './../../../../../routes/path';
import StyledNavLink from './../../../../../components/styled-components/StyledNavLink';
import { ChildCareRounded } from '@material-ui/icons';

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
    divider: {
        marginTop: '1rem',
    },
    expandIcon: {
        fontSize: '2rem'
    },
}));

const AvatarList = ({ AUTH, id, handleClickSetId, handleChangePinLock }) => 
{
    const classes = avatarListUseStyles();

    return (
        <List className={ classes.container }>
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
