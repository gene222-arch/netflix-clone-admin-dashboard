import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import searchFieldUseStyles from './../../assets/js/material-ui/searchField';

const SearchField = () => 
{
  const classes = searchFieldUseStyles();

    return (
            <Paper component='form' className={classes.root}>
                <IconButton className={classes.iconButton} aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder='Search'
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type='submit' className={classes.iconButton} aria-label='search'>
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation='vertical' />
                <IconButton color='primary' className={classes.iconButton} aria-label='directions'>
                    <DirectionsIcon />
                </IconButton>
            </Paper>
    );
}

export default SearchField