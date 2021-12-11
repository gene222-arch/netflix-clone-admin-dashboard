import React from 'react'
import AddButton from './styled-components/AddButton';
import DeleteButton from './styled-components/DeleteButton';
import RestoreButton from './styled-components/RestoreButton';

const MaterialTableActionButton = ({ ids = [], areDataTrashed = false, addButtonCallback, deleteButtonCallback, restoreButtonCallback }) => 
{
    if (areDataTrashed) {
        return (
            <RestoreButton
                variant='outlined' 
                hasItemsSelected={ Boolean(ids.length) }
                restoreButtonCallback={ restoreButtonCallback } 
            />
        )
    }

    if (! ids.length) return <AddButton onClickEventCallback={ addButtonCallback } />

    return <DeleteButton variant='outlined' onClickEventCallback={ deleteButtonCallback } />
}

export default MaterialTableActionButton
