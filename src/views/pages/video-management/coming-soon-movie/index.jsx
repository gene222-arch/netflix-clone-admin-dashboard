import React,{ useState, useEffect, useMemo } from 'react'
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
import { Chip, Avatar, IconButton, Container } from '@material-ui/core';
import comingSoonMovieUseStyles from './../../../../assets/js/material-ui/comingSoonMovieUseStyles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';


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
                    to={{
                        pathname: PATH.UPDATE_COMING_SOON_MOVIE.replace(':id', id),
                        actionName: 'Update Movie'
                    }} 
                    text={ title } 
                />
            ) 
        },
        { title: 'Plot', field: 'plot', width: '20%', cellStyle: { textAlign: 'justify' } },
        { title: 'Casts', field: 'casts' },
        { title: 'Country', field: 'country' },
        { title: 'Directed by', field: 'directors' },
        { 
            title: 'Status', 
            field: 'status',
            render: ({ id, status }) => (
                <Tooltip title='Update Status'>
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
                </Tooltip>
            )
        },
        { 
            title: 'Action', 
            field: 'action',
            render: ({ id, title }) => (
                <StyledNavLink 
                    to={ PATH.VIEW_COMING_SOON_MOVIE.replace(':id', `${ id }?${ title }`) } 
                    text={
                        <Tooltip title="View">
                            <IconButton>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                    } 
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
        <Container maxWidth="lg">
            <MaterialTable 
                columns={ columns }      
                data={ COMING_SOON_MOVIE.comingSoonMovies }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_COMING_SOON_MOVIE, { actionName: 'Create Movie' }) }
                        deleteButtonCallback={ handleClickDeleteComingSoonMovie }
                    /> 
                }
                isLoading={ COMING_SOON_MOVIE.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie
});

export default connect(mapStateToProps)(ComingSoonMovie)