import React from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import addButtonUseStyles from './../../assets/js/material-ui/addButtonUseStyles';


const AddButton = ({ actionName = null, onClickEventCallback }) => 
{
    const classes = addButtonUseStyles(); 

    return (
        <Button 
            variant='outlined' 
            className={ classes.addBtn }
            onClick={ onClickEventCallback }
        > 
            { actionName ?? <AddIcon /> } 
        </Button>
    )
}

export default AddButton