import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core';
import Colors from './../../constants/Colors';

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
    }
}));

const DataNotFound = ({ type, Icon }) => 
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
            </Grid>
        </Container>
    )
}

export default DataNotFound
