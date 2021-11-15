import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, TextField, makeStyles, Button, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import Colors from './../../../constants/Colors';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import * as USER_ACTION from './../../../redux/modules/user/actions'
import PATH from './../../../routes/path';
import CloseIcon from '@material-ui/icons/Close';
import { selectUserHasErrorMessages, selectUserErrorMessages } from './../../../redux/modules/user/selector';

const useStyles = makeStyles(theme => ({
    avatar: {
        maxWidth: '100%',
        objectFit: 'contain',
        borderRadius: 10
    },
    actionIcon: {
        fontSize: '2rem',
        '& :hover': {
            color: Colors.warning,
            cursor: 'pointer'
        }
    },
    closeIcon: {
        fontSize: '2rem',
        '& :hover': {
            color: Colors.error,
            cursor: 'pointer'
        }
    },
    inputContainer: {
        padding: '2rem'
    }
}));

const DisplayInfo = ({ label, value }) => 
{
    return (
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } sm={ 2 } md={ 2 } lg={ 2 }>
                <Typography variant="subtitle1" color="initial">{ label }</Typography>
            </Grid>
            <Grid item xs={ 12 } sm={ 10 } md={ 10 } lg={ 10 }>
                <Typography variant="subtitle1" color="textSecondary">{ value }</Typography>
            </Grid>
        </Grid>
    )
}

const DisplayActionButton = ({ isEditable, setIsEditable, onSave }) => 
{
    const classes = useStyles();

    if (! isEditable) return <EditIcon className={ classes.actionIcon } onClick={ () => setIsEditable(! isEditable) }/>

    if (isEditable) {
        return (
           <Grid container spacing={1} justify='center'>
               <Grid item>
                    <SaveIcon 
                        className={ classes.actionIcon } 
                        onClick={ onSave }
                    />
               </Grid>
               <Grid>
                <CloseIcon onClick={ () => setIsEditable(! isEditable) } className={ classes.closeIcon } />
               </Grid>
           </Grid>
        )
    }
}

