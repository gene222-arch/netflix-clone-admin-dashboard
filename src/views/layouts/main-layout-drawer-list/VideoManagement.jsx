import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import MailIcon from '@material-ui/icons/Mail';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import DropdownIcon from '../../../components/DropdownIcon';
import MovieIcon from '@material-ui/icons/Movie';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { connect, useDispatch } from 'react-redux';
import mainLayoutUseStyles from '../../../assets/js/material-ui/mainLayoutUseStyles';
import * as MAIN_LAYOUT_ACTION from '../../../redux/modules/main-layout/actions'
import StyledNavLink from '../../../components/styled-components/StyledNavLink';


const VideoManagement = ({ MAIN_LAYOUT }) => 
{
    const classes = mainLayoutUseStyles();
    const dispatch = useDispatch();

    const handleToggleVideoMngmt = () => dispatch(MAIN_LAYOUT_ACTION.toggleVideoManagement());

    const selectVideoManagementGenres = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementGenres());

    const selectVideoManagementCasts = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementCasts());

    const selectVideoManagementVideos = () => dispatch(MAIN_LAYOUT_ACTION.selectVideoManagementVideos());

    return (
        <>
            <ListItem button onClick={ handleToggleVideoMngmt }>
                <ListItemIcon>
                    <MovieIcon />
                </ListItemIcon>
                <ListItemText primary={'Video Management'} />
                <DropdownIcon open={ MAIN_LAYOUT.videoManagement } />
            </ListItem>
            
            <Collapse 
                in={ MAIN_LAYOUT.videoManagement } 
                timeout='auto' 
                unmountOnExit 
                className={ classes.collapseChildren  }
            >
                <List component='div' disablePadding>
                    {/* Genres */}
                    <StyledNavLink 
                        to=''
                        text={
                            <ListItem button selected={ MAIN_LAYOUT.videoManagementGenres } onClick={ selectVideoManagementGenres }>
                                <ListItemText primary='Genres'/>
                                <EmojiEmotionsIcon />
                            </ListItem>
                        }
                    />

                    {/* Casts */}
                    <StyledNavLink 
                        to=''
                        text={
                            <ListItem button selected={ MAIN_LAYOUT.videoManagementCasts } onClick={ selectVideoManagementCasts }>
                                <ListItemText primary='Casts'/>
                                <SportsKabaddiIcon />
                            </ListItem>
                        }
                    />

                    {/* Videos */}
                    <StyledNavLink 
                        to=''
                        text={
                            <ListItem button selected={ MAIN_LAYOUT.videoManagementVideos } onClick={ selectVideoManagementVideos }>
                                <ListItemText primary='Videos'/>
                                <VideoLibraryIcon />
                            </ListItem>
                        }
                    />
                </List>
            </Collapse>            
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(VideoManagement)
