import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import EditIcon from '@material-ui/icons/Edit';
import { Paper, Typography, Grid, IconButton, AppBar, Toolbar } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    title: {
        flex: 1
    },
    video: {
        width: '100%',
        backgroundSize: 'contain',
        borderBottomRightRadius: '.5rem',
        borderBottomLeftRadius: '.5rem'
    },
}));

const TrailerCarousel = ({ id, trailers, handleClickEdit, handleClickDelete, ...props }) =>
{
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [ carouselIndex, setCarouselIndex ] = useState(0);

    return (
        <>
            {
                trailers.length && (
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography variant='h6' className={classes.title}> </Typography>
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
            <Carousel onChange={ (index) => setCarouselIndex(index) }>
                {
                    trailers.map(({ video_path }, i) => <Item key={ i } path={ video_path } />)
                }
            </Carousel>
        </>
    )
}

const Item = ({ path }) =>
{
    const classes = useStyles();

    return (
        <>
            <video className={ classes.video } controls >
                <source src={ path } type='video/mp4'/>
            </video>
        </>
    )
}

export default TrailerCarousel