const Account = ({ AUTH, ERROR_MESSAGE, HAS_ERROR_MESSAGE }) => 
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ name, setName ] = useState({ first_name: AUTH.user.first_name, last_name: AUTH.user.last_name });
    const [ email, setEmail ] = useState(AUTH.user.email);
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isEmailEditable, setIsEmailEditable ] = useState(false);
    const [ isPasswordEditable, setIsPasswordEditable ] = useState(false);
    const [ isNameEditable, setIsNameEditable ] = useState(false);

    const handleClickSaveName = () => 1;

    const handleClickSaveEmail = () => dispatch(USER_ACTION.updateUserEmailStart({ email, path: PATH.SETTINGS }));

    const handleClickSavePassword = () => {
        dispatch(USER_ACTION.updateUserPasswordStart({ 
            current_password: currentPassword,
            password,
            password_confirmation: password,
            path: PATH.SETTINGS 
        }));
    }
    
    useEffect(() => 
    {
        return () => 
        {
            setName({ first_name: AUTH.user.first_name, last_name: AUTH.user.last_name });
            setEmail(AUTH.user.email);
            setCurrentPassword('');
            setPassword('');
            setIsEmailEditable(false);
            setIsPasswordEditable(false);
            setIsNameEditable(false);
            dispatch(USER_ACTION.clearUserErrors());
        }
    }, []);

    useEffect(() => 
    {
        window.addEventListener('load', () => dispatch(USER_ACTION.clearUserErrors()));

        if (HAS_ERROR_MESSAGE.email) {
            setIsEmailEditable(false);
        }

        if (HAS_ERROR_MESSAGE.password || HAS_ERROR_MESSAGE.current_password) {
            setIsPasswordEditable(false);
        }
    }, [HAS_ERROR_MESSAGE.email, HAS_ERROR_MESSAGE.password, HAS_ERROR_MESSAGE.current_password])

    return (
        <Grid container spacing={1}>
            <Grid item xs={ 12 } sm={ 7 } md={ 7 } lg={ 7 }>
                <Card>
                    <CardContent className={ classes.inputContainer }>
                        <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={ AUTH.user.avatar_path } className={ classes.avatar }/>
                                </div>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={ 11 } sm={ 11 } md={ 11 } lg={ 11 }>
                                        {
                                            isNameEditable
                                                ? (
                                                    <Grid container spacing={ 2 }>
                                                        <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
                                                            <TextField
                                                                label="First Name"
                                                                variant="filled"
                                                                fullWidth
                                                                value={ name.first_name }
                                                                onChange={ e => setName({ ...name, first_name: e.target.value }) }
                                                                error={ HAS_ERROR_MESSAGE.first_name }
                                                                helperText={ ERROR_MESSAGE.first_name }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
                                                            <TextField
                                                                label="Last Name"
                                                                variant="filled"
                                                                fullWidth
                                                                value={ name.last_name }
                                                                onChange={ e => setName({ ...name, last_name: e.target.value }) }
                                                                error={ HAS_ERROR_MESSAGE.last_name }
                                                                helperText={ ERROR_MESSAGE.last_name }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                )
                                                : <DisplayInfo label='Name' value='Gene Phillip D. Artista' />
                                        }
                                    </Grid>
                                    <Grid item xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 }>
                                        <DisplayActionButton 
                                            isEditable={ isNameEditable } 
                                            setIsEditable={ setIsNameEditable }
                                            isLoading={ AUTH.isLoading }
                                            onSave={ handleClickSaveName } 
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={ 11 } sm={ 11 } md={ 11 } lg={ 11 }>
                                        {
                                            isEmailEditable
                                                ? (
                                                    <TextField
                                                        label="Email"
                                                        variant="filled"
                                                        fullWidth
                                                        value={ email }
                                                        onChange={ e => setEmail(e.target.value) }
                                                        error={ HAS_ERROR_MESSAGE.email }
                                                        helperText={ ERROR_MESSAGE.email }
                                                    />
                                                )
                                                : <DisplayInfo label='Email' value={ email } />
                                        }
                                    </Grid>
                                    <Grid item xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 }>
                                        <DisplayActionButton 
                                            isEditable={ isEmailEditable } 
                                            setIsEditable={ setIsEmailEditable }
                                            isLoading={ AUTH.isLoading }
                                            onSave={ handleClickSaveEmail }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item xs={ 11 } sm={ 11 } md={ 11 } lg={ 11 }>
                                        {
                                             HAS_ERROR_MESSAGE.password || isPasswordEditable
                                                ? (
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                                            <TextField
                                                                type='password'
                                                                label="Current Password"
                                                                variant="filled"
                                                                fullWidth
                                                                value={ currentPassword }
                                                                onChange={ e => setCurrentPassword(e.target.value) }
                                                                error={ HAS_ERROR_MESSAGE.current_password }
                                                                helperText={ ERROR_MESSAGE.current_password }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                                            <TextField
                                                                type='password'
                                                                label="New Password"
                                                                variant="filled"
                                                                fullWidth
                                                                value={ password }
                                                                onChange={ e => setPassword(e.target.value) }
                                                                error={ HAS_ERROR_MESSAGE.password }
                                                                helperText={ ERROR_MESSAGE.password }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                )
                                                : <DisplayInfo label='Password' value='*************' />
                                        }
                                    </Grid>
                                    <Grid item xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 }>
                                        <DisplayActionButton 
                                            isEditable={ isPasswordEditable } 
                                            setIsEditable={ setIsPasswordEditable }
                                            isLoading={ AUTH.isLoading }
                                            onSave={ handleClickSavePassword } 
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }></Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    ERROR_MESSAGE: selectUserErrorMessages,
    HAS_ERROR_MESSAGE: selectUserHasErrorMessages
});

export default connect(mapStateToProps)(Account)
