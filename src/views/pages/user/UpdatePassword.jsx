import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../../../redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import * as USER_ACTION from './../../../redux/modules/user/actions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { selectUser, selectUserErrorMessages, selectUserHasErrorMessages } from './../../../redux/modules/user/selector';
import PATH from './../../../routes/path';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const updatePasswordStyles = makeStyles(theme => ({
    avatar: {
        width: '4rem',
        borderRadius: 5,
        marginRight: '1rem'
    },
    container: {
        height: '88vh',
        marginTop: '2rem'
    }
}));

const PASSWORDS_PROPS = 
{
    current_password: '',
    password: '',
    password_confirmation: ''
};

const UpdatePassword = ({ USER, USER_HAS_ERROR_MESSAGE, USER_ERROR_MESSAGE }) => 
{
    const classes = updatePasswordStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ passwords, setPasswords ] = useState(PASSWORDS_PROPS);
    const [ showCurrentPassword, setShowCurrentPassword ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const handleChangePasswords = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handleClickUpdatePassword = () => dispatch(USER_ACTION.updateUserPasswordStart({ ...passwords, path: PATH.PROFILE_HOME_PAGE }));

    const handleClickCancel = () => history.goBack();

    const handleClickToggleCurrentPasswordVisibility = () => setShowCurrentPassword(! showCurrentPassword);

    const handleClickTogglePasswordVisibility = () => setShowPassword(! showPassword);

    const handleClickToggleConfirmPasswordVisibility = () => setShowConfirmPassword(! showConfirmPassword);

    const handleMouseDownPassword = (e) => e.preventDefault();

    useEffect(() => 
    {
        window.addEventListener('load', () => dispatch(USER_ACTION.clearUserErrors()));
        return () => {
            dispatch(USER_ACTION.clearUserErrors());
            setPasswords(PASSWORDS_PROPS);
            setShowPassword(false);
            setShowConfirmPassword(false);
            setShowCurrentPassword(false);
        }
    }, []);

    return (
        <Container maxWidth="md" className={ classes.container } >
            <Grid container spacing={ 5 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h4" color="initial" gutterBottom>
                        <strong>Change Password</strong>
                    </Typography>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <TextField
                        name='current_password'
                        label="Current Password"
                        variant='outlined'
                        type={ !showCurrentPassword ? 'password' : '' }
                        value={ passwords.current_password }
                        onChange={ handleChangePasswords }
                        fullWidth
                        error={ USER_HAS_ERROR_MESSAGE?.current_password }
                        helperText={ USER_ERROR_MESSAGE?.current_password }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ handleClickToggleCurrentPasswordVisibility }
                                        onMouseDown={ handleMouseDownPassword }
                                    >
                                    { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <TextField
                        name='password'
                        label="New password (8-60 characters)"
                        variant='outlined'
                        type={ !showPassword ? 'password' : '' }
                        value={ passwords.password }
                        onChange={ handleChangePasswords }
                        fullWidth
                        error={ USER_HAS_ERROR_MESSAGE?.password }
                        helperText={ USER_ERROR_MESSAGE?.password }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ handleClickTogglePasswordVisibility }
                                        onMouseDown={ handleMouseDownPassword }
                                    >
                                    { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <TextField
                        name='password_confirmation'
                        label="Confirm new password"
                        variant='outlined'
                        type={ !showConfirmPassword ? 'password' : '' }
                        value={ passwords.password_confirmation }
                        onChange={ handleChangePasswords }
                        fullWidth
                        error={ USER_HAS_ERROR_MESSAGE?.password_confirmation }
                        helperText={ USER_ERROR_MESSAGE?.password_confirmation }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ handleClickToggleConfirmPasswordVisibility }
                                        onMouseDown={ handleMouseDownPassword }
                                    >
                                    { showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="default"
                                disabled={ USER.isLoading }
                                onClick={ handleClickUpdatePassword }
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="default"
                                disabled={ USER.isLoading }
                                onClick={ handleClickCancel }
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    USER: selectUser,
    USER_HAS_ERROR_MESSAGE: selectUserHasErrorMessages,
    USER_ERROR_MESSAGE: selectUserErrorMessages
});

export default connect(mapStateToProps)(UpdatePassword)
