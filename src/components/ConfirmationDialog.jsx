import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStructuredSelector } from 'reselect';
import { selectConfirm } from './../redux/modules/confirm/selector';
import * as CONFIRM_ACTION from './../redux/modules/confirm/actions';
import { connect, useDispatch } from 'react-redux';
import { selectAuth } from './../redux/modules/auth/selector';
import { makeStyles } from '@material-ui/core';
import Colors from './../constants/Colors';


const confirmationDialogUseStyles = makeStyles(theme => ({
    confirmBtn: {
        backgroundColor: Colors.success,
        color: Colors.white,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.success,
        }
    },
    cancelBtn: {
        color: Colors.dark,
        '&:hover': {
            color: Colors.error
        }
    },
    dialogContent: {
        backgroundColor: Colors.white
    },
    descriptionText: {
        color: Colors.dark
    }
}));

const ConfirmationDialog = ({ CONFIRM, AUTH }) => 
{
    const classes = confirmationDialogUseStyles();
    const dispatch = useDispatch();

    const handleClose = () => {
        CONFIRM.cancelCallback();
        dispatch(CONFIRM_ACTION.hideConfirmationDialog());
    }

    const handleClickConfirm = () => {
        CONFIRM.confirmCallback();
        dispatch(CONFIRM_ACTION.hideConfirmationDialog());
    }

    return (
        <div>
            <Dialog
                open={ CONFIRM.isOpen }
                onClose={ handleClose }
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
                PaperProps={{
                    style: {
                      backgroundColor: Colors.white,
                      color: Colors.dark,
                      height: '30vh'
                    },
                }}
            >
                <DialogTitle id='alert-dialog-title'>
                    <strong>{ CONFIRM.mainHeader }</strong>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText 
                        id='alert-dialog-description'
                        className={ classes.descriptionText }
                    >
                        { CONFIRM.subHeader }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={ handleClose } 
                        disabled={ AUTH.isLoading }
                        className={ classes.cancelBtn }
                    >
                        { CONFIRM.cancelText }
                    </Button>
                    <Button 
                        onClick={ handleClickConfirm } 
                        variant='contained' 
                        autoFocus 
                        disabled={ AUTH.isLoading }
                        className={ classes.confirmBtn }
                    >
                        { !AUTH.isLoading ? CONFIRM.confirmText : 'Processing...' }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    CONFIRM: selectConfirm
});

export default connect(mapStateToProps)(ConfirmationDialog)