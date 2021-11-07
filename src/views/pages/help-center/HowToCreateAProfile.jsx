import React from 'react'
import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles, IconButton, Typography } from '@material-ui/core';
import Colors from './../../../constants/Colors';
import CreateAnAccount from './CreateAnAccount';

const howToCreateProfileUseStyles = makeStyles(theme => ({
    arrowBackLabel: {
        paddingLeft: '0.5rem',
        fontSize: '0.85rem'
    },
    headerTitle: {
        marginBottom: '2rem'
    },
    instructions: {
        marginBottom: '1rem'
    },
    steps: {
        color: Colors.grey,
        paddingLeft: '0.5rem'
    }
}));

const profileFeatures = [
    '1. Profile Lock',
    '2. My List', 
    '3. Ratings',
    '4. Recently Watch'
];

const HowToCreateAProfile = () => 
{
    const classes = howToCreateProfileUseStyles();
    const history = useHistory();

    return (
        <Container maxWidth="lg">
            <IconButton onClick={ () => history.goBack() }>
                <ArrowBack />
            </IconButton>
            <small className={ classes.arrowBackLabel }>Go back</small>
            <Typography variant="h4" color="initial" className={ classes.headerTitle }>
                <strong>How to update or change your plan?</strong>
            </Typography>
            <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.instructions }>
                Different plan has different number of profiles allowed to be created and you can have upto 5 profiles with a <strong>Premium Plan</strong>
            </Typography>
            {
                profileFeatures.map(feature => (
                    <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.steps }>
                        { feature }
                    </Typography>
                ))
            }
            <CreateAnAccount />
        </Container>
    )
}       

export default HowToCreateAProfile
