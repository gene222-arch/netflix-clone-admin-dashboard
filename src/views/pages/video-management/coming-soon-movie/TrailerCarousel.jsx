import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import EditIcon from '@material-ui/icons/Edit';
import { Typography, IconButton, AppBar, Toolbar } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import trailerCarouselUseStyles from './../../../../assets/js/material-ui/trailerCarouselUseStyles';
import * as CONFIRM_ACTION from './../../../../redux/modules/confirm/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectComingSoonMovie } from '../../../../redux/modules/coming-soon-movie/selector';

const TrailerCarousel = ({ COMING_SOON_MOVIE, id, trailers, handleClickEdit, handleClickDelete }) =>
{
    const classes = trailerCarouselUseStyles();
    const dispatch = useDispatch();
    
    const [ carouselIndex, setCarouselIndex ] = useState(0);

    const toggleShowDeleteConfirmation = () => {
        dispatch(CONFIRM_ACTION.showConfirmationDialog({
            mainHeader: 'Delete selected item',
            subHeader: 'Once deleted, recovery of data is not possible',
            confirmCallback: handleClickConfirm
        }));
    }
    const handleClickConfirm = () => 
    {
        handleClickDelete(carouselIndex);
        toggleShowDeleteConfirmation();
    }

    useEffect(() => {
        return () => {
            setCarouselIndex(0);
        }
    }, []);

    return (
        <>
            {
                trailers.length > 0 && (
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography variant='h6' className={classes.title}>{ trailers[carouselIndex].title }</Typography>
                            <IconButton 
                                edge='start' 
                                color='inherit' 
                                aria-label='edit' 
                                onClick={ toggleShowDeleteConfirmation } 
                                disabled={ COMING_SOON_MOVIE.isLoading }
                            >
                                <DeleteOutlinedIcon />
                            </IconButton>
                            <IconButton 
                                edge='start' 
                                color='inherit' 
                                aria-label='delete' 
                                onClick={ () => handleClickEdit(carouselIndex) } 
                                disabled={ COMING_SOON_MOVIE.isLoading }
                            >
                                <EditIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar> 
                )
            }  
            <Carousel onChange={ index => setCarouselIndex(index) }>
                {
                    trailers.map(({ video_path }, i) => (
                        <video className={ classes.video } controls>
                            <source src={ video_path } type='video/mp4'/>
                        </video>
                    ))
                }
            </Carousel>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    COMING_SOON_MOVIE: selectComingSoonMovie
});

export default connect(mapStateToProps)(TrailerCarousel)