import React from 'react'
import AddButton from './styled-components/AddButton';
import DeleteButton from './styled-components/DeleteButton';

const MaterialTableActionButton = ({ ids, addButtonCallback, deleteButtonCallback }) => 
{
    if (!ids.length) {
        return <AddButton onClickEventCallback={ addButtonCallback } />
    }

    return <DeleteButton onClickEventCallback={ deleteButtonCallback } />
}

export default MaterialTableActionButton
