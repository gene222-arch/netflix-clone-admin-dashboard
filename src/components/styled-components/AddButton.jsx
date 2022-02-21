import React from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import addButtonUseStyles from './../../assets/js/material-ui/addButtonUseStyles';
import { Tooltip, Typography } from '@material-ui/core';


const AddButton = ({ actionName = null, onClickEventCallback }) => 
{
    const classes = addButtonUseStyles(); 

    return (
        <Tooltip title={ <Typography variant="subtitle1">Add new data</Typography> }>
            <Button 
                variant='outlined' 
                className={ classes.addBtn }
                onClick={ onClickEventCallback }
            > 
                { actionName ?? <AddIcon /> } 
            </Button>
        </Tooltip>
    )
}

export default AddButton