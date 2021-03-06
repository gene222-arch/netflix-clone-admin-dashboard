import React from 'react'
import { Container, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import CurrentSubscripton from './CurrentSubscripton';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import Forbidden from './../../errors/Forbidden';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const managePlanUseStyles = makeStyles(theme => ({
    container: {
        marginTop: '4.2vh',
        height: '88.5vh'
    },
}));

const ManagePlan = ({ AUTH }) => 
{
    const classes = managePlanUseStyles();
    const history = useHistory();

    if (['expired', 'cancelled'].includes(AUTH.subscription_details.status)) {
        return (
            <Container maxWidth="lg" style={{ height: '80vh' }}>
                <Forbidden />
            </Container>
        )
    }

    return (
        <Container maxWidth="md" className={ classes.container }>
            <Grid container spacing={ 5 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Grid container alignItems='center' spacing={ 1 }>
                        <Grid item>
                            <IconButton onClick={ () => history.goBack() }>
                                <ArrowBack />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" color="initial" gutterBottom>
                                <strong>Manage Plan</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <CurrentSubscripton />
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(ManagePlan)

