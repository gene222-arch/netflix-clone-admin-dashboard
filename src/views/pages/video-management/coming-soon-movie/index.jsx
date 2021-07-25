import React,{ useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as COMING_SOON_MOVIE_ACTION from './../../../../redux/modules/coming-soon-movie/actions'; 
import { selectComingSoonMovie } from './../../../../redux/modules/coming-soon-movie/selector';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import PATH from '../../../../routes/path';
import MaterialTable from '../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from '../../../../components/MaterialTableActionButton';
import { Chip, Avatar } from '@material-ui/core';
import comingSoonMovieUseStyles from './../../../../assets/js/material-ui/comingSoonMovieUseStyles';


const ComingSoonMovie = ({ COMING_SOON_MOVIE }) => 
{
    const classes = comingSoonMovieUseStyles();
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
                    to={ PATH.UPDATE_COMING_SOON_MOVIE.replace(':id', id) } 
                    text={ title } 
                />
            ) 
        },
        { title: 'Plot', field: 'plot' },
        { title: 'Year of Release', field: 'year_of_release' },
        { title: 'Casts', field: 'casts' },
        { title: 'Country', field: 'country' },
        { title: 'Directed by', field: 'directors' },
        { 
            title: 'Status', 
            field: 'status',
            render: ({ id, status }) => (
                <Chip 
                    avatar={
                        <Avatar
                            className={clsx(classes.status, {
                                [classes.statusComingSoon]: status === 'Coming Soon',
                                [classes.statusRelease]: status === 'Released',
                            })}
                        >
                            { status.substr(0, 1) }
                        </Avatar>
                    } 
                    label={ status } 
                    onClick={ () => handleClickUpdateStatus(id) } 
                />
            )
        },
        
    ];

    const [ ids, setIDs ] = useState([]);

    const handleClickDeleteComingSoonMovie = () => {
        setIDs([]);
        dispatch(COMING_SOON_MOVIE_ACTION.deleteComingSoonMoviesStart({ ids }));
    }

    const handleClickUpdateStatus = (id) => {
        dispatch(COMING_SOON_MOVIE_ACTION.toggleComingSoonMovieReleaseStart({ id }));
    }

    useEffect(() => {
        dispatch(COMING_SOON_MOVIE_ACTION.fetchAllComingSoonMoviesStart());
    }, []);

    return (
        <MaterialTable 
            columns={ columns }      
            data={ COMING_SOON_MOVIE.comingSoonMovies }  
            title={ 
                <MaterialTableActionButton
                    ids={ ids } 
                    addButtonCallback = { () => history.push(PATH.CREATE_COMING_SOON_MOVIE) }
                    deleteButtonCallback={ handleClickDeleteComingSoonMovie }
                /> 
            }
            isLoading={ COMING_SOON_MOVIE.isLoading }
            onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie
});

export default connect(mapStateToProps)(ComingSoonMovie)