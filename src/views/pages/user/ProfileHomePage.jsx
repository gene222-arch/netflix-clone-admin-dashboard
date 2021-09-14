import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Avatar, Divider, Grid, List, IconButton, ListItem, ListItemAvatar, ListItemText, Collapse, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useHistory } from 'react-router-dom';

const profileHomePageUseStyles = makeStyles(theme => ({
    avatar: {
        width: '4rem',
        borderRadius: 5,
        marginRight: '1rem'
    },
    collapse: {
        paddingLeft: '5rem'
    },
    container: {
        padding: '2rem 0'
    },
    divider: {
        marginTop: '1rem',
    },
    expandIcon: {
        fontSize: '2rem'
    },
    gridContainer: {
        padding: '1.5rem 0'
    }, 
    profileContainer: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const ProfileHomePage = ({ AUTH }) => 
{
    const classes = profileHomePageUseStyles();
    const history = useHistory();

    const [ id, setId ] = useState(null);

    const handleClickSetId = (profileId) =>setId(!id ? profileId : null);

    const handleClickChangePinLick = (profileId) => history.push('path-to-change-profile-lock');

    const memberShipActionButtons = 
    [
        {
            id: 'email',
            icon: MailOutlineIcon,
            primaryText: AUTH.user.email,
            actionText: 'Change account email',
            actionPath: 'path',
            isTextSecondary: false
        },
        {
            id: 'password',
            icon: LockOpenIcon,
            primaryText: 'Password',
            actionText: 'Change account password',
            actionPath: 'path',
            isTextSecondary: true
        },
    ];

    useEffect(() => {
        return () => {
            setId(null);
        }
    }, [])

    return (
        <Container maxWidth="md" className={ classes.container } >
            <Grid container spacing={1} alignItems='center'>
                <Grid item>
                    <Typography variant="h4" color="initial" gutterBottom>
                        Account
                    </Typography>
                </Grid> 
                <Grid item>
                    <VideoLibraryIcon /> 
                </Grid>
                <Grid item>
                    <Typography variant='caption' color="textSecondary">
                        <strong>MEMBER SINCE DECEMBER 2020</strong>
                    </Typography>
                </Grid>
            </Grid>
            
            <Divider />

            <Grid container spacing={1} className={ classes.gridContainer } >
                <Grid item xs={ 12 } sm={ 3 } md={ 3 } lg={ 3 }>
                    <Typography variant="subtitle1" color="initial">MEMBERSHIP</Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 8 } md={ 8 } lg={ 8 }>
                    <List>
                        {
                            memberShipActionButtons.map(({ id, icon: Icon, primaryText, actionText, actionPath, isTextSecondary }) => (
                                <ListItem key={ id }>
                                    <ListItemAvatar>
                                        <Icon color={ isTextSecondary ? 'disabled' : 'action' } />
                                    </ListItemAvatar>
                                    <ListItemText primary={ 
                                        <Typography variant="subtitle1" color={ isTextSecondary ? 'textSecondary' : 'inherit' }>
                                            { primaryText }
                                        </Typography>
                                     } />
                                    <ListItemSecondaryAction>
                                        <StyledNavLink 
                                            to={ actionPath }
                                            text={ actionText }
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
            
            <Divider />

            <Grid container spacing={1} className={ classes.gridContainer } >
                <Grid item xs={ 12 } sm={ 3 } md={ 3 } lg={ 3 }>
                    <Typography variant="subtitle1" color="initial">PROFILE & PARENTAL CONTROLS</Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 9 } md={ 9 } lg={ 9 }>
                    <List>
                        {
                            AUTH.profiles.map(({ id: profileId, name, avatar, is_profile_locked }, index) => (
                                <>
                                    <List key={ index } className={classes.profileContainer} onClick={ () => handleClickSetId(profileId) } >
                                        <ListItem>
                                            <ListItemAvatar>
                                                <img src={ avatar } alt="" className={ classes.avatar } />
                                            </ListItemAvatar>
                                            <ListItemText primary={ name } secondary="All Maturity Ratings" />
                                            {
                                                id === profileId 
                                                    ? <ExpandLessIcon className={ classes.expandIcon }/> 
                                                    : <ExpandMoreIcon className={ classes.expandIcon }/>
                                            }
                                        </ListItem>
                                    </List>
                                    <Collapse in={ id === profileId } timeout="auto" unmountOnExit className={ classes.collapse }>
                                        <List component="div" disablePadding>
                                            <ListItem button onClick={ () => handleClickChangePinLick(profileId) }>
                                                <ListItemText primary="Profile Lock" secondary={ !is_profile_locked ? 'Off' : 'On' } />
                                                <ListItemSecondaryAction>
                                                    <StyledNavLink 
                                                        to={ 'path-to-change-pin-lock' }
                                                        text={ 'Change' }
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                    <Divider className={ classes.divider } />
                                </>
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
            
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth 
});

export default connect(mapStateToProps)(ProfileHomePage)
