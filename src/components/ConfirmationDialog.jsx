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


const ConfirmationDialog = ({ CONFIRM, AUTH }) => 
{
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
            >
                <DialogTitle id='alert-dialog-title'>{ CONFIRM.mainHeader }</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>{ CONFIRM.subHeader }</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose } disabled={ AUTH.isLoading }>{ CONFIRM.cancelText }</Button>
                    <Button onClick={ handleClickConfirm } autoFocus disabled={ AUTH.isLoading }>
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