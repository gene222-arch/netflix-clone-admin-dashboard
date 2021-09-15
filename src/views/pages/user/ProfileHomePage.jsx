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
import PATH from './../../../routes/path';
import AvatarList from './settings/profile-home-page/AvatarList';

const profileHomePageUseStyles = makeStyles(theme => ({
    container: {
        padding: '2rem 0'
    },
    divider: {
        marginTop: '1rem',
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

    const handleChangePinLock = () => history.push(PATH.PROFILE_LOCK.replace(':id', id));

    const memberShipActionButtons = 
    [
        {
            id: 'email',
            icon: MailOutlineIcon,
            primaryText: AUTH.user.email,
            actionText: 'Change account email',
            actionPath: PATH.PROFILE_LOCK.replace(':id', id),
            isTextSecondary: false
        },
        {
            id: 'password',
            icon: LockOpenIcon,
            primaryText: 'Password',
            actionText: 'Change account password',
            actionPath: PATH.PROFILE_LOCK.replace(':id', id),
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
                    <AvatarList 
                        id={ id } 
                        handleClickSetId={ handleClickSetId } 
                        handleChangePinLock={ handleChangePinLock } 
                    />
                </Grid>
            </Grid>
            
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth 
});

export default connect(mapStateToProps)(ProfileHomePage)
