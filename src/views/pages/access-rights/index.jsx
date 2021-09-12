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
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    ACCESS_RIGHT: selectAccessRight
});

export default connect(mapStateToProps)(AccessRight)