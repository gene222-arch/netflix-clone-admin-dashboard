import React,{ useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as CAST_ACTION from './../../../../redux/modules/cast/actions'; 
import { selectCast } from './../../../../redux/modules/cast/selector';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import PATH from './../../../../routes/path';
import MaterialTable from './../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../../components/MaterialTableActionButton';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

const Cast = ({ CAST }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Birth Name', 
            field: 'birth_name',
            render: ({ id, birth_name }) => <StyledNavLink to={ PATH.UPDATE_CAST.replace(':id', id) } text={ birth_name } /> 
        },
        { title: 'Pseudonym', field: 'pseudonym' },
        {
            title: 'Enabled',
            field: 'enabled',
            render: ({ id, enabled }) => (
                <Switch checked={ Boolean(enabled) } onChange={ () => handleClickEnabled(id) } name='enabled' />
            )
        }
    ];

    const [ ids, setIDs ] = useState([]);
    
    const handleClickDeleteCast = () => {
        dispatch(CAST_ACTION.deleteCastsStart({ ids }));
    }

    const handleClickEnabled = (id) => {
        dispatch(CAST_ACTION.toggleEnabledStart({ id }));
    }

    useEffect(() => {
        dispatch(CAST_ACTION.fetchAllCastsStart());
        if (!CAST.casts.length) {
            dispatch(CAST_ACTION.fetchAllCastsStart());
        }
    }, []);

    return (
        <MaterialTable 
            columns={ columns }      
            data={ CAST.casts }  
            title={ 
                <MaterialTableActionButton
                    ids={ ids } 
                    addButtonCallback = { () => history.push(PATH.CREATE_CAST) }
                    deleteButtonCallback={ handleClickDeleteCast }
                /> 
            }
            isLoading={ CAST.isLoading }
            onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    CAST: selectCast
});

export default connect(mapStateToProps)(Cast)