import React from 'react'
import { createStructuredSelector } from 'reselect';
import { selectAccessRight } from './../../redux/modules/access-rights/selector';
import { connect } from 'react-redux';
import { Checkbox, CircularProgress, FormControlLabel, Grid, Typography } from '@material-ui/core';
import inputFieldUseStyles from './../../assets/js/material-ui/accessRightInputFields';
import { selectAuth } from './../../redux/modules/auth/selector';
import { useParams } from 'react-router';

const PermissionCheckBox = ({ AUTH, ACCESS_RIGHT, permissions, handleChange, isFetching, actionName }) => 
{
    const classes = inputFieldUseStyles();
    const { id: accessRightId } = useParams();

    return (
        ACCESS_RIGHT.permissions.map(({ id, name, description }, index) => (
            <Grid key={ index } container spacing={1} alignItems='center'>
                <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
                    <FormControlLabel
                        className={ classes.checkBoxContainer }
                        control={ 
                            isFetching && parseInt(accessRightId) !== 1
                                ? <CircularProgress color="secondary" size={ 20 } className={ classes.progress } />
                                : (
                                    <Checkbox
                                        name='permission' 
                                        checked={ parseInt(accessRightId) === 1 || permissions.includes(id) || name === 'View Dashboard' } 
                                        onChange={ handleChange } 
                                        value={ id } 
                                        disabled={
                                            name === 'View Dashboard'
                                                ? true
                                                : parseInt(accessRightId) === 1
                                        }
                                    /> 
                                )
                        }
                        label={ name }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 8 } lg={ 8 }>
                    <Typography variant="body1" color='textSecondary'>{ description }</Typography>
                </Grid>
            </Grid>
        ))
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    ACCESS_RIGHT: selectAccessRight
});

export default connect(mapStateToProps)(PermissionCheckBox)
