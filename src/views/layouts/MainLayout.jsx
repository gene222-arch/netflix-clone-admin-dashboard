import React, { useEffect } from 'react';
import clsx from 'clsx';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Material styles */
import { useTheme } from '@material-ui/core/styles';
import mainLayoutUseStyles from './../../assets/js/material-ui/mainLayoutUseStyles';

/** Material UI Components */
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/** Actions */
import * as AUTH_ACTION from '../../redux/modules/auth/actions'
import * as MAIN_LAYOUT_ACTION from '../../redux/modules/main-layout/actions'

/** Selectors */
import { selectAuth } from './../../redux/modules/auth/selector';
import { selectMainLayout } from '../../redux/modules/main-layout/selector';
import VideoManagement from './main-layout-drawer-list/VideoManagement';
import SecondListItem from './main-layout-drawer-list/SecondListItem';
import Header from './main-layout-header/Header';
import AppLogo from './main-layout-drawer-list/AppLogo';
import Dashboard from './main-layout-drawer-list/Dashboard';



const MainLayout = ({ AUTH, children, MAIN_LAYOUT }) => 
{
    const dispatch = useDispatch();
    const classes = mainLayoutUseStyles();

    const handleToggleDrawer = () => dispatch(MAIN_LAYOUT_ACTION.toggleDrawer());

    const handleClickLogout = () => dispatch(AUTH.logoutStart());

    useEffect(() => {
        dispatch(AUTH_ACTION.authUser());
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: MAIN_LAYOUT.drawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={ handleToggleDrawer }
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: MAIN_LAYOUT.drawer,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={ classes.header }>
                        { MAIN_LAYOUT.currentSelectedItem }
                    </Typography>
                    <Header 
                        user={ AUTH.user } 
                        handleClickLogout={ handleClickLogout }
                    />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: MAIN_LAYOUT.drawer,
                    [classes.drawerClose]: !MAIN_LAYOUT.drawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: MAIN_LAYOUT.drawer,
                        [classes.drawerClose]: !MAIN_LAYOUT.drawer,
                    }),
                }}
            >
                {/* Application Logo/Header */}
                <AppLogo />
                
                {/* Drawer list */}
                <List></List>
                <List>
                    <Dashboard />
                    <VideoManagement />
                    <SecondListItem />                 
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                { children }
            </main>
            
        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps, null)(MainLayout);