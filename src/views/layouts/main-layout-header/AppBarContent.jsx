import React from 'react'
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { connect, useDispatch } from 'react-redux';
import mainLayoutUseStyles from './../../../assets/js/material-ui/mainLayoutUseStyles';
import * as MAIN_LAYOUT_ACTION from '../../../redux/modules/main-layout/actions'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import MenuIcon from '@material-ui/icons/Menu';
import { selectAuth } from './../../../redux/modules/auth/selector';
import SearchField from '../../../components/styled-components/SearchField';
import TextContentLoader from '../../../components/content-loader/TextContentLoader';

const AppBarContent = ({ AUTH, MAIN_LAYOUT }) => 
{
    const classes = mainLayoutUseStyles();
    const dispatch = useDispatch();

    const handleToggleDrawer = () => dispatch(MAIN_LAYOUT_ACTION.toggleDrawer());

    return (
        <Toolbar>
            <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={ handleToggleDrawer }
                edge='start'
                className={clsx(classes.menuButton, {
                    [classes.hide]: MAIN_LAYOUT.drawer,
                })}
            >
                <MenuIcon />
            </IconButton>
            <div className={ classes.appBarContent }>
                <Typography variant='subtitle1' noWrap className={ classes.header }>
                    {
                        !AUTH.user 
                            ? <TextContentLoader variant='subtitle1' width={ 350 } />
                            : (
                                (MAIN_LAYOUT.currentSelectedItem === 'Dashboard')
                                    ? `Greetings ${ AUTH.user.first_name }!`
                                    : MAIN_LAYOUT.currentSelectedItem
                            )
                    } 
                </Typography>
                <SearchField />
            </div>
            <Header />
        </Toolbar>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(AppBarContent)
