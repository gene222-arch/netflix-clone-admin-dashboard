import React, { useState, useEffect } from 'react'
import * as AUTHOR_NAMES_ACTION from '../../redux/modules/author/actions'
import * as CAST_ACTION from '../../redux/modules/cast/actions'
import * as DIRECTOR_ACTION from '../../redux/modules/director/actions'
import * as GENRE_ACTION from '../../redux/modules/genre/actions'
import * as MOVIE_ACTION from '../../redux/modules/movie/actions'
import * as MOVIE_API from './../../services/movies/movie'
import { useDispatch, batch } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PATH from '../../routes/path';
import { format } from 'date-fns';
import HumanResourceFields from './HumanResourceFields';
import MovieFile from './MovieImages';
import MovieInfoFields from './MovieInfoFields';
import { getFilePreview } from './../../utils/file';


const DEFAULT_FILE_PREVIEW_PROPS = {
    poster: null,
    isPosterUploading: false,
    wallpaper: null,
    isWallpaperUploading: false,
    title_logo: null,
    isTitleLogoUploading: false,
    video: null,
    isVideoUploading:false
};

const MovieInputFields = ({ movie, setMovie, cardHeaderTitle, saveButtonCallback }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ filePreviews, setFilePreviews ] = useState(DEFAULT_FILE_PREVIEW_PROPS);

    const handleChangeVideoFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isVideoUploading: true });

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const video_size_in_mb = file.size / 1000;
        const reader = new FileReader();

        try {
            const { data, status } = await MOVIE_API.uploadVideoAsync({ video: file });
            setMovie({ ...movie, video_path: data, video_size_in_mb });

            if (status === 'success') {
                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, video: e.target.result });
                };
    
                reader.readAsDataURL(file);

                dispatch(MOVIE_ACTION.updateMovieErrorState({ 
                    video_path: ''
                }));
            }
            
        } catch ({ message }) {
            dispatch(MOVIE_ACTION.updateMovieErrorState({  video_path: message.video }));
        }

        setFilePreviews({ ...filePreviews, isVideoUploading: false });
        e.target.value = null;
    }

    const handleChangePosterFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isPosterUploading: true });

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await MOVIE_API.uploadPosterAsync({ poster: file });
            
            if (status === 'success') {
                setMovie({ ...movie, poster_path: data });

                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, poster: e.target.result });
                };
        
                reader.readAsDataURL(file);

                dispatch(MOVIE_ACTION.updateMovieErrorState({ 
                    poster_path: ''
                }));
            }
        } catch ({ message }) {
            dispatch(MOVIE_ACTION.updateMovieErrorState({ poster_path: message.poster }));
        }

        setFilePreviews({ ...filePreviews, isPosterUploading: false });
        e.target.value = null;
    }

    const handleChangeWallpaperFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isWallpaperUploading: true });

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await MOVIE_API.uploadWallpaperAsync({ wallpaper: file });
            setMovie({ ...movie, wallpaper_path: data });

            if (status === 'success') {
                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, wallpaper: e.target.result });
                };
        
                reader.readAsDataURL(file);

                dispatch(MOVIE_ACTION.updateMovieErrorState({ 
                    wallpaper_path: '' 
                }));
            }
        } catch ({ message }) {
            dispatch(MOVIE_ACTION.updateMovieErrorState({  wallpaper_path: message.wallpaper }));
        }

        setFilePreviews({ ...filePreviews, isWallpaperUploading: false });
        e.target.value = null;
    }

    const handleChangeTitleLogoFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isTitleLogoUploading: true });

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const reader = new FileReader();

        try {
            const { data, status } = await MOVIE_API.uploadTitleLogoAsync({ title_logo: file });
            setMovie({ ...movie, title_logo_path: data });

            if (status === 'success') {
                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, title_logo: e.target.result });
                };
        
                reader.readAsDataURL(file);

                dispatch(MOVIE_ACTION.updateMovieErrorState({ title_logo_path: '' }));
            }
        } catch ({ message }) {
            dispatch(MOVIE_ACTION.updateMovieErrorState({ 
                title_logo_path: message.title_logo
            }));
        }

        setFilePreviews({ ...filePreviews, isTitleLogoUploading: false });
        e.target.value = null;
    }

    const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });

    const handleChangeReleaseDate = (date) => 
    {
        const date_of_release = format(date, 'yyyy-MM-dd');
        const year_of_release = format(date, 'yyyy');

        setMovie({ ...movie, date_of_release, year_of_release });
    }

    const handleClickCancel = () => history.push(PATH.VIDEO_MANAGEMENT_MOVIES);

    const handleSelectMultipleOptions = (selectedOptions, nameIDs, name) => 
    {
        const selectedIDs = selectedOptions.map(({ value }) => value);
        
        setMovie({ ...movie, [nameIDs]: selectedIDs, [name]: selectedOptions });
    }

    const handleSelectSingleOption = (selectedOption, name) => setMovie({ ...movie, [name]: selectedOption });

    useEffect(() => {
        batch(() => {
            dispatch(AUTHOR_NAMES_ACTION.fetchAllAuthorsStart());
            dispatch(CAST_ACTION.fetchAllCastsStart());
            dispatch(DIRECTOR_ACTION.fetchAllDirectorsStart());
            dispatch(GENRE_ACTION.fetchAllGenresStart());
        });

        return () => {
            setFilePreviews(DEFAULT_FILE_PREVIEW_PROPS);
            dispatch(MOVIE_ACTION.clearMovieErrors());
        }
    }, []);

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={1}>
                {/* Movie Information */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MovieInfoFields 
                        cardHeaderTitle={ cardHeaderTitle }
                        movie={ movie }
                        handleChange={ handleChange }
                        handleChangeVideoFile={ handleChangeVideoFile }
                        filePreview={ filePreviews.video }
                        isUploading={ filePreviews.isVideoUploading }
                        handleChangeReleaseDate={ handleChangeReleaseDate }
                        handleSelectSingleOption={ handleSelectSingleOption }
                    />
                </Grid>

                {/* Displays */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MovieFile
                        movie={ movie }
                        handleChangePosterFile={ handleChangePosterFile }
                        handleChangeWallpaperFile={ handleChangeWallpaperFile }
                        handleChangeTitleLogoFile={ handleChangeTitleLogoFile }
                        filePreviews={ filePreviews }
                    />
                </Grid>
            
                {/* Human Resources */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <HumanResourceFields 
                        movie={ movie }
                        handleSelectMultipleOptions={ handleSelectMultipleOptions }
                        saveButtonCallback={ saveButtonCallback }
                        handleClickCancel={ handleClickCancel }
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default MovieInputFields