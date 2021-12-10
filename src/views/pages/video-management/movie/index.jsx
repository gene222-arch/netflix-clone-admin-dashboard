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
import ToggleTrashedButton from './../../../../components/styled-components/ToggleTrashedButton';


const Movie = ({ MOVIE }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const columns = 
    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: 'Poster', 
            field: 'poster_path',
            render: ({ id, poster_path }) => (
                <StyledNavLink 
                    to={{
                        pathname: PATH.UPDATE_MOVIE.replace(':id', id),
                        actionName: 'Update Movie'
                    }} 
                    text={ <img src={ poster_path } alt="" width={ 170 } height={ 240 } /> } 
                />
            )
        },
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
        { title: 'Plot', field: 'plot', render: ({ plot }) => plot.substring(0, 100) + '...' },
        { title: 'Year of Release', field: 'year_of_release' },
        { title: 'Casts', field: 'casts' },
        { title: 'Country', field: 'country' },
        { title: 'Directed by', field: 'directors' }
    ];

    const [ ids, setIDs ] = useState([]);
    const [ areDataTrashed, setAreDataTrashed ] = useState(false);

    const handleClickToggleFilterButton = (trashedOnly) => {
        setAreDataTrashed(! trashedOnly);
        dispatch(MOVIE_ACTION.fetchAllMoviesStart({ trashedOnly: !trashedOnly }));
    }

    const handleClickRestoreMovies = () => {
        dispatch(MOVIE_ACTION.restoreMoviesStart(ids));
        setIDs([]);
    }

    const handleClickDeleteMovie = () => {
        setIDs([]);
        dispatch(MOVIE_ACTION.deleteMoviesStart({ ids }));
    }

    useEffect(() => {
        dispatch(MOVIE_ACTION.fetchAllMoviesStart({ trashedOnly: areDataTrashed }));

        return () => {
            setIDs([]);
            setAreDataTrashed(false);
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <ToggleTrashedButton onClick={ handleClickToggleFilterButton } isLoading={ MOVIE.isLoading } />
            <MaterialTable 
                columns={ columns }      
                data={ MOVIE.movies }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        areDataTrashed={ areDataTrashed } 
                        addButtonCallback = { () => history.push(PATH.CREATE_MOVIE, { actionName: 'Create Movie' }) }
                        deleteButtonCallback={ handleClickDeleteMovie }
                        restoreButtonCallback={ handleClickRestoreMovies }
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