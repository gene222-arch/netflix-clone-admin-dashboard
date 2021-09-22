import React, { useState, useEffect } from 'react'
import InputFields from '../../../components/access-rights/InputFields'
import { createStructuredSelector } from 'reselect';
import { selectAccessRight } from '../../../redux/modules/access-rights/selector';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ACCESS_RIGHT_ACTION from './../../../redux/modules/access-rights/actions'
import * as ACCESS_RIGHT_API from './../../../services/access-rights/access.rights'
import PATH from './../../../routes/path';

const UpdateAccessRight = ({ ACCESS_RIGHT }) => 
{
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [ accessRight, setAccessRight ] = useState(ACCESS_RIGHT.accessRight);
    const [ isFetching, setIsFetching ] = useState(false);

    const onLoadFetchAccessRightById = async () => 
    {
        setIsFetching(true);
        try {
            const { status, data: { role, permissions } } = await ACCESS_RIGHT_API.findByIDAsync(id);

            if (status === 'success') {
                setAccessRight({
                    role,
                    permissions: permissions.map(({ id }) => id)
                });
            }

        } catch ({ message }) {}
        setIsFetching(false);
    }

    const handleClickUpdateAccessRight = () => dispatch(ACCESS_RIGHT_ACTION.updateAccessRightStart({
        ...accessRight,
        permissions: [ ...accessRight.permissions, 8 ]
    }));

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
