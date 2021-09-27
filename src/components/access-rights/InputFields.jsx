import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { createStructuredSelector } from 'reselect';
import { selectAccessRightHasErrorMessages, selectAccessRightErrorMessages, selectAccessRight } from './../../redux/modules/access-rights/selector';
import { connect, useDispatch } from 'react-redux';
import { Checkbox, Card, CardContent, makeStyles, Grid, Typography, Divider, Avatar, CardHeader, IconButton, FormControlLabel, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as ACCESS_RIGHT_ACTION from './../../redux/modules/access-rights/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import BoxContentLoader from './../content-loader/BoxContentLoader';
import TextContentLoader from './../content-loader/TextContentLoader';
import { selectAuth } from './../../redux/modules/auth/selector';
import PermissionCheckBox from './PermissionCheckBox';
import inputFieldUseStyles from './../../assets/js/material-ui/accessRightInputFields';
import { useParams } from 'react-router';

const InputFields = ({ AUTH, ACCESS_RIGHT, ACCESS_RIGHT_HAS_ERROR, ACCESS_RIGHT_ERROR, isFetching = false, actionName, accessRight, setAccessRight, handleClickSave, handleClickCancel }) => 
{
    const classes = inputFieldUseStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleChange = (e) => 
    {
        const { name, value } = e.target;

        if (name === 'permission') 
        {
            const permissionId = parseInt(value);
            const isPermissionChecked = accessRight.permissions.find(id => id === permissionId);

            if (! isPermissionChecked) {
                setAccessRight({ ...accessRight, permissions: [ ...accessRight.permissions, permissionId ] });
            }
            else {
                setAccessRight({ ...accessRight, permissions: accessRight.permissions.filter(id => id !== permissionId) });
            }
        }
        else {
            setAccessRight({ ...accessRight, [name]: value });
        }
    }


    useEffect(() => {
        dispatch(ACCESS_RIGHT_ACTION.fetchAllPermissionsStart());
    }, []);

    return (
        <Container maxWidth="xl">
            <Card>
                <CardHeader
                    avatar={
                        <IconButton onClick={ handleClickCancel }>
                            <ArrowBackIcon />
                        </IconButton>
                    }
                    action={
                        <Button 
                            variant="contained" 
                            color='primary' 
                            onClick={ handleClickSave } 
                            disabled={ ACCESS_RIGHT.isLoading }
                            fullWidth
                        >
                            Save
                        </Button>
                    }
                    title={ <Typography variant="h5" color="initial">{ actionName }</Typography> }
                />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            {
                                isFetching 
                                    ? <BoxContentLoader width={ '100%' } height={ 50 } />
                                    : (
                                        <TextField
                                            id='role'
                                            name='role'
                                            label="Role Name"
                                            variant='filled'
                                            fullWidth
                                            error={ ACCESS_RIGHT_HAS_ERROR.role }
                                            helperText={ ACCESS_RIGHT_ERROR.role }
                                            value={ accessRight.role }
                                            onChange={ handleChange }
                                        />
                                    )
                            }
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Divider />
                            <Card>
                                <CardHeader title="Permissions" />
                                <CardContent className={ classes.cardContent }>
                                    <PermissionCheckBox 
                                        actionName={ actionName }
                                        permissions={ accessRight.permissions } 
                                        isFetching={ isFetching }
                                        handleChange={ handleChange }
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    ACCESS_RIGHT: selectAccessRight,
    ACCESS_RIGHT_HAS_ERROR: selectAccessRightHasErrorMessages,
    ACCESS_RIGHT_ERROR: selectAccessRightErrorMessages 
});

export default connect(mapStateToProps)(InputFields)
