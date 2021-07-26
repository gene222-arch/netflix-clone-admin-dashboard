import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as GENRE_ACTION from './../../../../redux/modules/genre/actions'; 
import { selectGenre } from './../../../../redux/modules/genre/selector';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import PATH from './../../../../routes/path';
import MaterialTable from './../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../../components/MaterialTableActionButton';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container'


const Genre = ({ GENRE }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Name', 
            field: 'name',
            render: ({ id, name }) => (
                <StyledNavLink 
                    to={ PATH.UPDATE_GENRE.replace(':id', id) } 
                    text={ name } 
                />
            ) 
        },
        { title: 'Description', field: 'description' },
        {
            title: 'Enabled',
            field: 'enabled',
            render: ({ id, enabled }) => (
                <Switch 
                    checked={ Boolean(enabled) } 
                    onChange={ () => handleClickEnabled(id) }
                    name='enabled' 
                />
            )
        }
    ];

    const [ ids, setIDs ] = useState([]);

    const handleClickDeleteGenre = () => {
        setIDs([]);
        dispatch(GENRE_ACTION.deleteGenresStart({ ids }));
    }

    const handleClickEnabled = (id) => {
        dispatch(GENRE_ACTION.toggleGenreEnabledStart({ id }));
    }

    useEffect(() => {
        dispatch(GENRE_ACTION.fetchAllGenresStart());
    }, []);

    return (
        <Container maxWidth="lg">
            <MaterialTable 
                columns={ columns }      
                data={ GENRE.genres }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_GENRE) }
                        deleteButtonCallback={ handleClickDeleteGenre }
                    /> 
                }
                isLoading={ GENRE.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    GENRE: selectGenre
});

export default connect(mapStateToProps)(Genre)