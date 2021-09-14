import React from 'react'
import APP_LOGO from './../../assets/images/app/iconflicklify.ico'
import { makeStyles } from '@material-ui/core/styles';

const appHeaderUseStyles = makeStyles(theme => ({
    logo: {
        width: '2.5rem',
        height: 'auto',
        padding: theme.spacing(2, 0)
    }
}));

const AppHeader = () => 
{
    const classes = appHeaderUseStyles();

    return (
        <img 
            src={ APP_LOGO }
            className={ classes.logo }
        />
    )
}

export default AppHeader
