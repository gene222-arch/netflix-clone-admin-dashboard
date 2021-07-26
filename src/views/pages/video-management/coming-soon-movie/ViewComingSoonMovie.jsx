import React, { useState, useEffect, useMemo } from 'react'
import Container from '@material-ui/core/Container'
import { useParams, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectComingSoonMovie } from './../../../../redux/modules/coming-soon-movie/selector';
import { connect, batch, useDispatch } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import * as COMING_SOON_MOVIE_API from '../../../../services/movies/coming.soon.movie';
import ComingSoonMovieAccordion from '../../../../components/ComingSoonMovieAccordion';
import ImageContentLoader from './../../../../components/content-loader/ImageContentLoader';
import TrailerCarousel from './TrailerCarousel';
import ViewComingSoonMovieHeader from './ViewComingSoonMovieHeader';
import * as COMING_SOON_MOVIE_ACTION from './../../../../redux/modules/coming-soon-movie/actions'
import PATH from './../../../../routes/path';

const viewComingSoonMovieUseStyles = makeStyles((theme) => ({
    posterImg: {
        width: '100%',
        height: '83vh',
        [theme.breakpoints.down('md')]: {
            height: '100vh',
        }
    },
    titleLogoImg: {
        width: '9.375rem'
    },
}));


const ViewComingSoonMovie = ({ COMING_SOON_MOVIE }) => 
{
    const classes = viewComingSoonMovieUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [ comingSoonMovie, setComingSoonMovie ] = useState(null);

    const onLoadFetchComingSoonMovieByIDAsync = async () => 
    {
        try {
            const { data } = await COMING_SOON_MOVIE_API.findByIDAsync(id);

            setComingSoonMovie(data);
        } catch ({ message }) {
            window.alert(`ERROR ${ message }`);
        }
    };

    const handleClickEdit = (carouselIndex) => {

        const trailerID = trailers[carouselIndex].id;

        history.push(
            PATH.UPDATE_TRAILER.replace(':id/trailers/:trailerID', `${ id }/trailers/${ trailerID }`)
        );
    }

    const handleClickDelete = (carouselIndex) => {
        const trailerID = trailers[carouselIndex].id;

        dispatch(COMING_SOON_MOVIE_ACTION.deleteTrailerStart({ coming_soon_movie_id: id, ids: [ trailerID ] }));
        onLoadFetchComingSoonMovieByIDAsync();
    }

    const trailers = useMemo(() => {
        return !(comingSoonMovie?.trailers.length) 
            ? []
            : comingSoonMovie.trailers.map(({ id, video_path }) => ({ id, video_path }));
    }, [comingSoonMovie]);

    useEffect(() => {
        onLoadFetchComingSoonMovieByIDAsync();
    }, []);

    return (
        <Container maxWidth="xl" >
            <Grid container spacing={1}>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <ViewComingSoonMovieHeader id={ id } />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 5 } lg={ 5 }>
                    {
                        !comingSoonMovie
                            ? <ImageContentLoader width='100%' height='83vh' />
                            : <img src={ comingSoonMovie?.poster_path } className={ classes.posterImg } />
                    }
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 7 }>
                    <ComingSoonMovieAccordion 
                        title={ comingSoonMovie?.title }
                        plot={ comingSoonMovie?.plot }
                        casts={ comingSoonMovie?.casts }
                        directors={ comingSoonMovie?.directors }
                        authors={ comingSoonMovie?.authors }
                        genres={ comingSoonMovie?.genres }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    {
                        trailers && (
                            <TrailerCarousel 
                                id={ id } 
                                trailers={ trailers } 
                                handleClickEdit={ handleClickEdit }
                                handleClickDelete={ handleClickDelete }
                            />
                        )
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie
});

export default connect(mapStateToProps)(ViewComingSoonMovie)
