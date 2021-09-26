import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectActivityLog } from './../../../redux/modules/activity-log/selector';
import { connect, useDispatch } from 'react-redux';
import * as ACTIVITY_LOG_ACTION from './../../../redux/modules/activity-log/actions'
import { useHistory } from 'react-router-dom';
import InputField from '../../../components/activity-log/InputField';

const CreateActivityLog = ({ ACTIVITY_LOG }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ activityLog, setActivityLog ] = useState(ACTIVITY_LOG.activityLog);

    const handleClickCreate = () => dispatch(ACTIVITY_LOG_ACTION.createActivityLogStart({
        ...activityLog,
        type: activityLog.type.value,
        model_type: activityLog.model_type.value,
    }));

    useEffect(() => {
        return () => {
            setActivityLog(ACTIVITY_LOG.activityLog);
        }
    }, []);

    return (
        <InputField 
            actionName='Create'
            onSave={ handleClickCreate }
            activityLog={ activityLog }
            setActivityLog={ setActivityLog }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    ACTIVITY_LOG: selectActivityLog
});

export default connect(mapStateToProps)(CreateActivityLog)
