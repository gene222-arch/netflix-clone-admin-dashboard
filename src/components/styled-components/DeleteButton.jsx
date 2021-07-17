import React from 'react'

/** Material UI Components */
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import deleteButtonUseStyles from './../../assets/js/material-ui/deleteButtonUseStyles';

const DeleteButton = ({ actionName = null, color = 'default', variant = 'text', onClickEventCallback }) => 
{
    const classes = deleteButtonUseStyles(); 

    return (
        <Button 
            variant={ variant } 
            color={ color } 
            className={ classes.deleteBtn }
            onClick={ onClickEventCallback }
        > 
            { actionName ?? <DeleteIcon /> } 
        </Button>
    )
}

export default DeleteButton