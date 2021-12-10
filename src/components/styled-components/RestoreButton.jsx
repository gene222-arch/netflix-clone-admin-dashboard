import React from 'react'
import * as CONFIRM_ACTION from './../../redux/modules/confirm/actions'
/** Material UI Components */
import Button from '@material-ui/core/Button'
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import restoreButtonUseStyles from './../../assets/js/material-ui/restoreButtonUseStyles';
import { createStructuredSelector } from 'reselect';
import { selectConfirm } from './../../redux/modules/confirm/selector';
import { useDispatch, connect } from 'react-redux';


const RestoreButton = ({ actionName = null, color = 'default', variant = 'text', hasItemsSelected = false, restoreButtonCallback }) => 
{
    const dispatch = useDispatch();

    const classes = restoreButtonUseStyles(); 

    const handleClickConfirmation = () => {
        dispatch(CONFIRM_ACTION.showConfirmationDialog({
            mainHeader: 'Restore selected item',
            subHeader: '',
            confirmCallback: restoreButtonCallback
        }));
    }

    return (
        <Button 
            variant={ variant } 
            color={ color } 
            className={ classes.restoreBtn }
            onClick={ handleClickConfirmation }
        > 
            { actionName ?? <RestoreFromTrashIcon color={ hasItemsSelected ? 'action' : 'disabled' } /> } 
        </Button>
    )
}

const mapStateToProps = createStructuredSelector({
    CONFIRM: selectConfirm
});

export default connect(mapStateToProps)(RestoreButton)