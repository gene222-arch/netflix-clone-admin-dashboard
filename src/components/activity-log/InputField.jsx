import React, { useEffect } from 'react'
import { Card, CardContent, Container, Grid, TextField, Avatar, CardHeader, IconButton } from '@material-ui/core'
import StyledReactSelect from '../../components/styled-components/StyledReactSelect'
import { createStructuredSelector } from 'reselect';
import { selectActivityLog, selectActivityLogErrorMessages, selectActivityLogHasErrorMessages } from './../../redux/modules/activity-log/selector';
import { connect, useDispatch } from 'react-redux';
import SaveCancelButtons from '../../components/SaveCancelButtons';
import { useHistory } from 'react-router-dom';
import PATH from './../../routes/path';
import CardBackButton from './../../components/CardBackButton';
import * as ACTIVITY_LOG_ACTION from './../../redux/modules/activity-log/actions'

const TYPES = [
    {
        value: 'Create',
        label: 'Create'
    },
    {
        value: 'Update',
        label: 'Update'
    },
    {
        value: 'Delete',
        label: 'Delete'
    }
];

const MODEL_TYPES = [
    {
        value: 'Author',
        label: 'Author'
    },
    {
        value: 'Cast',
        label: 'Cast'
    },
    {
        value: 'Director',
        label: 'Director'
    },
    {
        value: 'AccessRight',
        label: 'AccessRight'
    },
    {
        value: 'Movie',
        label: 'Movie'
    },
    {
        value: 'ComingSoonMovie',
        label: 'ComingSoonMovie'
    },
    {
        value: 'Genre',
        label: 'Genre'
    },
    {
        value: 'Trailer',
        label: 'Trailer'
    },
];

const InputField = ({ actionName, onSave, activityLog, setActivityLog, ACTIVITY_LOG, ACTIVITY_LOG_HAS_ERROR, ACTIVITY_LOG_ERROR }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        window.addEventListener('load', () => dispatch(ACTIVITY_LOG_ACTION.clearActivityLogErrors()))
        return () => {
            dispatch(ACTIVITY_LOG_ACTION.clearActivityLogErrors());
        }
    }, []);

    return (
        <Container maxWidth='lg'>
            <Card>
                <CardHeader
                  title={
                    <CardBackButton 
                        actionName={ actionName } 
                        title='Activity Logs' 
                    />
                  }
                  
                />
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item xs={ 12 }>
                            <Grid container spacing={1}>
                                <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                    <StyledReactSelect 
                                        data={ TYPES }
                                        value={ activityLog.type }
                                        placeholder='Select Type'
                                        onChange={ type => setActivityLog({ ...activityLog, type: type })}
                                        error={ ACTIVITY_LOG_HAS_ERROR.type }
                                        helperText={ ACTIVITY_LOG_ERROR.type }
                                    />
                                </Grid>
                                <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                    <StyledReactSelect 
                                        data={ MODEL_TYPES }
                                        value={ activityLog.model_type }
                                        placeholder='Select Model'
                                        onChange={ modelType => setActivityLog({ ...activityLog, model_type: modelType })}
                                        error={ ACTIVITY_LOG_HAS_ERROR.model_type }
                                        helperText={ ACTIVITY_LOG_ERROR.model_type }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                label="Description"
                                value={ activityLog.description }
                                onChange={ e => setActivityLog({ ...activityLog, description: e.target.value })}
                                multiline
                                rows={ 5 }
                                fullWidth
                                error={ ACTIVITY_LOG_HAS_ERROR.description }
                                helperText={ ACTIVITY_LOG_ERROR.description }
                                variant='filled'
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <SaveCancelButtons 
                                saveButtonCallback={ onSave }
                                cancelButtonCallback={ () => history.push(PATH.ACTIVITY_LOG) }
                                isLoading={ ACTIVITY_LOG.isLoading }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    ACTIVITY_LOG: selectActivityLog,
    ACTIVITY_LOG_HAS_ERROR: selectActivityLogHasErrorMessages,
    ACTIVITY_LOG_ERROR: selectActivityLogErrorMessages
});

export default connect(mapStateToProps)(InputField)
