import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Colors from '../../../constants/Colors';


const userProfileUseStyles = makeStyles(theme => ({
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
            boxShadow: 'inset 0px 0px 0px 10px #f00'
        }
    },
    subContainer: {
        height: '52vh'
    },
    avatarContainer: {
    }
}));

const UserProfile = ({ AUTH }) => 
{
    const classes = userProfileUseStyles();

    return (
        <Container maxWidth="md">
            <Grid container justify='center' alignItems='center' className={ classes.subContainer }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h2" color="initial" align='center'>Profiles</Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Grid container spacing={1} justify='space-evenly' className={ classes.avatarContainer }>
                    {
                        AUTH.profiles.map(({ name, avatar }) => (
                            <Grid item xs={ 3 } sm={ 3 } md={ 2 } lg={ 2 }>
                                <img src={ avatar } className={ classes.avatarImg } />
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
