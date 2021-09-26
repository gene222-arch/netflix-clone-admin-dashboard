import { makeStyles, Tooltip } from '@material-ui/core'
import React from 'react'

const tootTipComponentUseStyles = makeStyles(theme => ({
}));

const ToolTipComponent = ({ withToolTip = false, title, component }) => 
{
    const classes = tootTipComponentUseStyles();

    if (! withToolTip) return component

    return (
        <Tooltip title={ title } placement='right-end'>
            { component }
        </Tooltip>
    )
}

export default ToolTipComponent
