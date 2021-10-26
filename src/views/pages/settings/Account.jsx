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
import CircularProgress from '@material-ui/core/CircularProgress';
import * as USER_ACTION from './../../../redux/modules/user/actions'
import PATH from './../../../routes/path';

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

const DisplayActionButton = ({ isEditable, setIsEditable, onSave, isLoading = false }) => 
{
    const classes = useStyles();

    if (! isEditable) return <EditIcon className={ classes.actionIcon } onClick={ () => setIsEditable(! isEditable) }/>

    if (isEditable) {
        return (
            <SaveIcon 
                className={ classes.actionIcon } 
                onClick={ 
                    () => { 
                        onSave(); 
                        setIsEditable(! isEditable && !isLoading); 
                    }
                }
            />
        )
    }
}


const NAME_DEFAULT_PROPS = {
    first_name: '',
    last_name: ''
};

const Account = ({ AUTH }) => 
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ name, setName ] = useState({ first_name: AUTH.user.first_name, last_name: AUTH.user.last_name });
    const [ email, setEmail ] = useState(AUTH.user.email);
    const [ password, setPassword ] = useState('');
    const [ isEmailEditable, setIsEmailEditable ] = useState(false);
    const [ isPasswordEditable, setIsPasswordEditable ] = useState(false);
    const [ isNameEditable, setIsNameEditable ] = useState(false);

    const handleClickSaveName = () => 1;

    const handleClickSaveEmail = () => dispatch(USER_ACTION.updateUserEmailStart({ email, path: PATH.SETTINGS }));

    const handleClickSavePassword = () => dispatch(USER_ACTION.updateUserPasswordStart({ 
        password, 
        password_confirmation: password, 
        path: PATH.SETTINGS 
    }));
    
    useEffect(() => 
    {
        return () => 
        {
            setName({ first_name: AUTH.user.first_name, last_name: AUTH.user.last_name });
            setEmail(AUTH.user.email);
            setPassword('');
            setIsEmailEditable(false);
            setIsPasswordEditable(false);
            setIsNameEditable(false);
        }
    }, []);

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
                                                            />
                                                        </Grid>
                                                        <Grid item xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
                                                            <TextField
                                                                label="Last Name"
                                                                variant="filled"
                                                                fullWidth
                                                                value={ name.last_name }
                                                                onChange={ e => setName({ ...name, last_name: e.target.value }) }
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
                                            isPasswordEditable
                                                ? (
                                                    <TextField
                                                        type='password'
                                                        label="Password"
                                                        variant="filled"
                                                        fullWidth
                                                        value={ password }
                                                        onChange={ e => setPassword(e.target.value) }
                                                    />
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
    AUTH: selectAuth
});

export default connect(mapStateToProps)(Account)
