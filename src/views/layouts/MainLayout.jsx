import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Material styles */
import mainLayoutUseStyles from './../../assets/js/material-ui/mainLayoutUseStyles';

/** Material UI Components */
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import { List, Divider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Selectors */
import { selectMainLayout } from '../../redux/modules/main-layout/selector';

import VideoManagement from './main-layout-drawer-list/VideoManagement';
import AppLogo from './main-layout-drawer-list/AppLogo';
import Dashboard from './main-layout-drawer-list/Dashboard';
import AppBarContent from './main-layout-header/AppBarContent';
import AccessRight from './main-layout-drawer-list/AccessRight';
import ActivityLog from './main-layout-drawer-list/ActivityLog';



const MainLayout = ({ children, MAIN_LAYOUT }) => 
{
    const classes = mainLayoutUseStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: MAIN_LAYOUT.drawer,
                })}
            >
                <AppBarContent />
            </AppBar>
            <Drawer
                variant='permanent'
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
                    <Divider light/>
                    <VideoManagement /> 
                    <Divider light />   
                    <AccessRight />   
                    <Divider light/>    
                    <ActivityLog />
                    <Divider light/>
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
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(MainLayout);