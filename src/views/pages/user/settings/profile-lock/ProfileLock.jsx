import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../../../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputPassword from './InputPassword';
import ContinueProfileLock from './ContinueProfileLock';

const profileLockUseStyles = makeStyles(theme => ({
    avatar: {
        width: '4rem',
        borderRadius: 5,
        marginRight: '1rem'
    },
    container: {
        height: '91.7vh'
    }
}));

const ProfileLock = ({ AUTH }) => 
{
    const { id } = useParams();
    const classes = profileLockUseStyles();
    const history = useHistory();

    const [ continueProfileLock, setContinueProfileLock ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ profile, setProfile ] = useState(AUTH.profile);

    const onLoadFetchProfile = () => setProfile(AUTH.profiles.find(({ id: profileId }) => profileId === parseInt(id)));

    const handleClickContinue = () => {
        setContinueProfileLock(true);
    }

    const handleClickCancel = () => history.goBack();

    useEffect(() => 
    {
        onLoadFetchProfile();
        return () => {
            setProfile(AUTH.profile);
            setPassword('');
        }
    }, []);

    return (
        <Container maxWidth="md" className={ classes.container } >
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Grid container alignItems='center' justify='space-between'>
                        <Grid item>
                            <Typography variant="h4" color="initial" gutterBottom>
                                <strong>Profile Lock</strong>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <img src={ profile?.avatar } className={ classes.avatar } />
                        </Grid>
                    </Grid>
                </Grid>
                {
                    !continueProfileLock 
                        ? (
                            <InputPassword 
                                profileName={ profile?.name }
                                setPassword={ setPassword }
                                handleClickContinue={ handleClickContinue }
                                handleClickCancel={ handleClickCancel }
                            />
                        )
                        : <ContinueProfileLock profileName={ profile?.name } />
                }
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(ProfileLock)
