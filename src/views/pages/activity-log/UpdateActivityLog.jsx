import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectActivityLog } from './../../../redux/modules/activity-log/selector';
import { connect, useDispatch } from 'react-redux';
import * as ACTIVITY_LOG_ACTION from './../../../redux/modules/activity-log/actions'
import InputField from '../../../components/activity-log/InputField';
import { useParams } from 'react-router';


const UpdateActivityLog = ({ ACTIVITY_LOG }) => 
{
    const dispatch = useDispatch();
    const { id } = useParams();

    const [ activityLog, setActivityLog ] = useState(ACTIVITY_LOG.activityLog);

    const handleClickUpdate = () => dispatch(ACTIVITY_LOG_ACTION.updateActivityLogStart({
        ...activityLog,
        type: activityLog.type.value,
        model_type: activityLog.model_type.value,
    }));

    const onLoadSetActivityLog = () => 
    {
        const log = ACTIVITY_LOG.activityLogs.find(actLog => actLog.id === parseInt(id));
        setActivityLog({
            ...log,
            type: {
                label: log.type,
                value: log.type
            },
            model_type: {
                label: log.model_type.replace('App\\Models\\', ''),
                value: log.model_type.replace('App\\Models\\', '')
            }
        });
    }

    useEffect(() => {
        onLoadSetActivityLog();
        return () => {
            setActivityLog(ACTIVITY_LOG.activityLog);
        }
    }, []);

    return (
        <InputField 
            actionName='Update'
            onSave={ handleClickUpdate }
            activityLog={ activityLog }
            setActivityLog={ setActivityLog }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    ACTIVITY_LOG: selectActivityLog
});

export default connect(mapStateToProps)(UpdateActivityLog)
