import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import APP_LOGO from './../../assets/images/app/LOGO.png'
import { Link } from 'react-router-dom';
import Colors from './../../constants/Colors';
import PATH from './../../routes/path'

const useStyles = makeStyles((theme) => ({
    container: {
        height: '10vh',
    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    linkText: {
        fontSize: '1rem',
        color: Colors.white,
        backgroundColor: Colors.netflixRed,
        padding: theme.spacing(.8, 2),
        borderRadius: 4
    },
    logo: {
        width: '12rem',
        height: 'auto'
    }
}));

const Header = () => 
{
    const classes = useStyles();

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

export default Header