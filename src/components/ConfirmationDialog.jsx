import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = ({ 
    confirmText = 'Confirm', 
    cancelText = 'Cancel', 
    mainText = 'Continue Action?', 
    subText = '', 
    open = false, 
    setOpen, 
    confirmCallback }) => 
{
    const handleClose = () => setOpen(false);

    const handleClickConfirm = () => {
        confirmCallback();
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={ open }
                onClose={ handleClose }
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
            >
                <DialogTitle id='alert-dialog-title'>{ mainText }</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>{ subText }</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose }>{ cancelText }</Button>
                    <Button onClick={ handleClickConfirm } autoFocus>{ confirmText }</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmationDialog