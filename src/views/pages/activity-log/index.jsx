import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as ACTIVITY_LOG_ACTION from './../../../redux/modules/activity-log/actions'; 
import { selectActivityLog } from './../../../redux/modules/activity-log/selector';
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import MaterialTable from './../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../components/MaterialTableActionButton';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container'
import CRUDBadge from './../../../components/CRUDBadge';
import { Tooltip, Typography } from '@material-ui/core';


const ActivityLog = ({ ACTIVITY_LOG }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        {
            title: 'Date',
            field: 'executed_at',
            render: ({ id, executed_at, view_data_path }) => (
                !view_data_path
                    ? <StyledNavLink to={ PATH.UPDATE_ACTIVITY_LOG.replace(':id', id) } text={ executed_at } />
                    : <StyledNavLink to={ view_data_path } text={ executed_at } />
            )
        },
        {
            title: 'Model',
            field: 'model_type',
            render: ({ model_type }) => model_type.replace('App\\Models\\', '')
        },
        { 
            title: 'Type', 
            field: 'type',
            render: ({ id, type }) => <CRUDBadge action={ type } />
        },
        { 
            title: 'Description', 
            field: 'description',
            render: ({ description }) => !description ? 'No Description' : description
        }
    ];

    const [ ids, setIds ] = useState([]);

    const handleClickDeleteActivityLog = () => {
        dispatch(ACTIVITY_LOG_ACTION.deleteActivityLogsStart({ ids }));
        setIds([]);
    }

    useEffect(() => 
    {
        dispatch(ACTIVITY_LOG_ACTION.fetchAllActivityLogsStart());

        return () => {
            setIds([]);
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <MaterialTable 
                columns={ columns }      
                data={ ACTIVITY_LOG.activityLogs }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_ACTIVITY_LOG) }
                        deleteButtonCallback={ handleClickDeleteActivityLog }
                    /> 
                }
                isLoading={ ACTIVITY_LOG.isLoading }
                onSelectionChange={ rows => setIds(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    ACTIVITY_LOG: selectActivityLog
});

export default connect(mapStateToProps)(ActivityLog)