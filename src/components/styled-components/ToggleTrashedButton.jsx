import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { FormControlLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const toggleTrashedButtonUseStyles = makeStyles(theme => ({
    toggleTrashedContainer: {
        textAlign: 'right',
        padding: '1rem'
    }
}));


const ToggleTrashedButton = ({ title = 'Show deleted items', onClick }) => 
{
    const classes = toggleTrashedButtonUseStyles();

    const [ trashedOnly, setTrashedOnly ] = useState(false);

    useEffect(() => {
        return () => {
            setTrashedOnly(false);
        }
    }, []);

    return (
        <div className={ classes.toggleTrashedContainer }>
            <Tooltip title={ title }>
                <FormControlLabel 
                    control={
                        <Switch 
                            checked={ trashedOnly }
                            onChange={ () => onClick(trashedOnly) }
                        />
                    } 
                    label={ 
                        <DeleteIcon 
                            color={ `${ trashedOnly ? 'error' : 'disabled' }` }
                        /> 
                    } 
                />
            </Tooltip>
        </div>
    )
}

export default ToggleTrashedButton
