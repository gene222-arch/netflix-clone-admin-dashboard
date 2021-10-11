import React,{ useState, useEffect } from 'react'
import { useDispatch, connect, batch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as ACCESS_RIGHT_ACTION from './../../../redux/modules/access-rights/actions'; 
import { selectAccessRight } from './../../../redux/modules/access-rights/selector';
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import MaterialTable from './../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../components/MaterialTableActionButton';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';
import Colors from './../../../constants/Colors';
import LinearProgress from '../../../components/LinearProgress';

const accessRightsUseStyles = makeStyles(theme => ({
    permissionCountChip: {
        backgroundColor: Colors.infoDark,
        color: '#FFF',
        fontWeight: 'bold'
    },
    userCountChip: {
        backgroundColor: Colors.warning,
        color: '#000',
        fontWeight: 'bold'
    }
}));

const AccessRight = ({ ACCESS_RIGHT }) => 
{
    const classes = accessRightsUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const employeesField = ({ employees }) => 
    {
        if ( employees.length <= 0 ) return 'To be assigned';
        
        const result = employees
            .map(({ first_name, last_name }) => `${ first_name } ${ last_name }`)
            .join(', ')
            .substring(0, 70);
        
        return result + '...';
    }

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Role', 
            field: 'name',
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_ACCESS_RIGHT.replace(':id', id) } text={ name } /> 
        },
        { 
            title: 'Assigned To', 
            field: 'employees_count',
            render: employeesField
        },
        {
            title: 'Employees',
            field: 'employees_count',
            render: ({ employees_count }) => (
                <Chip 
                    label={ employees_count } 
                    color='default' 
                    variant="outlined" 
                    className={ classes.userCountChip } 
                />
            )
        },
        {
            title: 'Permissions',
            field: 'permissions_count',
            render: ({ permissions_count }) => (
                <LinearProgress value={ permissions_count } maxValue={ ACCESS_RIGHT.permissions.length } />
            )
        
        },
        { 
            title: 'Action', 
            field: 'action',
            render: ({ id, title }) => id !== 1 && (
                <StyledNavLink
                    to={ PATH.ASSIGN_ACCESS_RIGHT.replace(':id', id) } 
                    text={
                        <Tooltip title="Assign">
                            <IconButton>
                                <AssignmentIndIcon />
                            </IconButton>
                        </Tooltip>
                    } 
                />
            ) 
        },
    ];

    const [ ids, setIDs ] = useState([]);

    
    const handleClickDeleteAccessRight = () => {
        setIDs([]);
        dispatch(ACCESS_RIGHT_ACTION.deleteAccessRightsStart({ ids }));
    }

    useEffect(() => {
        batch(() => {
            dispatch(ACCESS_RIGHT_ACTION.fetchAllAccessRightsStart());
            dispatch(ACCESS_RIGHT_ACTION.fetchAllPermissionsStart());
        });
    }, []);

    return (
        <Container maxWidth="lg">
            <MaterialTable
                columns={ columns }      
                data={ ACCESS_RIGHT.accessRights }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_ACCESS_RIGHT) }
                        deleteButtonCallback={ handleClickDeleteAccessRight }
                    /> 
                }
                isLoading={ ACCESS_RIGHT.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
                options={{
                    selection: true,
                    actionsColumnIndex: -1,
                    showTextRowsSelected: false,
                    loadingType: 'linear',
                    selectionProps: ({ id }) => ({
                        disabled: id === 1
                    })
                }}
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    ACCESS_RIGHT: selectAccessRight
});

export default connect(mapStateToProps)(AccessRight)