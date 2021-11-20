import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { IconButton, makeStyles } from '@material-ui/core';
import Colors from './../../constants/Colors';
import { Update } from '@material-ui/icons';

const dataNotFoundUseStyles = makeStyles(theme => ({
    icon: {
        fontSize: '10rem',
        width: '100%',
        textAlign: 'center'
    },
    notFoundText: {
        backgroundColor: theme.palette.warning.main,
        color: Colors.darkMode,
        padding: '1rem',
        borderRadius: 5
    },
    mark: {
        color: theme.palette.error.main
    },
    updateIcon: {
        color: Colors.info,
        fontSize: '3rem',
        textAlign: 'center'
    },
    updateIconBtn: {
        marginRight: '0.5rem'
    },
    updateIconContainer: {
        textAlign: 'center'
    },
    reloadDataText: {
        color: Colors.info,
        fontWeight: 'bold'
    }
}));

const DataNotFound = ({ type, Icon, handleClickRefresh }) => 
{
    const classes = dataNotFoundUseStyles();

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={ 12 }>
                    <Icon className={ classes.icon } />
                </Grid>
                <Grid item xs={ 12 }>
                    <Grid container spacing={1} justify='center' alignItems='center'>
                        <Grid item xs={ 12 }>
                            <Typography variant="h3" color="initial" align='center'>{ type.toUpperCase() }</Typography>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Typography
                                variant="h1"
                                align='center'
                                className={ classes.notFoundText }
                            >
                                NOT FOUND
                                <span className={ classes.mark }>!</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography variant="subtitle1" color="textSecondary" align='center'>
                        The { type } that you are finding may have been already deleted or yet to be created.
                    </Typography>
                </Grid>
                {
                    typeof handleClickRefresh === 'function' && (
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <div className={ classes.updateIconContainer }>
                                <IconButton onClick={ handleClickRefresh } className={ classes.updateIconBtn }>
                                    <Update className={ classes.updateIcon } />
                                </IconButton>
                                <Typography variant="caption" color="initial" className={ classes.reloadDataText }>Reload Data</Typography>
                            </div>
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}

export default DataNotFound
