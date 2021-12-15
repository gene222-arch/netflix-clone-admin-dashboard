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
import { Add, ChildCareRounded, Block } from '@material-ui/icons';
import { useHistory } from 'react-router';
import PATH from './../../../routes/path';
import Tooltip from '@material-ui/core/Tooltip';
import PageLoader from './../../../components/PageLoader';
import { Button } from '@material-ui/core'
import Colors from './../../../constants/Colors';

const userProfileUseStyles = makeStyles(theme => ({
    addIcon: {
        fontSize: '6rem'
    },
    addCardContainer: {
        '&:hover': {
            opacity: 0.7,
            cursor: 'pointer'
        }
    },
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
        height: '84.3vh'
    },
    headerTitle: {
        marginBottom: '1rem',
        width: '100%'
    },
    renewSubscriptionBtn: {
        color: Colors.white,
        backgroundColor: Colors.netflixRed,
        padding: '1rem 0',
        width: '100%',
        '&:hover': {
            color: Colors.netflixRed,
            backgroundColor: Colors.white,
        }
    },
    renewSubscriptionContainer: {
        textAlign: 'center'
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

const AddProfileCard = ({ isSubscribed, planType, totalProfiles }) => 
{
    const classes = userProfileUseStyles();
    const history = useHistory();

    if (planType === 'Premium' && totalProfiles === 5) return;

    if (planType === 'Standard' && totalProfiles === 4) return;

    if (planType === 'Basic' && totalProfiles === 2) return;

    return (
        <Grid 
            item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 } 
            className={ classes.addCardContainer } 
            onClick={ () => isSubscribed && history.push(PATH.MANAGE_PROFILE) }
        >
            <Grid container spacing={ 1 } direction='column' justify='center'>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Add className={ classes.addIcon } style={{
                        color: isSubscribed ? Colors.white : Colors.grey,
                        cursor: 'context-menu'
                    }} />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="subtitle1" color="textSecondary" align='center'>
                        Add Profile
                    </Typography>
                </Grid>
            </Grid>     
        </Grid>
    )
}

const UserProfile = ({ AUTH }) => 
{
    const classes = userProfileUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const isNotSubscribed = [ 'expired', 'cancelled', 'pending' ].includes(AUTH.subscription_details.status);

    const [ id, setId ] = useState('');
    const [ pin, setPin ] = useState(PIN_PROPS);
    const [ isIncorrectPin, setIsIncorrectPin ] = useState(false);
    const [ selectedProfilePin, setSelectedProfilePin ] = useState('');
    const [ showInputPin, setShowInputPin ] = useState(false);
    const [ profileLimit, setProfileLimit ] = useState(2);

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

        if (pinValue === selectedProfilePin) {
            dispatch(AUTH_ACTION.selectProfileStart(id));
            cleanUp();
        }
        else {
            setIsIncorrectPin(true);
            setPin(PIN_PROPS);
    
            let nextfield = document.querySelector(`input[name=num1]`);
            nextfield.focus();  
        }
    }

    const handleClickSelectNonPin = (profileId) => {
        if (! AUTH.profileCountToDisable) {
            dispatch(AUTH_ACTION.selectProfileStart(profileId));
        }
    }

    const handleClickToggleModal = (pin, profileId) => 
    {
        if (! AUTH.profileCountToDisable) {
            setShowInputPin(! showInputPin);
            setSelectedProfilePin(!selectedProfilePin ? pin : '');
            setId(!id ? profileId : '');
        }
    }

    const handleClickAvatar = (isProfileLocked, pinCode, enabled, profileId) => 
    {
        if (! enabled) {
            history.push(PATH.UPDATE_SUBSCRIPTION)
        }

        if (enabled) {
            isProfileLocked 
                ? handleClickToggleModal(pinCode, profileId) 
                : handleClickSelectNonPin(profileId)   
        }
    }

    const onLoadSetProfileLimit = () => 
    {
        const planType = AUTH.subscription_details.type;

        switch (planType) 
        {
            case 'Premium':
                setProfileLimit(5);
                break;

            case 'Standard':
                setProfileLimit(4);
                break;

            case 'Basic':
                setProfileLimit(2);
                break;
        }
    }

    useEffect(() => 
    {
        onLoadSetProfileLimit();
        return () => {
            cleanUp();
        }
    }, []);

    if (AUTH.isLoading) return <PageLoader />

    return (
        <Container maxWidth="md" className={ classes.container }>
            <InputPinDialog
                id={ id }
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
                    <Typography variant="h3" color="initial" align='center' className={ classes.headerTitle }>Who's Watching?</Typography>
                    <Grid container spacing={3} justify='center' className={ classes.avatarContainer }>
                        {
                            AUTH.profiles.map(({ id, name, avatar, is_profile_locked, pin_code, is_for_kids, enabled }, index) => (
                                <Grid key={ index } item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 } className={ classes.avatarGridContainer }>
                                    <Grid container spacing={ 1 } direction='column' justify='center'>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <Tooltip 
                                                title={ 
                                                    !enabled
                                                        ? 'Update plan to enable disabled profiles' 
                                                        : '' 
                                                    }
                                            >
                                                <img 
                                                    src={ avatar } 
                                                    className={ classes.avatarImg } 
                                                    style={{ 
                                                        opacity: !enabled ? 0.5 : 1
                                                    }} 
                                                    onClick={ 
                                                        () => handleClickAvatar(is_profile_locked, pin_code, enabled, id)
                                                    } 
                                                />
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            <Typography variant="subtitle1" color="textSecondary" align='center'>
                                                { name.toUpperCase() }
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                { !is_for_kids ? <strong>All Maturity Ratings</strong> : <ChildCareRounded /> }
                                            </Typography>
                                        </Grid> 
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            { Boolean(is_profile_locked) && <LockIcon color='disabled' /> }
                                        </Grid>
                                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                            { Boolean(! enabled) && <Block color='error' /> }
                                        </Grid>
                                    </Grid>     
                                </Grid>
                            ))
                        }
                        {
                            (profileLimit > AUTH.profiles.length) && !AUTH.profileCountToDisable && (
                                <AddProfileCard 
                                    isSubscribed={ !isNotSubscribed }
                                    planType={ AUTH.subscription_details.type }
                                    totalProfiles={ AUTH.profiles.length }
                                />
                            )
                        }
                    </Grid>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    {
                        isNotSubscribed && (
                            <div className={ classes.renewSubscriptionContainer }>
                                <Button 
                                    variant="contained" 
                                    color="default" 
                                    className={ classes.renewSubscriptionBtn }
                                    onClick={ () => history.push(PATH.RENEW_SUBSCRIPTION) }
                                >
                                    Renew Subscription
                                </Button>
                            </div>
                        )
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(UserProfile)
