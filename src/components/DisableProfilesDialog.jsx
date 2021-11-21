import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectAuth } from './../redux/modules/auth/selector';
import * as AUTH_ACTION from './../redux/modules/auth/actions';
import { makeStyles, Grid, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import Colors from './../constants/Colors';


const confirmationDialogUseStyles = makeStyles(theme => ({
    avatar: {
        borderRadius: 5,
        '&:hover': {
            cursor: 'pointer',
            opacity: 0.7,
            border: `0.5px solid ${ Colors.white }`
        },
        height: 100,
        width: 100,
        display: 'block'
    },
    avatarContainer: {
    },
    confirmBtn: {
        backgroundColor: Colors.netflixRed,
        color: Colors.white,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.netflixRed,
        }
    },
    cancelBtn: {
        color: Colors.dark,
        '&:hover': {
            color: Colors.error
        }
    },
    descriptionText: {
        color: Colors.grey
    },
    checkBoxFormControl: {
        marginLeft: '1.25rem'
    },
    headerTitle: {
        color: Colors.warning
    }
}));

const DisableProfilesDialog = ({ AUTH }) => 
{

    const classes = confirmationDialogUseStyles();
    const dispatch = useDispatch();

    const [ profileCountToDisable, setProfileCountToDisable ] = useState(0);
    const [ selectedIds, setSelectedIds ] = useState([]);
    const [ show, setShow ] = useState(false);

    const handleClose = () => {
    }

    const handleClickConfirm = () => dispatch(AUTH_ACTION.disableProfilesStart({ profileIds: selectedIds }));

    const handleClickAvatar = (selectedId) => 
    {
        const isIdSelected = selectedIds.includes(selectedId);

        if (isIdSelected) {
            setSelectedIds(selectedIds.filter(id => id !== selectedId));
        }

        if (! isIdSelected && profileCountToDisable !== selectedIds.length) {
            setSelectedIds([ ...selectedIds, selectedId ]);
        }
    }

    const onLoadCheckProfileCount = () => 
    {
        let profileCountToDisable_ = 0;
        const currentProfileCount = AUTH.profiles.length;

        switch (AUTH.subscription_details.type) 
        {
            case 'Premium':
                profileCountToDisable_ = (5 - currentProfileCount);
                break;
        
            case 'Standard':
                profileCountToDisable_ = (4 - currentProfileCount);
                break;

            case 'Basic':
                profileCountToDisable_ = (2 - currentProfileCount);
                break;
        }

        if (profileCountToDisable_ === -1) 
        {
            const profileCountToDisable = Math.abs(profileCountToDisable_);

            dispatch(AUTH_ACTION.setProfileCountToDisable({ profileCount: profileCountToDisable }));
            setProfileCountToDisable(profileCountToDisable);
            setShow(true);
        }

        if (profileCountToDisable_ !== -1) 
        {
            dispatch(AUTH_ACTION.setProfileCountToDisable({ profileCount: 0 }));
            setProfileCountToDisable(0);
            setShow(false);
        }
    }

    useEffect(() => 
    {
        onLoadCheckProfileCount();

        return () => {
            setSelectedIds([]);
            setShow(false);
            setProfileCountToDisable(0);
        }
    }, []);

    return (
        <div>
            <Dialog
                open={ Boolean(show || AUTH.profileCountToDisable) }
                onClose={ handleClose }
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
                PaperProps={{
                    style: {
                        height: '50vh'
                    },
                }}
            >
                <DialogTitle id='alert-dialog-title' className={ classes.headerTitle }>
                    <strong>Profiles Exceeded Plan</strong>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText 
                        id='alert-dialog-description'
                        className={ classes.descriptionText }
                    >
                        You're profiles exceeded your plan type, please select at least { profileCountToDisable } of profiles to disable for you to continue your subscription.
                    </DialogContentText>
                <Grid container spacing={2} justify='center'>
                {
                    AUTH.profiles.map(({ id, name, avatar }, index) => 
                    (
                        <Grid item xs={ 4 } sm={ 4 } md={ 3 } lg={ 3 } key={ index } className={ classes.avatarContainer }>
                            <Grid container spacing={1} direction='column' alignItems='center'>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <img 
                                        src={ avatar }
                                        className={ classes.avatar }
                                        onClick={ () => handleClickAvatar(id) }
                                        style={{ 
                                            border: selectedIds.includes(id) ? `2px solid ${ Colors.info }` : ''
                                        }}
                                    />
                                    <Typography variant="subtitle2" color="textSecondary" align='center'>
                                        { name }
                                    </Typography>
                                </Grid>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={ Boolean(selectedIds.includes(id)) }
                                                disabled
                                            />
                                        }
                                        className={ classes.checkBoxFormControl }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }
                </Grid>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={ handleClickConfirm } 
                        variant='contained' 
                        autoFocus 
                        disabled={ AUTH.isLoading }
                        className={ classes.confirmBtn }
                    >
                        { ! AUTH.isLoading ? 'Save' : 'Processing...' }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(DisableProfilesDialog)