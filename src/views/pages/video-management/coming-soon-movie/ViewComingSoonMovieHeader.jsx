import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import PATH from './../../../../routes/path';
import Menu from './../../../../components/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuItemIcon: {
        flex: 1,
    },
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        flexGrow: 1,
    },
}));

const ViewComingSoonMovieHeader = ({ id, comingSoonMovie }) => 
{
    const classes = useStyles();
    const history = useHistory();

    const [ anchorEl ,  setAnchorEl ] = useState(null);

    const handleClickOpenMenu = (event) => setAnchorEl(event.currentTarget);

    const handleClickCloseMenu = () => setAnchorEl(null);

    const handleClickAddTrailer = () => {
        handleClickCloseMenu();
        history.push(PATH.CREATE_TRAILER.replace(':id', id),
        {
            routeName: `Add Trailer for ${ comingSoonMovie.title }`
        });
    }

    const handleClickEdit = () => {
        handleClickCloseMenu();
        history.push(PATH.UPDATE_COMING_SOON_MOVIE.replace(':id', id), {
            routeName: 'View Details'
        });
    }

    const handleClickNavigateBack = () => history.push(PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES);

    return (
        <div className={classes.root}>
             <Menu
                id="action-menu"
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ handleClickCloseMenu }
            >
                <MenuItem onClick={ handleClickAddTrailer } className={ classes.menuItem }>
                    <AddIcon /> 
                    <span>Add Trailer</span>
                </MenuItem>
                <MenuItem onClick={ handleClickEdit } className={ classes.menuItem }>
                    <EditIcon /> 
                    <span>Edit</span>
                </MenuItem>
            </Menu>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' className={classes.menuButton} onClick={ handleClickNavigateBack } color='inherit' aria-label='menu'>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        Coming Soon Movies
                    </Typography>
                    <IconButton edge='start' color='inherit' aria-label='menu' onClick={ handleClickOpenMenu } >
                        <MoreVertIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ViewComingSoonMovieHeader