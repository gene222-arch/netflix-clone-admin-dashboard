import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import APP_LOGO from './../../assets/images/app/iconflicklify.ico'
import { Link } from 'react-router-dom';
import PATH from '../../routes/path'
import authLayoutHeaderUseStyles from '../../assets/js/material-ui/authLayoutHeaderUseStyles';

const AuthLayoutHeader = ({ signInButton = true }) => 
{
    const classes = authLayoutHeaderUseStyles();

    return (
        <Container maxWidth='xl' className={ classes.container }>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item>
                    <img 
                        src={ APP_LOGO }
                        className={ classes.logo }
                    />
                </Grid>
                <Grid item>
                    {
                        signInButton && (
                            <Link 
                                to={ PATH.LOGIN } 
                                color='inherit' 
                                variant='body2'
                                className={ classes.link }
                            >
                                <Typography variant="subtitle1" className={ classes.linkText }>Sign In</Typography>
                            </Link>
                        )
                    }
                </Grid>
            </Grid>
        </Container>
    );
}

export default AuthLayoutHeader