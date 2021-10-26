import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { selectUser } from './../../../../redux/modules/user/selector';
import * as USER_ACTION from './../../../../redux/modules/user/actions';
import { connect, useDispatch } from 'react-redux';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PATH from './../../../../routes/path';


const updateEmailUseStyles = makeStyles(theme => ({
    btn: {
        padding: '1rem 2rem',
        marginTop: '2rem'
    },
    container: {
        height: '70vh'
    },
    mailIcon: {
        textAlign: 'center',
        fontSize: '3rem',
        width: '100%',
        color: theme.palette.text.disabled
    }
}));


const UpdateEmail = ({ USER }) => 
{
    const classes = updateEmailUseStyles();
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState('');

    const handleClickUpdateEmail = () => dispatch(USER_ACTION.updateUserEmailStart({ email, path: PATH.PROFILE_HOME_PAGE }));

    useEffect(() => {
        return () => {
            setEmail('');
        }
    }, []);

    return (
        <Grid container spacing={1} justify='center' alignItems='center' className={ classes.container }>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <MailOutlineIcon className={ classes.mailIcon } />
                <Typography variant="h4" color="default" align='center' gutterBottom>
                    <strong>Update Email Address</strong>
                </Typography>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <TextField
                    label="Email address"
                    variant="filled"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    fullWidth
                    helperText={ 'Choose your email wisely.' }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Button 
                    variant="contained" 
                    color="default" 
                    className={ classes.btn }
                    fullWidth
                    disabled={ USER.isLoading }
                    onClick={ handleClickUpdateEmail }
                >
                    Change Email
                </Button>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    USER: selectUser
});

export default connect(mapStateToProps)(UpdateEmail)
