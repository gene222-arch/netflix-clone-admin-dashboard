import React from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const DropdownIcon = ({ open }) => 
{
    return (
        <>
            {
                open 
                    ? <ExpandMoreIcon />
                    : <ExpandLessIcon />
            }
        </>
    )
}

export default DropdownIcon
