import React,{ useState, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as COMING_SOON_MOVIE_ACTION from './../../../../redux/modules/coming-soon-movie/actions'; 
import { selectComingSoonMovie, selectComingSoonMovieHasErrorMessages } from './../../../../redux/modules/coming-soon-movie/selector';
import StyledNavLink from '../../../../components/styled-components/StyledNavLink';
import PATH from '../../../../routes/path';
import MaterialTable from '../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from '../../../../components/MaterialTableActionButton';
import { Chip, Avatar, IconButton, Container } from '@material-ui/core';
import comingSoonMovieUseStyles from './../../../../assets/js/material-ui/comingSoonMovieUseStyles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import VideoPreviewDialog from '../../../../components/VideoPreviewDialog';
import ToggleTrashedButton from '../../../../components/styled-components/ToggleTrashedButton';

const DATA_PROPS = {
    id: '',
    video_path: '',
    video_size_in_mb: '',
    duration_in_minutes: '',
    status: ''
};

const ComingSoonMovie = ({ COMING_SOON_MOVIE, COMING_SOON_MOVIE_HAS_ERRORS }) => 
{
    const classes = comingSoonMovieUseStyles();
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
                        pathname: PATH.UPDATE_COMING_SOON_MOVIE.replace(':id', id),
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
                <Tooltip title={ status === 'Released' ? 'Status updated' : 'Update status' }>
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
                        onClick={ () => status === 'Released' ? console.log('') : handleClickRelease(id, status) } 
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

    const [ ids, setIds ] = useState([]);
    const [ data, setData ] = useState(DATA_PROPS);
    const [ open, setOpen ] = useState(false);
    const [ areDataTrashed, setAreDataTrashed ] = useState(false);

    const handleClickToggleFilterButton = (trashedOnly) => {
        setAreDataTrashed(! trashedOnly);
        dispatch(COMING_SOON_MOVIE_ACTION.fetchAllComingSoonMoviesStart({ trashedOnly: !trashedOnly }));
    }
    
    const handleClickRestoreComingSoonMovies = () => {
        dispatch(COMING_SOON_MOVIE_ACTION.restoreComingSoonMoviesStart(ids));
        setIds([]);
    }

    const handleClickRelease = (movieId, status) => {
        setData({ ...data, status, id: movieId });
        setOpen(true);
    }

    const handleClickDeleteComingSoonMovie = () => {
        setIds([]);
        dispatch(COMING_SOON_MOVIE_ACTION.deleteComingSoonMoviesStart({ ids }));
    }

    const handleClickUpdateStatus = () => {
        dispatch(COMING_SOON_MOVIE_ACTION.toggleComingSoonMovieReleaseStart(data));
    }

    const handleClickCancelUpdateStatus = () => {
        setData(DATA_PROPS);
        setOpen(false);
    }

    useEffect(() => {
        dispatch(COMING_SOON_MOVIE_ACTION.fetchAllComingSoonMoviesStart({ trashedOnly: areDataTrashed }));

        return () => {
            setIds([]);
            setOpen(false);
            setData(DATA_PROPS);
        }
    }, []);

    useEffect(() => {
        if (! (COMING_SOON_MOVIE_HAS_ERRORS.duration_in_minutes && COMING_SOON_MOVIE_HAS_ERRORS.video_path)) {
            setOpen(false);
        }
    }, [COMING_SOON_MOVIE.isLoading])

    return (
        <>
            <VideoPreviewDialog 
                open={ open }
                setOpen={ setOpen }
                data={ data }
                setData={ setData }
                onSave={ handleClickUpdateStatus }
                onCancel={ handleClickCancelUpdateStatus }
            />
            <Container maxWidth="lg">
                <ToggleTrashedButton onClick={ handleClickToggleFilterButton } isLoading={ COMING_SOON_MOVIE.isLoading } />
                <MaterialTable 
                    columns={ columns }      
                    data={ COMING_SOON_MOVIE.comingSoonMovies }  
                    title={ 
                        <MaterialTableActionButton
                            ids={ ids } 
                            areDataTrashed={ areDataTrashed }
                            addButtonCallback = { () => history.push(PATH.CREATE_COMING_SOON_MOVIE, { actionName: 'Create Movie' }) }
                            deleteButtonCallback={ handleClickDeleteComingSoonMovie }
                            restoreButtonCallback={ handleClickRestoreComingSoonMovies }
                        /> 
                    }
                    isLoading={ COMING_SOON_MOVIE.isLoading }
                    onSelectionChange={ rows => setIds(rows.map(({ id }) => id)) }
                />
            </Container>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie,
    COMING_SOON_MOVIE_HAS_ERRORS: selectComingSoonMovieHasErrorMessages
});

export default connect(mapStateToProps)(ComingSoonMovie)