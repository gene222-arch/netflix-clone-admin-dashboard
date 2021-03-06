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
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import ToggleTrashedButton from './../../../../components/styled-components/ToggleTrashedButton';

const avatarIndexUseStyles = makeStyles(theme => ({
    avatarImg: {
        objectFit: 'contain'
    }
}));

const Cast = ({ CAST }) => 
{
    const classes = avatarIndexUseStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        {
            title: 'Avatar', 
            field: 'avatar_path',
            render: ({ id, avatar_path }) => (
                <StyledNavLink 
                    to={ PATH.UPDATE_CAST.replace(':id', id) } 
                    text={ <img className={ classes.avatarImg } src={ avatar_path }  width='100' height='120' /> } 
                />
            )
        },
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
    const [ areDataTrashed, setAreDataTrashed ] = useState(false);

    const handleClickToggleFilterButton = (trashedOnly) => {
        setAreDataTrashed(! trashedOnly);
        dispatch(CAST_ACTION.fetchAllCastsStart({ trashedOnly: !trashedOnly }));
    }

    const handleClickRestoreCasts = () => {
        dispatch(CAST_ACTION.restoreCastsStart(ids));
        setIDs([]);
    }

    const handleClickDeleteCast = () => {
        setIDs([]);
        dispatch(CAST_ACTION.deleteCastsStart({ ids }));
    }

    const handleClickEnabled = (id) => {
        dispatch(CAST_ACTION.toggleCastEnabledStart({ id }));
    }

    useEffect(() => {
        dispatch(CAST_ACTION.fetchAllCastsStart({ trashedOnly: areDataTrashed }));

        return () => {
            setIDs([]);
            setAreDataTrashed(false);
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <ToggleTrashedButton onClick={ handleClickToggleFilterButton } isLoading={ CAST.isLoading } />
            <MaterialTable 
                columns={ columns }      
                data={ CAST.casts }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        areDataTrashed={ areDataTrashed }
                        addButtonCallback = { () => history.push(PATH.CREATE_CAST) }
                        deleteButtonCallback={ handleClickDeleteCast }
                        restoreButtonCallback={ handleClickRestoreCasts }
                    /> 
                }
                isLoading={ CAST.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    CAST: selectCast
});

export default connect(mapStateToProps)(Cast)