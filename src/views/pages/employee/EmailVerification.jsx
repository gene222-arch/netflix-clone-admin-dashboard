import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import PATH from '../../../routes/path';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email';
import { useDispatch, connect } from 'react-redux';
import * as EMPLOYEE_ACTION from './../../../redux/modules/employee/actions'
import * as QueryParam from './../../../utils/queryParams'
import { createStructuredSelector } from 'reselect';
import { selectEmployee } from './../../../redux/modules/employee/selector';
import { ClipLoader } from 'react-spinners';
import Forbidden from './../errors/Forbidden';
import { ErrorRounded } from '@material-ui/icons';

const emailVerificationUseStyles = makeStyles(theme => ({
    container: {
        height: '90vh'
    },
    emailIcon: {
        fontSize: '10rem'
    }
}));


const LoadMessage = ({ isLoading = true, message }) => 
{
    if (typeof message !== 'object') 
    {
        if (message) return message;

        if (! message) 
        {
            return (
                !isLoading
                    ? 'Email verified successfully'
                    : 'Email not successfully verified'
            )
        }
    }

    return 'Verifying email address...';
}


const DisplayIcon = ({ isLoading = true, hasError }) => 
{
    const classes = emailVerificationUseStyles();

    if (hasError) return <ErrorRounded className={ classes.emailIcon } color='error' />
    
    return !isLoading 
        ? <EmailIcon className={ classes.emailIcon } />
        : <ClipLoader size={ 100 } color='#FFFFF' />
}

const EmailVerification = ({ EMPLOYEE }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = emailVerificationUseStyles();

    const [ hasCredentials, setHasCredentials ] = useState(true);

    const handleClickNavigateToLogin = () => history.push(PATH.LOGIN);

    const onLoadVerifyEmployeeEmail = () => 
    {
        const id = QueryParam.get('id');
        const hash = QueryParam.get('hash');

        if (id && hash) {
            dispatch(EMPLOYEE_ACTION.verifyEmployeeEmailStart({ id, hash }));
            setHasCredentials(true);
        }
        else {
            setHasCredentials(false);
        }
    }

    useEffect(() => 
    {
        onLoadVerifyEmployeeEmail();
        window.addEventListener('load', () => dispatch(EMPLOYEE_ACTION.clearEmployeeErrors()));

        return () => {
            setHasCredentials(true);
            dispatch(EMPLOYEE_ACTION.clearEmployeeErrors());
        }
    }, []);


    if (! hasCredentials) return <Forbidden />

    return (
        <Container maxWidth="md">
            <Grid 
                container 
                spacing={ 5 } 
                direction='column'
                justify='center' 
                alignItems='center' 
                className={ classes.container }
            >
                <Grid item>
                    <DisplayIcon isLoading={ EMPLOYEE.isLoading } hasError={ typeof EMPLOYEE.error !== 'object' } />
                </Grid>
                <Grid item>
                    <Typography variant="h4" color="initial" gutterBottom>
                        <LoadMessage isLoading={ EMPLOYEE.isLoading } message={ EMPLOYEE.error } />
                    </Typography>
                    <Button 
                        variant="outlined" 
                        color="default" 
                        fullWidth
                        onClick={ handleClickNavigateToLogin }
                        disabled={ EMPLOYEE.isLoading }
                    >
                        LOGIN TO YOUR ACCOUNT
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    EMPLOYEE: selectEmployee
});

export default connect(mapStateToProps)(EmailVerification)
