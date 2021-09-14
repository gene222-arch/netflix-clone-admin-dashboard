import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from '../../../redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import InputPinDialog from './InputPinDialog';
import * as AUTH_ACTION from '../../../redux/modules/auth/actions';


const userProfileUseStyles = makeStyles(theme => ({
    avatarContainer: {
        textAlign: 'center'
    },
    avatarGridContainer: {
        marginRight: '1.5rem',
    },
    avatarImg: {
        height: '10vw',
        width: '10vw',
        maxHeight: 200,
        maxWidth: 200,
        minHeight: 84,
        minWidth: 84,
        borderRadius: 5,
        '&:hover': {
            cursor: 'pointer',
        }
    },
    container: {
        height: '90.2vh'
    },
    headerTitle: {
        marginBottom: '1rem',
        width: '100%'
    },
    subContainer: {
        height: '70vh'
    },
}));

const PIN_PROPS = {
    num1: '',
    num2: '',
    num3: '',
    num4: ''
}

const UserProfile = ({ AUTH }) => 
{
    const classes = userProfileUseStyles();
    const dispatch = useDispatch();

    const [ id, setId ] = useState('');
    const [ pin, setPin ] = useState(PIN_PROPS);
    const [ isIncorrectPin, setIsIncorrectPin ] = useState(false);
    const [ selectedProfilePin, setSelectedProfilePin ] = useState('');
    const [ showInputPin, setShowInputPin ] = useState(false);


    const cleanUp = () => {
        setShowInputPin(false);
        setPin(PIN_PROPS);
        setSelectedProfilePin('');
        setId('');
        setIsIncorrectPin(false);
    }

    const handleClickSelect = () => 
    {
        const pinValue = Object.values(pin).join('');

        if (pinValue === selectedProfilePin) 
        {
            dispatch(AUTH_ACTION.selectProfileStart(id));
            cleanUp();
        }

        setIsIncorrectPin(true);
        setPin(PIN_PROPS);

        let nextfield = document.querySelector(`input[name=num1]`);
        nextfield.focus();
    }

    const handleClickSelectNonPin = (profileId) => dispatch(AUTH_ACTION.selectProfileStart(profileId));

    const handleClickToggleModal = (pin) => {
        setShowInputPin(! showInputPin);
        setSelectedProfilePin(!selectedProfilePin ? pin : '');
    }

    useEffect(() => 
    {
        return () => {
            cleanUp();
        }
    }, []);

    return (
        <Container maxWidth="md" className={ classes.container }>
            <InputPinDialog
                isIncorrectPin={ isIncorrectPin }
                open={ showInputPin }
                pin={ pin }
                setPin={ setPin }
                handleClickToggleModal={ handleClickToggleModal } 
                handleClickCancel={ cleanUp }
                handleClickSave={ handleClickSelect }
            />
            <Grid container justify='center' alignItems='center' className={ classes.subContainer }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h2" color="initial" align='center' className={ classes.headerTitle }>Profiles</Typography>
                    <Grid container spacing={3} justify='center' className={ classes.avatarContainer }>
                        {
                            AUTH.profiles.map(({ id, name, avatar, is_profile_locked, pin_code }, index) => (
                                <Grid key={ index } item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 } className={ classes.avatarGridContainer }>
                                    <Grid container spacing={ 1 } direction='column' justify='center'>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <img 
                                                src={ avatar } 
                                                className={ classes.avatarImg } 
                                                onClick={ 
                                                    () => is_profile_locked 
                                                            ? handleClickToggleModal(pin_code) 
                                                            : handleClickSelectNonPin(id) 
                                                    } 
                                            />
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                { name.toUpperCase() }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            { Boolean(is_profile_locked) && <LockIcon color='disabled' /> }
                                        </Grid>
                                    </Grid>     
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(UserProfile)