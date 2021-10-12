import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { Card, CardContent, Grid, TextField, CardHeader, Typography, Divider, Button, makeStyles } from '@material-ui/core'
import { createStructuredSelector } from 'reselect';
import { selectEmployee, selectEmployeeErrorMessages, selectEmployeeHasErrorMessages } from './../../redux/modules/employee/selector';
import { connect, useDispatch } from 'react-redux';
import CardBackButton from './../CardBackButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import { AccountCircleRounded, PhoneAndroidRounded } from '@material-ui/icons';
import StyledReactSelect from './../../components/styled-components/StyledReactSelect';
import * as ACCESS_RIGHT_ACTIONS from './../../redux/modules/access-rights/actions'
import * as EMPLOYEE_ACTION from './../../redux/modules/employee/actions'
import { selectAccessRight } from './../../redux/modules/access-rights/selector';
import ImageWithPreview from './../ImageWithPreview';
import * as EMPLOYEE_API from './../../services/employee'

const DEFAULT_PIN_CODE_PROPS = {
    num1: '',
    num2: '',
    num3: '',
    num4: ''
};


const inputFieldUseStyles = makeStyles(theme => ({
    avatarIcon: {
        height: '40vh',
        width: '100%'
    },
    avatarImg: {
        height: '40vh',
        width: '20vh'
    }
}));


