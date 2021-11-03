import React from 'react'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import CurrentSubscripton from './CurrentSubscripton';

const managePlanUseStyles = makeStyles(theme => ({
    container: {
        marginTop: '4.2vh',
        height: '88.5vh'
    },
}));

const index = () => 
{
    const classes = managePlanUseStyles();

    return (
        <Container maxWidth="md" className={ classes.container }>
            <Grid container spacing={ 5 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h4" color="initial" gutterBottom>
                        <strong>Manage Plan</strong>
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <CurrentSubscripton />
                </Grid>
            </Grid>
        </Container>
    )
}

export default index

