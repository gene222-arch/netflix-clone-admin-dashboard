import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectAuth } from '../redux/modules/auth/selector';
import { makeStyles, Typography } from '@material-ui/core';
import Colors from '../constants/Colors';
import { useHistory } from 'react-router';
import PATH from '../routes/path';
import CloseIcon from '@material-ui/icons/Close';


const confirmationDialogUseStyles = makeStyles(theme => ({
    confirmBtn: {
        backgroundColor: Colors.netflixRed,
        color: Colors.white,
        padding: '1rem',
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.netflixRed,
        }
    },
    confirmBtnContainer: {
        textAlign: 'center',
        padding: '1rem'
    },
    closeIcon: {
        textAlign: 'right',
        '&:hover': {
            cursor: 'pointer',
            color: Colors.error
        }
    },
    headerTitle: {
        color: Colors.error,
        textAlign: 'center'
    }
}));

const SubscriptionAlertMessage = ({ AUTH }) => 
{
    const classes = confirmationDialogUseStyles();
    const history = useHistory();

    const [ isOpen, setIsOpen ] = useState(false);

    const isNotSubscribed = [ 'expired', 'cancelled', 'pending' ].includes(AUTH.subscription_details.status);

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleClickRenewSubscription = () => 
    {
        setIsOpen(false);
        history.push(PATH.RENEW_SUBSCRIPTION);
    }

    useEffect(() => 
    {
        window.addEventListener('load', () => {
            setIsOpen(isNotSubscribed);
        });

        return () => {
            setIsOpen(false);
        }
    }, []);

    return (
        <div>
            <Dialog
                open={ isOpen }
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
                PaperProps={{
                    style: {
                        height: '35vh'
                    },
                }}
                maxWidth='md'
            >
                <DialogTitle>
                    <CloseIcon className={ classes.closeIcon } onClick={ handleClose } />
                </DialogTitle>
                <DialogTitle id='alert-dialog-title' className={ classes.headerTitle }>
                    <strong>Update your payment information to continue.</strong>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" color="initial" align='center'>
                        Please renew your subscription in order to continue the enjoyment you've experienced with us.
                    </Typography>
                </DialogContent>
                <div className={ classes.confirmBtnContainer }>
                    <Button 
                        onClick={ handleClickRenewSubscription } 
                        variant='outlined'
                        className={ classes.confirmBtn }
                        fullWidth
                    >
                        Update your payment
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(SubscriptionAlertMessage)