const InputField = ({ ACCESS_RIGHT, EMPLOYEE, EMPLOYEE_HAS_ERROR, EMPLOYEE_ERROR, employee, setEmployee, pin, setPin, onClickSave }) => 
{
    const classes = inputFieldUseStyles();
    const dispatch = useDispatch();

    const [ isUploading, setIsUploading ] = useState(false);
    const [ hasError, setHasError ] = useState(false);
    const [ avatarPreview, setAvatarPreview ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState('');


    const handleChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });

    const handleChangePin = (e, nextFieldName) => 
    {
        const { name, value } = e.target;
        setPin({ ...pin, [name]: value });

        if (value) {
            let nextfield = document.querySelector(`input[name=${ nextFieldName }]`);
            nextfield.focus();
        }
    }

    const handleOnKeyPressDown = (e) => 
    {
        if (e.keyCode === 8) 
        {
            setPin(DEFAULT_PIN_CODE_PROPS);

            let nextfield = document.querySelector(`input[name=num1]`);
            nextfield.focus();
        }
    }

    const handleChangeAvatar = async (e) => 
    {
        setIsUploading(true);

        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await EMPLOYEE_API.uploadAvatarAsync({ avatar: file });
            
            if (status === 'success') 
            {
                setEmployee({ ...employee, avatar_path: data });

                reader.onload = (e) =>  setAvatarPreview(e.target.result);
        
                reader.readAsDataURL(file);
                
                setHasError(false);
                setErrorMessage('');
            }

        } catch ({ message }) {
            setHasError(true);
            setErrorMessage(message.avatar);
        }

        setIsUploading(false);
        e.target.value = null;
    }

    useEffect(() => 
    {
        dispatch(ACCESS_RIGHT_ACTIONS.fetchAllAccessRightsStart());
        window.addEventListener('load', () => dispatch(EMPLOYEE_ACTION.clearEmployeeErrors()));

        return () => {
            dispatch(EMPLOYEE_ACTION.clearEmployeeErrors());
            setIsUploading(false);
            setHasError(false);
            setAvatarPreview(null);
            setErrorMessage('');
        }
    }, []);

    return (
        <Container maxWidth="md">
            <Grid container spacing={1}>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                {
                                    (!avatarPreview && !employee.avatar_path) && (
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <AccountCircleRounded className={ classes.avatarIcon } />
                                        </Grid>
                                    )
                                }
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <ImageWithPreview 
                                        name='Avatar'
                                        inputID='avatar'
                                        inputName='avatar'
                                        apiSource={ employee.avatar_path }
                                        filePreview={ avatarPreview }
                                        imgClass={ classes.avatarImg }
                                        handleChangeFile={ handleChangeAvatar }
                                        error={ hasError || EMPLOYEE_HAS_ERROR.avatar_path }
                                        helperText={ errorMessage || EMPLOYEE_ERROR.avatar_path }
                                        isUploading={ isUploading }
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Card>
                        <CardHeader
                            title={
                                <CardBackButton 
                                    actionName={ 
                                        <Button 
                                            variant="contained" 
                                            color="default" 
                                            onClick={ onClickSave }
                                            disabled={ EMPLOYEE.isLoading }
                                        >
                                            Save
                                        </Button>
                                    } 
                                    title='Employees' 
                                />
                            }
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={ 3 } justify='space-between'>
                                <Grid item xs={ 12 } sm={ 5 } md={ 5 } lg={ 5 }>
                                    <TextField
                                        variant="outlined"
                                        name="first_name"
                                        label="First Name"
                                        value={ employee.first_name }
                                        onChange={ handleChange }
                                        error={ EMPLOYEE_HAS_ERROR.first_name }
                                        helperText={ EMPLOYEE_ERROR.first_name }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={ 12 } sm={ 5 } md={ 5 } lg={ 5 }>
                                    <TextField
                                        variant="outlined"
                                        name="last_name"
                                        label="Last Name"
                                        value={ employee.last_name }
                                        onChange={ handleChange }
                                        error={ EMPLOYEE_HAS_ERROR.last_name }
                                        helperText={ EMPLOYEE_ERROR.last_name }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <TextField
                                        variant="outlined"
                                        name="email"
                                        label="Email Address"
                                        value={ employee.email }
                                        onChange={ handleChange }
                                        error={ EMPLOYEE_HAS_ERROR.email }
                                        helperText={ EMPLOYEE_ERROR.email }
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <EmailIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <TextField
                                        variant="outlined"
                                        name="phone"
                                        label="Phone"
                                        value={ employee.phone }
                                        onChange={ handleChange }
                                        error={ EMPLOYEE_HAS_ERROR.phone }
                                        helperText={ EMPLOYEE_ERROR.phone }
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <PhoneAndroidRounded />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>Select Role</Typography>
                                    <StyledReactSelect 
                                        data={ ACCESS_RIGHT.accessRights.map(({ id, name }) => id !== 1 && ({ value: id, label: name })) }
                                        value={ employee.role }
                                        placeholder='Role'
                                        onChange={ role => setEmployee({ ...employee, role }) }
                                        error={ EMPLOYEE_HAS_ERROR.role_id }
                                        helperText={ EMPLOYEE_ERROR.role_id }
                                        label={ 'Select Role' }
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Card>
                    <CardHeader 
                        title={ 
                            <>
                                <Typography variant="h5" color="initial">
                                    Employee PIN Code
                                </Typography>
                                {
                                    EMPLOYEE_HAS_ERROR.pin_code && (
                                        <Typography variant="subtitle2" color="error">
                                            { EMPLOYEE_ERROR.pin_code }
                                        </Typography>
                                    )
                                }
                            </>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={1} justify='center'>
                            <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                <TextField
                                    name='num1'
                                    variant='outlined'
                                    inputProps={{ 
                                        min: 1, 
                                        style: { textAlign: 'center' },
                                        maxLength: 1
                                    }}
                                    type='password'
                                    value={ pin.num1 }
                                    onChange={ e => handleChangePin(e, 'num2') }
                                    onKeyDown={ handleOnKeyPressDown }
                                    focused
                                    error={ EMPLOYEE_HAS_ERROR.pin_code }
                                />
                            </Grid>
                            <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                <TextField
                                    name='num2'
                                    variant='outlined'
                                    inputProps={{ 
                                        min: 1, 
                                        style: { textAlign: 'center' },
                                        maxLength: 1
                                    }}
                                    type='password'
                                    value={ pin.num2 }
                                    onChange={ e => handleChangePin(e, 'num3') }
                                    onKeyDown={ handleOnKeyPressDown }
                                    error={ EMPLOYEE_HAS_ERROR.pin_code }
                                />
                            </Grid>
                            <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                <TextField
                                    name='num3'
                                    variant='outlined'
                                    inputProps={{ 
                                        min: 1, 
                                        style: { textAlign: 'center' },
                                        maxLength: 1
                                    }}
                                    type='password'
                                    value={ pin.num3 }
                                    onChange={ e => handleChangePin(e, 'num4') }
                                    onKeyDown={ handleOnKeyPressDown }
                                    error={ EMPLOYEE_HAS_ERROR.pin_code }
                                />
                            </Grid>
                            <Grid item xs={ 2 } sm={ 1 } md={ 1 } lg={ 1 }>
                                <TextField
                                    name='num4'
                                    variant='outlined'
                                    inputProps={{ 
                                        min: 1, 
                                        style: { textAlign: 'center' },
                                        maxLength: 1
                                    }}
                                    type='password'
                                    value={ pin.num4 }
                                    onKeyDown={ handleOnKeyPressDown }
                                    onChange={ e => handleChangePin(e, 'num1') }
                                    error={ EMPLOYEE_HAS_ERROR.pin_code }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    ACCESS_RIGHT: selectAccessRight,
    EMPLOYEE: selectEmployee,
    EMPLOYEE_HAS_ERROR: selectEmployeeHasErrorMessages,
    EMPLOYEE_ERROR: selectEmployeeErrorMessages
});

export default connect(mapStateToProps)(InputField)
