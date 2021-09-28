import React,{ useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as DIRECTOR_ACTION from './../../../../redux/modules/director/actions'; 
import { selectDirector } from './../../../../redux/modules/director/selector';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import PATH from './../../../../routes/path';
import MaterialTable from './../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../../components/MaterialTableActionButton';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';

const avatarIndexUseStyles = makeStyles(theme => ({
    avatarImg: {
        objectFit: 'contain'
    }
}));

const Director = ({ DIRECTOR }) => 
{
    const classes = avatarIndexUseStyles();
    
    const dispatch = useDispatch();
    const history = useHistory();
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        {
            title: 'Avatar', 
            field: 'avatar_path',
            render: ({ avatar_path }) => <img className={ classes.avatarImg } src={ avatar_path }  width='100' height='120' />
        },
        { 
            title: 'Birth Name', 
            field: 'birth_name',
            render: ({ id, birth_name }) => <StyledNavLink to={ PATH.UPDATE_DIRECTOR.replace(':id', id) } text={ birth_name } /> 
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

    const handleClickDeleteDirector = () => {
        setIDs([]);
        dispatch(DIRECTOR_ACTION.deleteDirectorsStart({ ids }));
    }

    const handleClickEnabled = (id) => {
        dispatch(DIRECTOR_ACTION.toggleDirectorEnabledStart({ id }));
    }

    useEffect(() => {
        dispatch(DIRECTOR_ACTION.fetchAllDirectorsStart());
    }, []);

    return (
        <Container maxWidth="lg">
            <MaterialTable 
                columns={ columns }      
                data={ DIRECTOR.directors }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_DIRECTOR) }
                        deleteButtonCallback={ handleClickDeleteDirector }
                    /> 
                }
                isLoading={ DIRECTOR.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    DIRECTOR: selectDirector
});

export default connect(mapStateToProps)(Director)