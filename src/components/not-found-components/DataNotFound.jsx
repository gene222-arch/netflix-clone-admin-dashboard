import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core';

const dataNotFoundUseStyles = makeStyles(theme => ({
    icon: {
        fontSize: '10rem',
        width: '100%',
        textAlign: 'center'
    }
}));

const DataNotFound = ({ type, Icon }) => 
{
    const classes = dataNotFoundUseStyles();

    return (
        <Container maxWidth="sm">
            <Grid container spacing={1}>
                <Grid item xs={ 12 }>
                    <Icon className={ classes.icon } />
                </Grid>
                <Grid item xs={ 12 }>
                    <Grid container spacing={1} justify='center' alignItems='center'>
                        <Grid item>
                            <Typography variant="h3" color="initial" align='center'>{ type } Is</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h3" color='error'>Not Found</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography variant="subtitle1" color="textSecondary" align='center'>
                        Please try again.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DataNotFound
