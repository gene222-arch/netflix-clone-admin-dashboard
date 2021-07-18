import React, { useState } from 'react'

/** Material UI Components */
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import deleteButtonUseStyles from './../../assets/js/material-ui/deleteButtonUseStyles';
import ConfirmationDialog from './../ConfirmationDialog';


const DeleteButton = ({ actionName = null, color = 'default', variant = 'text', onClickEventCallback }) => 
{
    const classes = deleteButtonUseStyles(); 
    const [ openConfirmationDialog, setOpenConfirmationDialog ] = useState(false);

    return (
        <>
            <ConfirmationDialog 
                mainText='Delete selected data?'
                subText='Confirming the action will permanently delete the data and recovery is not possible.'
                open={ openConfirmationDialog }
                setOpen={ setOpenConfirmationDialog }
                confirmCallback={ onClickEventCallback }
            />

            <Button 
                variant={ variant } 
                color={ color } 
                className={ classes.deleteBtn }
                onClick={ () => setOpenConfirmationDialog(true) }
            > 
                { actionName ?? <DeleteIcon /> } 
            </Button>
        </>
    )
}

export default DeleteButton