import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import InputCode from './InputCode'
import UpdateEmail from './UpdateEmail';
import { selectUser } from './../../../../redux/modules/user/selector';
import * as USER_ACTION from './../../../../redux/modules/user/actions';

const securityCheckUseStyles = makeStyles(theme => ({
    container: {
        marginTop: '2rem',
        height: '86.2vh'
    },
    enterCodeBtn: {
        padding: '1rem 2rem',
        marginTop: '2rem'
    },
    gridContainer: {
        width: '100%'
    }
}));

const CODE_PROPS = 
{
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: ''
};

const SecurityCheck = ({ AUTH, USER }) => 
{
    const classes = securityCheckUseStyles();
    const dispatch = useDispatch();

    const [ code, setCode ] = useState(CODE_PROPS);
    const [ isCodeVerified, setIsCodeVerified ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleChange = (e, elementName) => 
    {
        const { value, name } = e.target;
        setCode({ ...code, [name]: value });

        if (elementName && value) 
        {
            const nextfield = document.querySelector(`input[name=${ elementName }]`);

            nextfield.focus();
        }
    }

    const handleChangeBackSpace = (e, elementName) => 
    {
        const { name } = e.target;

        if (e.keyCode === 8) {
            setCode({
                ...code,
                [name]: ''
            });
            
            if (elementName) {
                const nextfield = document.querySelector(`input[name=${ elementName }]`);

                nextfield.focus();
            }
        }
    }

    const handleClickVerifyCode = () => {
        if (USER.change_email_verification_code === parseInt(Object.values(code).join(''))) {
            setIsCodeVerified(true);
            setErrorMessage('');
        } else {
            setErrorMessage("That wasn’t quite right. Try again or request a new code");
        }
    }

    useEffect(() => 
    {
        dispatch(USER_ACTION.sendChangeEmailVerificationCodeStart());
        return () => {
            setCode(CODE_PROPS);
            setIsCodeVerified(false);
            setErrorMessage('');
        }
    }, []);

    return (
        <Container maxWidth="sm" className={ classes.container }>
        {
            !isCodeVerified
                ? (
                    <Grid container spacing={1} alignItems='center' justify='center'>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Typography variant="caption" color="error" align='center'>
                                <strong>SECURITY CHECK</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Typography variant="h4" color="default" align='center' gutterBottom>
                                <strong>Check your email for a code</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Typography variant="subtitle1" color="textSecondary" align='center' gutterBottom>
                                Please enter the code we sent to <strong>{ AUTH.user.email }</strong> to help us protect your account.
                            </Typography>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <InputCode
                                hasError={ Boolean(errorMessage.length) }
                                code={ code }
                                handleChange={ handleChange }
                                handleChangeBackSpace={ handleChangeBackSpace }
                            />
                        </Grid>
                        {
                            !isCodeVerified && (
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <Typography variant="subtitle2" color="error">
                                        { errorMessage }
                                    </Typography>
                                </Grid>
                            )
                        }
                        <Grid item xs={ 12 } sm={ 10 } md={ 10 } lg={ 10 }>
                            <Button 
                                variant="contained" 
                                color="default" 
                                className={ classes.enterCodeBtn }
                                fullWidth
                                disabled={ Object.values(code).filter(num => Boolean(num)).length !== 6 }
                                onClick={ handleClickVerifyCode }
                            >
                                { USER.isLoading ? 'Sending email...' : 'Enter Code to Continue' }
                            </Button>
                        </Grid>
                    </Grid>
                )
                : <UpdateEmail />
        }
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    USER: selectUser
});

export default connect(mapStateToProps)(SecurityCheck)
