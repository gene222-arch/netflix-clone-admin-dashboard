import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import APP_LOGO from './../../assets/images/app/LOGO.png'
import { Link } from 'react-router-dom';
import PATH from '../../routes/path'
import authLayoutHeaderUseStyles from '../../assets/js/material-ui/authLayoutHeaderUseStyles';

const AuthLayoutHeader = () => 
{
    const classes = authLayoutHeaderUseStyles();

    return (
        <Container maxWidth='xl'>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item>
                    <img 
                        src={ APP_LOGO }
                        className={ classes.logo }
                    />
                </Grid>
                <Grid item>
                    <Link 
                        href={ PATH.LOGIN } 
                        color='inherit' 
                        variant='body2'
                        className={ classes.link }
                    >
                        <Typography variant="subtitle1" className={ classes.linkText }>Sign In</Typography>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AuthLayoutHeader