import React, { useState, useEffect } from 'react'
import InputFields from '../../../components/access-rights/InputFields'
import { createStructuredSelector } from 'reselect';
import { selectAccessRight } from '../../../redux/modules/access-rights/selector';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ACCESS_RIGHT_ACTION from './../../../redux/modules/access-rights/actions'
import PATH from './../../../routes/path';

const CreateAccessRight = ({ ACCESS_RIGHT }) => 
{
    const history = useHistory();
    const dispatch = useDispatch();

    const [ accessRight, setAccessRight ] = useState(ACCESS_RIGHT.accessRight);

    const handleClickCreateAccessRight = () => dispatch(ACCESS_RIGHT_ACTION.createAccessRightStart({
        ...accessRight,
        permissions: [ ...accessRight.permissions, 8 ]
    }));

    const handleClickCancel = () => {
        dispatch(ACCESS_RIGHT_ACTION.clearAccessRightErrors());
        history.push(PATH.ACCESS_RIGHT);
    }

    useEffect(() => 
    {
        return () => {
            setAccessRight(ACCESS_RIGHT.accessRight);
        }
    }, [])

    return (
        <InputFields 
            actionName='Create Access Right'
            accessRight={ accessRight }
            setAccessRight={ setAccessRight }
            handleClickSave={ handleClickCreateAccessRight }
            handleClickCancel={ handleClickCancel }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    ACCESS_RIGHT: selectAccessRight
});

export default connect(mapStateToProps)(CreateAccessRight)
