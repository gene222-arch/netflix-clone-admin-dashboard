import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const customerAlertUseStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}));


const CustomAlert = ({ status, message }) => 
{
    const classes = customerAlertUseStyles();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        return () => {
            setOpen(false);
        }
    }, []);

    return (
        <Collapse in={ open } className={ classes.root }>
            <Alert 
                severity={ status } 
                onClose={() => setOpen(false)}
            >{ message ?? ''}</Alert>
        </Collapse>
    )
}

export default CustomAlert;