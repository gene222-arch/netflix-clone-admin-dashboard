import React, { useState, useEffect } from 'react'
import APP_LOGO from './../../assets/images/app/iconflicklify.ico'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Colors from './../../constants/Colors';
import AppHeaderMenu from './AppHeaderMenu';


const appHeaderUseStyles = makeStyles(theme => ({
    avatar: {
        width: '2.5rem',
        borderRadius: 5,
        padding: theme.spacing(2, 0)
    },
    container: {
        backgroundColor: Colors.dark
    },
    logo: {
        width: '2.5rem',
        height: 'auto',
        padding: theme.spacing(2, 0)
    }
}));

const AppHeader = ({ AUTH }) => 
{
    const classes = appHeaderUseStyles();

    const [ anchorEl, setAnchorEl ] = useState(null);

    useEffect(() => {
        return () => {
            setAnchorEl(null);
        }
    }, []);

    return (
        <Container maxWidth="xl" className={ classes.container }>
            <AppHeaderMenu anchorEl={ anchorEl } setAnchorEl={ setAnchorEl } />
            <Grid container spacing={1} justify='space-between'>
                <Grid item>
                    <img 
                        src={ APP_LOGO }
                        className={ classes.logo }
                    />
                </Grid>
                <Grid item>
                    <Grid container spacing={1} alignItems='center' >
                        <Grid item>
                            <Typography variant="subtitle1" color="initial">{ AUTH.selectedProfile?.name }</Typography>
                        </Grid>
                        <Grid item>
                            <img 
                                src={ AUTH.selectedProfile?.avatar }
                                className={ classes.avatar }
                                onMouseOver={ e => setAnchorEl(e.currentTarget) }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(AppHeader)
