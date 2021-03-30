import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom'
import clsx from 'clsx';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Material styles */
import { useTheme } from '@material-ui/core/styles';
/** Material UI Components */
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainLayoutUseStyles } from '../../assets/js/material-ui/materialUIStyles'

/** Actions */
import * as AUTH from '../../redux/modules/auth/actions'
import * as MAIN_LAYOUT from '../../redux/modules/main-layout/actions'

/** Selectors */
import { selectAuth } from './../../redux/modules/auth/selector';
import { selectMainLayout } from '../../redux/modules/main-layout/selector';
import Dropdown from './main-layout-drawer-list/Dropdown';
import SecondListItem from './main-layout-drawer-list/SecondListItem';
import Header from './main-layout-header/Header';




const MainLayout = ({ auth, children, mainLayout }) => 
{
    const dispatch = useDispatch();
    const classes = mainLayoutUseStyles();
    const theme = useTheme();

    const handleToggleDrawer = () => dispatch(MAIN_LAYOUT.toggleDrawer());

    const handleToggleDropdown = () => dispatch(MAIN_LAYOUT.toggleDropdown());

    const toggleDropdownItemOne = () => dispatch(MAIN_LAYOUT.openDropdownItemOne());

    const toggleDropdownItemTwo = () => dispatch(MAIN_LAYOUT.openDropdownItemTwo());

    const handleToggleSecondListItem = () => dispatch(MAIN_LAYOUT.toggleSecondListItem());

    const handleClickLogout = () => dispatch(AUTH.logoutStart());

    useEffect(() => {
        dispatch(AUTH.authUser());
    }, []);

    return auth.user && (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: mainLayout.drawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={ handleToggleDrawer }
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: mainLayout.drawer,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={ classes.header }>
                        { mainLayout.currentSelectedItem }
                    </Typography>
                    <Header 
                        user={ auth.user } 
                        handleClickLogout={ handleClickLogout }
                    />
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: mainLayout.drawer,
                    [classes.drawerClose]: !mainLayout.drawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: mainLayout.drawer,
                        [classes.drawerClose]: !mainLayout.drawer,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={ handleToggleDrawer }>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>

                <Divider />

                <List>
                    {/* List item 1 */}
                    <Dropdown 
                        open={ mainLayout.dropdown } 
                        handleToggle={ handleToggleDropdown }
                        classes={ classes.collapseChildren }
                        itemOne={ mainLayout.dropdownItemOne }
                        itemTwo={ mainLayout.dropdownItemTwo }
                        toggleDropdownItemOne= { toggleDropdownItemOne }
                        toggleDropdownItemTwo= { toggleDropdownItemTwo }
                    />

                    {/* List item 2 */}
                    <SecondListItem 
                        open={ mainLayout.secondListItem }
                        handleToggle={ handleToggleSecondListItem }  
                        classes={ classes.collapseChildren }
                    />                 
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
    auth: selectAuth,
    mainLayout: selectMainLayout
});

export default connect(mapStateToProps, null)(MainLayout);