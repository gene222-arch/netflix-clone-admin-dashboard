import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import EditIcon from '@material-ui/icons/Edit';
import { Typography, IconButton, AppBar, Toolbar } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import trailerCarouselUseStyles from './../../../../assets/js/material-ui/trailerCarouselUseStyles';

const TrailerCarousel = ({ id, trailers, handleClickEdit, handleClickDelete, ...props }) =>
{
    const classes = trailerCarouselUseStyles();
    
    const [ carouselIndex, setCarouselIndex ] = useState(0);

    return (
        <>
            {
                trailers.length > 0 && (
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography variant='h6' className={classes.title}>{ trailers[carouselIndex].title }</Typography>
                            <IconButton edge='start' color='inherit' aria-label='edit' onClick={ () => handleClickDelete(carouselIndex) } >
                                <DeleteOutlinedIcon />
                            </IconButton>
                            <IconButton edge='start' color='inherit' aria-label='delete' onClick={ () => handleClickEdit(carouselIndex) } >
                                <EditIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar> 
                )
            }  
            <Carousel onChange={ index => setCarouselIndex(index) }>
                {
                    trailers.map(({ video_path }, i) => <Item key={ i } path={ video_path } />)
                }
            </Carousel>
        </>
    )
}

const Item = ({ path }) =>
{
    const classes = trailerCarouselUseStyles();
    
    return (
        <video className={ classes.video } controls >
            <source src={ path } type='video/mp4'/>
        </video>
    )
}

export default TrailerCarousel