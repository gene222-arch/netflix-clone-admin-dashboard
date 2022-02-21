import React, { useState } from 'react'
import * as CONFIRM_ACTION from './../../redux/modules/confirm/actions'
/** Material UI Components */
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import deleteButtonUseStyles from './../../assets/js/material-ui/deleteButtonUseStyles';
import { createStructuredSelector } from 'reselect';
import { selectConfirm } from './../../redux/modules/confirm/selector';
import { useDispatch, connect } from 'react-redux';
import { Tooltip, Typography } from '@material-ui/core';


const DeleteButton = ({ actionName = null, color = 'default', variant = 'text', onClickEventCallback }) => 
{
    const dispatch = useDispatch();

    const classes = deleteButtonUseStyles(); 

    const handleClickConfirmation = () => {
        dispatch(CONFIRM_ACTION.showConfirmationDialog({
            mainHeader: 'Delete selected item',
            subHeader: 'Once deleted, recovery of data is not possible',
            confirmCallback: onClickEventCallback
        }));
    }

    return (
        <Tooltip title={ <Typography variant="subtitle1">Delete</Typography> }>
            <Button 
                variant={ variant } 
                color={ color } 
                className={ classes.deleteBtn }
                onClick={ handleClickConfirmation }
            > 
                { actionName ?? <DeleteIcon /> } 
            </Button>
        </Tooltip>
    )
}

const mapStateToProps = createStructuredSelector({
    CONFIRM: selectConfirm
});

export default connect(mapStateToProps)(DeleteButton)