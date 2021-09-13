import React,{ useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
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


const AccessRight = ({ ACCESS_RIGHT }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Role', 
            field: 'name',
            render: ({ id, name }) => <StyledNavLink to={ PATH.UPDATE_ACCESS_RIGHT.replace(':id', id) } text={ name } /> 
        },
        { 
            title: 'Assigned To', 
            field: 'users',
            render: ({ users }) => {
                return users[0]?.id
                        ? `${ users[0]?.first_name } ${ users[0]?.last_name }`
                        : 'To be assigned'
            }
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
        dispatch(ACCESS_RIGHT_ACTION.fetchAllAccessRightsStart());
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
                        disabled: id === 1,
                        color: 'textSecondary'
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