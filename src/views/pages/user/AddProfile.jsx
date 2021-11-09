import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button, Container, FormControlLabel, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectAuth } from './../../../redux/modules/auth/selector';
import * as AUTH_ACTION from './../../../redux/modules/auth/actions';
import Colors from './../../../constants/Colors';
import { useLocation } from 'react-router-dom';


const updateEmailUseStyles = makeStyles(theme => 
({
    avatar: {
        width: 300,
        height: 300,
        borderRadius: 5
    },
    avatarContainer: {
        textAlign: 'center'
    },
    btn: {
        padding: '1rem 2rem',
        marginTop: '2rem',
        backgroundColor: Colors.netflixRed,
        color: Colors.white,
        fontWeight: 'bold',
        '&:hover': {
            color: Colors.netflixRed,
            backgroundColor: Colors.white
        }
    },
    container: {
        height: '92vh'
    },
    isForKids: {
        color: Colors.success
    },
    mailIcon: {
        textAlign: 'center',
        fontSize: '3rem',
        width: '100%',
        color: theme.palette.text.disabled
    }
}));

const DEFAULT_AVATAR_URL = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

const AddProfile = ({ AUTH }) => 
{
    const classes = updateEmailUseStyles();
    const dispatch = useDispatch();
    const { state } = useLocation();

    const [ profile, setProfile ] = useState({ ...AUTH.profile, avatar: DEFAULT_AVATAR_URL });
    const [ isProfileIdInState, setIsProfileIdInState ] = useState(false);

    const handleClickButton = () => 
    {
        if (! isProfileIdInState) {
            dispatch(AUTH_ACTION.addProfileStart({ profile }));
        }

        if (isProfileIdInState) {
            dispatch(AUTH_ACTION.updateProfileByIdStart({ profile }));
        }
    }

    const onLoadCheckProfileIdInState = () => 
    {
        if ('profileId' in state) 
        {
            setIsProfileIdInState(true);

            const findProfileById = AUTH.profiles.find(({ id }) => id === state.profileId);
            setProfile(findProfileById);
        }
    }

    useEffect(() => 
    {
        onLoadCheckProfileIdInState();
        return () => {
            setProfile(AUTH.profile);
        }
    }, []);

    return (
        <Container maxWidth="sm" className={ classes.container }>
            <Grid container spacing={ 2 } justify='center' alignItems='center'>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <div className={ classes.avatarContainer }>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"   
                            className={ classes.avatar }
                        />
                    </div>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <FormControlLabel 
                        control={
                            <Switch 
                                checked={ Boolean(profile.is_for_kids) }
                                onChange={ (e, checked) => setProfile({ ...profile, is_for_kids: checked }) }
                                className={ classes.isForKids }
                            />
                        } 
                        label="Kids"
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <TextField
                        label="Name"
                        variant="filled"
                        value={ profile.name }
                        onChange={ (e) => setProfile({ ...profile, name: e.target.value }) }
                        fullWidth
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Button 
                        variant="contained" 
                        color="default" 
                        className={ classes.btn }
                        fullWidth
                        disabled={ AUTH.isLoading }
                        onClick={ handleClickButton }
                    >
                        { !isProfileIdInState ? 'Create' : 'Update' }
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(AddProfile)