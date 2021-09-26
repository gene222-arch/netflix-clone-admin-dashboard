import { Chip } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core';
import Colors from './../constants/Colors';

const CRUDBadgeUseStyles = makeStyles(theme => ({
    success: {
        backgroundColor: theme.palette.success.main
    },
    info: {
        backgroundColor: theme.palette.info.main
    },
    warning: {
        backgroundColor: theme.palette.warning.main
    },
    error: {
        backgroundColor: theme.palette.error.main
    }
}));

const CRUD_ACTIONS = {
    CREATE: 'Create',
    READ: 'Read',
    UPDATE: 'Update',
    DELETE: 'Delete'
};

const CRUDBadge = ({ action }) => 
{
    const classes = CRUDBadgeUseStyles();

    switch (action) 
    {
        case CRUD_ACTIONS.CREATE:
        return <Chip label={ <strong>{ CRUD_ACTIONS.CREATE }</strong> } className={ classes.success }/>
        case CRUD_ACTIONS.READ:
        return <Chip label={ <strong>{ CRUD_ACTIONS.READ }</strong> } className={ classes.info }/>
        case CRUD_ACTIONS.UPDATE:
        return <Chip label={ <strong>{ CRUD_ACTIONS.UPDATE }</strong> } className={ classes.warning }/>
        case CRUD_ACTIONS.DELETE:
        return <Chip label={ <strong>{ CRUD_ACTIONS.DELETE }</strong> } className={ classes.error }/>
    }
}

export default CRUDBadge
