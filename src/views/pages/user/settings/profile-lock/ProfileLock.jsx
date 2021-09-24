import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../../../../../redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import InputPassword from './InputPassword';
import ContinueProfileLock from './ContinueProfileLock';
import * as AUTH_API from './../../../../../services/auth/auth'
// import * as AUTH_ACTION from './../../../../../redux/modules/auth/actions'
// import * as USER_API from './../../../../../services/users/user'
// import * as QueryParam from './../../../../../utils/queryParams'
// import * as Cookies from './../../../../../utils/cookies'


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
    const dispatch = useDispatch();
    const history = useHistory();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ continueProfileLock, setContinueProfileLock ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const [ profile, setProfile ] = useState(AUTH.profile);

    const onLoadFetchProfile = () => setProfile(AUTH.profiles.find(({ id: profileId }) => profileId === parseInt(id)));

    const handleClickContinue = async () => 
    {
        setIsLoading(true);

        try {
            const { status } = await AUTH_API.checkPasswordMatchAsync({ password });

            if (status === 'success') {
                setContinueProfileLock(true);
            }
        } catch ({ message }) {
            setPasswordErrorMessage(!password ? message.password : message);
        }

        setIsLoading(false);
    }

    const handleClickCancel = () => history.goBack();

    // const loginUserViaToken = async (profileId, action) => 
    // {
    //     try {
    //         const { data } = await USER_API.fetchByTokenAsync();

    //         const selectedProfile = data.profiles.find(({ id }) => id === parseInt(profileId));

    //         dispatch(AUTH_ACTION.loginViaToken({ ...data, selectedProfile }));
    //     } catch ({ message }) {
            
    //     }
    // }

    const onLoadInvokeActions = () => 
    {
        onLoadFetchProfile();
        
        // const token = QueryParam.get('token');
        // const profileId = QueryParam.get('profileId');
        // const action = QueryParam.get('action');

        // if (token) {
        //     Cookies.set('access_token', token);
        //     loginUserViaToken(profileId, action);
        // }
    }

    useEffect(() => 
    {
        onLoadInvokeActions();

        return () => {
            setProfile(AUTH.profile);
            setPassword('');
            setPasswordErrorMessage('');
            setIsLoading(false);
            setContinueProfileLock(false);
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
                                isLoading={ isLoading }
                                profileName={ profile?.name }
                                password={ password }
                                setPassword={ setPassword }
                                passwordErrorMessage={ passwordErrorMessage }
                                handleClickContinue={ handleClickContinue }
                                handleClickCancel={ handleClickCancel }
                            />
                        )
                        : <ContinueProfileLock profile={ profile } />
                }
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(ProfileLock)
