import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { useHistory } from 'react-router-dom';
import PATH from './../../../routes/path';
import AvatarList from './settings/profile-home-page/AvatarList';
import Membership from './settings/profile-home-page/Membership';

const profileHomePageUseStyles = makeStyles(theme => ({
    container: {
        padding: '2rem 0.5rem'
    },
    divider: {
        marginTop: '1rem',
    },
    gridContainer: {
        padding: '1.5rem 0'
    }, 
    profileContainer: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const ProfileHomePage = ({ AUTH }) => 
{
    const classes = profileHomePageUseStyles();
    const history = useHistory();

    const [ id, setId ] = useState(null);

    const handleClickSetId = (profileId) => setId(!id ? profileId : null);

    const handleChangePinLock = () => history.push(PATH.PROFILE_LOCK.replace(':id', id));

    useEffect(() => {
        return () => {
            setId(null);
        }
    }, [])

    return (
        <Container maxWidth="md" className={ classes.container } style={{ height: AUTH.profiles.length <= 2 ? '90vh' : 'auto' }}>
            <Grid container spacing={1} alignItems='center'>
                <Grid item>
                    <Typography variant="h4" color="initial" gutterBottom>
                        Account
                    </Typography>
                </Grid> 
                <Grid item>
                    <VideoLibraryIcon /> 
                </Grid>
                <Grid item>
                    <Typography variant='caption' color="textSecondary">
                        <strong>MEMBER SINCE { AUTH.user.account_created_at.toUpperCase() }</strong>
                    </Typography>
                </Grid>
            </Grid>
            
            <Divider />
            <Membership />
            <Divider />

            <Grid container spacing={1} className={ classes.gridContainer } >
                <Grid item xs={ 12 } sm={ 3 } md={ 3 } lg={ 3 }>
                    <Typography variant="subtitle1" color="initial">PROFILE & PARENTAL CONTROLS</Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 9 } md={ 9 } lg={ 9 }>
                    {
                        !AUTH.profiles.length 
                            ? <Typography variant="h4" color="textSecondary" align='center'>No profile created yet</Typography>
                            : (
                                <AvatarList 
                                    id={ id } 
                                    handleClickSetId={ handleClickSetId } 
                                    handleChangePinLock={ handleChangePinLock } 
                                />
                            )
                    }
                </Grid>
            </Grid>
            
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth 
});

export default connect(mapStateToProps)(ProfileHomePage)
