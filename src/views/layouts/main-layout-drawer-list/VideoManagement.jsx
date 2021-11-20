import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import DropdownIcon from '../../../components/DropdownIcon';
import MovieIcon from '@material-ui/icons/Movie';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CastIcon from '@material-ui/icons/RecentActors';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { connect, useDispatch } from 'react-redux';
import mainLayoutUseStyles from '../../../assets/js/material-ui/mainLayoutUseStyles';
import * as MAIN_LAYOUT_ACTION from '../../../redux/modules/main-layout/actions'
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import { selectAuth } from './../../../redux/modules/auth/selector';
import ToolTipComponent from '../../../components/ToolTipComponent';

const videoManagementPermissions = [
    'Manage Authors',
    'Manage Casts',
    'Manage Directors',
    'Manage Genres',
    'Manage Movies',
    'Manage Coming Soon Movies'
];

const VideoManagement = ({ MAIN_LAYOUT, AUTH }) => 
{
    const classes = mainLayoutUseStyles();
    const dispatch = useDispatch();
    const hasPermissions = videoManagementPermissions.filter(permission => AUTH.permissions.includes(permission)).length;


    const handleToggleVideoMngmt = () => dispatch(MAIN_LAYOUT_ACTION.toggleVideoManagement());

    const selectVideoManagementAuthors = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementAuthors());

    const selectVideoManagementCasts = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementCasts());
    
    const selectVideoManagementDirectors = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementDirectors());

    const selectVideoManagementGenres = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementGenres());

    const selectVideoManagementMovies = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementMovies());

    const selectVideoManagementComingSoonMovies = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementComingSoonMovies());

    return Boolean(hasPermissions) && (
        <>
            <ToolTipComponent 
                withToolTip={ !MAIN_LAYOUT.drawer }
                title='Video Management'
                component={ 
                    <ListItem button onClick={ handleToggleVideoMngmt }>
                        <ListItemIcon>
                            <MovieIcon className={ classes.icon } />
                        </ListItemIcon>
                        <ListItemText primary={'Video Management'} />
                        <DropdownIcon open={ MAIN_LAYOUT.videoManagement } />
                    </ListItem>
                }
            />
            
            <Collapse 
                in={ MAIN_LAYOUT.videoManagement } 
                timeout='auto' 
                unmountOnExit 
                className={ classes.collapseChildren  }
            >
                <List component='div' disablePadding>
                    {/* Authors */}
                    {
                        AUTH.permissions?.includes('Manage Authors') && (
                            <StyledNavLink 
                                to={ PATH.VIDEO_MANAGEMENT_AUTHOR }
                                text={
                                    <ListItem button selected={ MAIN_LAYOUT.videoManagementAuthors } onClick={ selectVideoManagementAuthors }>
                                        <ListItemText primary='Authors'/>
                                        <SportsKabaddiIcon />
                                    </ListItem>
                                }
                            />
                        )
                    }

                    {/* Casts */}
                    {
                         AUTH.permissions?.includes('Manage Casts') && ( 
                            <StyledNavLink 
                                to={ PATH.VIDEO_MANAGEMENT_CAST }
                                text={
                                    <ListItem button selected={ MAIN_LAYOUT.videoManagementCasts } onClick={ selectVideoManagementCasts }>
                                        <ListItemText primary='Casts'/>
                                        <CastIcon />
                                    </ListItem>
                                }
                            />
                        )
                    }

                    {/* Directors */}
                    {
                        AUTH.permissions?.includes('Manage Directors') && ( 
                            <StyledNavLink 
                                to={ PATH.VIDEO_MANAGEMENT_DIRECTOR }
                                text={
                                    <ListItem button selected={ MAIN_LAYOUT.videoManagementDirectors } onClick={ selectVideoManagementDirectors }>
                                        <ListItemText primary='Directors'/>
                                        <SupervisedUserCircleIcon />
                                    </ListItem>
                                }
                            />
                        )
                    }
                    {/* Genres */}
                    {
                        AUTH.permissions?.includes('Manage Genres') && 
                        (
                            <StyledNavLink 
                                to={ PATH.VIDEO_MANAGEMENT_GENRE }
                                text={
                                    <ListItem button selected={ MAIN_LAYOUT.videoManagementGenres } onClick={ selectVideoManagementGenres }>
                                        <ListItemText primary='Genres'/>
                                        <EmojiEmotionsIcon />
                                    </ListItem>
                                }
                            />
                        )
                    }
                    {/* Movies */}
                    {
                        AUTH.permissions?.includes('Manage Movies') && 
                        (
                            <StyledNavLink 
                                to={ PATH.VIDEO_MANAGEMENT_MOVIES }
                                text={
                                    <ListItem button selected={ MAIN_LAYOUT.videoManagementMovies } onClick={ selectVideoManagementMovies }>
                                        <ListItemText primary='Movies'/>
                                        <VideoLibraryIcon />
                                    </ListItem>
                                }
                            />
                        )
                    }

                     {/* Coming Soon Movies */}
                     {
                        AUTH.permissions?.includes('Manage Coming Soon Movies') && 
                        (
                            <StyledNavLink 
                                to={ PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES }
                                text={
                                    <ListItem button selected={ MAIN_LAYOUT.videoManagementComingSoonMovies } onClick={ selectVideoManagementComingSoonMovies }>
                                        <ListItemText primary='Coming Soon Movies'/>
                                        <NewReleasesIcon />
                                    </ListItem>
                                }
                            />
                        )
                    }
                </List>
            </Collapse>            
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(VideoManagement)
