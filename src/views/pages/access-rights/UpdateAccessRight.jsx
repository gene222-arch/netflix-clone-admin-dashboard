import React, { useState, useEffect } from 'react'
import InputFields from '../../../components/access-rights/InputFields'
import { createStructuredSelector } from 'reselect';
import { selectAccessRight } from '../../../redux/modules/access-rights/selector';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ACCESS_RIGHT_ACTION from './../../../redux/modules/access-rights/actions'
import * as ACCESS_RIGHT_API from './../../../services/access-rights/access.rights'
import PATH from './../../../routes/path';
import DataNotFound from './../../../components/not-found-components/DataNotFound';
import { LockOpen } from '@material-ui/icons';


const UpdateAccessRight = ({ ACCESS_RIGHT }) => 
{
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [ accessRight, setAccessRight ] = useState(ACCESS_RIGHT.accessRight);
    const [ isFetching, setIsFetching ] = useState(false);
    const [ isAccessRightFound, setIsAccessRightFound ] = useState(true);

    const onLoadFetchAccessRightById = async () => 
    {
        setIsFetching(true);
        
        const accessRightExists = ACCESS_RIGHT.accessRights.find(access => access.id === parseInt(id));

        if (! accessRightExists) {
            setIsAccessRightFound(false);
        } else {
            try {
                const { status, data: { role, permissions } } = await ACCESS_RIGHT_API.findByIDAsync(id);
    
                if (status === 'success') {
                    setAccessRight({
                        role,
                        permissions: permissions.map(({ id }) => id)
                    });
                }
            } catch ({ message }) {}
        }

        setIsFetching(false);
    }

    const handleClickUpdateAccessRight = () => {
        dispatch(ACCESS_RIGHT_ACTION.updateAccessRightStart({
            ...accessRight,
            id,
            permissions: accessRight.permissions.find(pId => parseInt(pId) === 8) 
                ? accessRight.permissions
                : [ ...accessRight.permissions, 8 ]
        }));
    }

    const handleClickCancel = () => {
        dispatch(ACCESS_RIGHT_ACTION.clearAccessRightErrors());
        history.push(PATH.ACCESS_RIGHT);
    }

    useEffect(() => 
    {
        onLoadFetchAccessRightById();
        return () => {
            setAccessRight(ACCESS_RIGHT.accessRight);
            setIsFetching(false);
        }
    }, [])

    if (! isAccessRightFound) return <DataNotFound type='Access Right' Icon={ LockOpen } />

    return (
        <InputFields 
            actionName='Update Access Right'
            isFetching={ isFetching }
            accessRight={ accessRight }
            setAccessRight={ setAccessRight }
            handleClickSave={ handleClickUpdateAccessRight }
            handleClickCancel={ handleClickCancel }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    ACCESS_RIGHT: selectAccessRight
});

export default connect(mapStateToProps)(UpdateAccessRight)
