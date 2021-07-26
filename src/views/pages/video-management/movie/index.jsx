import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as MOVIE_ACTION from './../../../../redux/modules/movie/actions'; 
import { selectMovie } from './../../../../redux/modules/movie/selector';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import PATH from '../../../../routes/path';
import MaterialTable from '../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from '../../../../components/MaterialTableActionButton';
import Container from '@material-ui/core/Container'


const Movie = ({ MOVIE }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const columns = 
    [
        { title: 'id', field: 'id', hidden: true },
        { 
            title: 'Title', 
            field: 'title',
            render: ({ id, title }) => (
                <StyledNavLink 
                    to={{
                        pathname: PATH.UPDATE_MOVIE.replace(':id', id),
                        actionName: 'Update Movie'
                    }} 
                    text={ title } 
                />
            ) 
        },
        { title: 'Plot', field: 'plot' },
        { title: 'Year of Release', field: 'year_of_release' },
        { title: 'Casts', field: 'casts' },
        { title: 'Country', field: 'country' },
        { title: 'Directed by', field: 'directors' }
    ];

    const [ ids, setIDs ] = useState([]);

    const handleClickDeleteMovie = () => {
        setIDs([]);
        dispatch(MOVIE_ACTION.deleteMoviesStart({ ids }));
    }

    useEffect(() => {
        dispatch(MOVIE_ACTION.fetchAllMoviesStart());
    }, []);

    return (
        <Container maxWidth="lg">
            <MaterialTable 
                columns={ columns }      
                data={ MOVIE.movies }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_MOVIE, { actionName: 'Create Movie' }) }
                        deleteButtonCallback={ handleClickDeleteMovie }
                    /> 
                }
                isLoading={ MOVIE.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    MOVIE: selectMovie
});

export default connect(mapStateToProps)(Movie)