import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';


const userProfileUseStyles = makeStyles(theme => ({
    avatarContainer: {
        textAlign: 'center'
    },
    avatarGridContainer: {
        marginRight: '1.5rem',
    },
    avatarImg: {
        height: '10vw',
        width: '10vw',
        maxHeight: 200,
        maxWidth: 200,
        minHeight: 84,
        minWidth: 84,
        borderRadius: 5,
        '&:hover': {
            cursor: 'pointer',
        }
    },
    headerTitle: {
        marginBottom: '1rem',
        width: '100%'
    },
    subContainer: {
        height: '70vh'
    },
}));

const UserProfile = ({ AUTH }) => 
{
    const classes = userProfileUseStyles();

    return (
        <Container maxWidth="md">
            <Grid container justify='center' alignItems='center' className={ classes.subContainer }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h2" color="initial" align='center' className={ classes.headerTitle }>Profiles</Typography>
                    <Grid container spacing={3} justify='center' className={ classes.avatarContainer }>
                        {
                            AUTH.profiles.map(({ name, avatar, is_profile_locked }) => (
                                <Grid item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 } className={ classes.avatarGridContainer }>
                                    <Grid container spacing={ 1 } direction='column' justify='center'>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <img src={ avatar } className={ classes.avatarImg } />
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                { name.toUpperCase() }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            { Boolean(is_profile_locked) && <LockIcon color='disabled' /> }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(UserProfile)
