import React, { useState, useEffect } from 'react'
import * as AUTHOR_NAMES_ACTION from '../../redux/modules/author/actions'
import * as CAST_ACTION from '../../redux/modules/cast/actions'
import * as DIRECTOR_ACTION from '../../redux/modules/director/actions'
import * as GENRE_ACTION from '../../redux/modules/genre/actions'
import * as COMING_SOON_MOVIE_ACTION from '../../redux/modules/coming-soon-movie/actions'
import * as MOVIE_API from '../../services/movies/coming.soon.movie'
import { useDispatch, batch } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PATH from '../../routes/path';
import { format } from 'date-fns';
import HumanResourceFields from './HumanResourceFields';
import MovieFile from './ComingSoonMovieImages';
import ComingSoonMovieInfoFields from './ComingSoonMovieInfoFields';
import { isValidKeyboardDatePickerDate } from './../../utils/date';


const DEFAULT_FILE_PREVIEW_PROPS = {
    poster: null,
    isPosterUploading: false,
    wallpaper: null,
    isWallpaperUploading: false,
    title_logo: null,
    isTitleLogoUploading: false,
    video_trailer: null,
    isVideoTrailerUploading:false
};

const ComingSoonMovieInputFields = ({ comingSoonMovie, setComingSoonMovie, cardHeaderTitle, saveButtonCallback }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ filePreviews, setFilePreviews ] = useState(DEFAULT_FILE_PREVIEW_PROPS);
    const [ isReleaseDateValid, setIsReleaseDateValid ] = useState(true);

    const handleChangeVideoTrailerFile = async (e) => 
    {
        setFilePreviews({ ...filePreviews, isVideoTrailerUploading: true });

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const video_size_in_mb = file.size / 1000;
        const reader = new FileReader();

        try {
            const { data, status } = await MOVIE_API.uploadVideoAsync({ video: file });

            setComingSoonMovie({ ...comingSoonMovie, video_trailer_path: data, video_size_in_mb });

            if (status === 'success') {
                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, video_trailer: e.target.result });
                };
    
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({ 
                    video_trailer_path: ''
                }));
            }
            
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({ video_trailer_path: message.video }));
        }

        setFilePreviews({ ...filePreviews, isVideoTrailerUploading: false });
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
                setComingSoonMovie({ ...comingSoonMovie, poster_path: data });

                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, poster: e.target.result });
                };
        
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({ 
                    poster_path: ''
                }));
            }
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({ poster_path: message.poster  }));
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
            setComingSoonMovie({ ...comingSoonMovie, wallpaper_path: data });

            if (status === 'success') {
                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, wallpaper: e.target.result });
                };
        
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({ 
                    wallpaper_path: ''
                }));
            }
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({  wallpaper_path: message.wallpaper }));
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
            setComingSoonMovie({ ...comingSoonMovie, title_logo_path: data });

            if (status === 'success') {
                reader.onload = (e) => {
                    setFilePreviews({ ...filePreviews, title_logo: e.target.result });
                };
        
                reader.readAsDataURL(file);

                dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({ 
                    title_logo_path: ''
                }));
            }
        } catch ({ message }) {
            dispatch(COMING_SOON_MOVIE_ACTION.updateComingSoonMovieErrorState({ title_logo_path: message.title_logo }));
        }

        setFilePreviews({ ...filePreviews, isTitleLogoUploading: false });
        e.target.value = null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        name !== 'status'
            ? setComingSoonMovie({ ...comingSoonMovie, [name]: value })
            : setComingSoonMovie({ ...comingSoonMovie, [name]: comingSoonMovie[name] === 'Release' ? 'Coming Soon' : 'Release' });
    }

    const handleChangeReleaseDate = (date, value) => 
    {
        if (date !== 'Invalid Date' && !value) {
            const date_of_release = format(date, 'yyyy-MM-dd');
            const year_of_release = format(date, 'yyyy');

            setComingSoonMovie({ ...comingSoonMovie, date_of_release, year_of_release });
        }
        
        if (value && isValidKeyboardDatePickerDate(value)) {
            setIsReleaseDateValid(true);
            setComingSoonMovie({ ...comingSoonMovie, date_of_release: value, year_of_release: value.substring(0, 4) });
        } 
        else if (value) {
            setIsReleaseDateValid(false);
        }
    }

    const handleClickCancel = () => history.push(PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES);

    const handleSelectMultipleOptions = (selectedOptions, nameIDs, name) => 
    {
        const selectedIDs = selectedOptions.map(({ value }) => value);
        
        setComingSoonMovie({ ...comingSoonMovie, [nameIDs]: selectedIDs, [name]: selectedOptions });
    }

    const handleSelectSingleOption = (selectedOption, name) => setComingSoonMovie({ ...comingSoonMovie, [name]: selectedOption });

    useEffect(() => {
        batch(() => {
            dispatch(AUTHOR_NAMES_ACTION.fetchAllAuthorsStart());
            dispatch(CAST_ACTION.fetchAllCastsStart());
            dispatch(DIRECTOR_ACTION.fetchAllDirectorsStart());
            dispatch(GENRE_ACTION.fetchAllGenresStart());
        });

        return () => {
            setFilePreviews(DEFAULT_FILE_PREVIEW_PROPS);
            setIsReleaseDateValid(false);
            dispatch(COMING_SOON_MOVIE_ACTION.clearComingSoonMovieErrors());
        }
    }, []);

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={1}>
                {/* Movie Information */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ComingSoonMovieInfoFields 
                        cardHeaderTitle={ cardHeaderTitle }
                        comingSoonMovie={ comingSoonMovie }
                        handleChange={ handleChange }
                        handleChangeVideoTrailerFile={ handleChangeVideoTrailerFile }
                        filePreview={ filePreviews.video_trailer }
                        isUploading={ filePreviews.isVideoTrailerUploading }
                        handleChangeReleaseDate={ handleChangeReleaseDate }
                        handleSelectSingleOption={ handleSelectSingleOption }
                    />
                </Grid>

                {/* Displays */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MovieFile
                        comingSoonMovie={ comingSoonMovie }
                        handleChangePosterFile={ handleChangePosterFile }
                        handleChangeWallpaperFile={ handleChangeWallpaperFile }
                        handleChangeTitleLogoFile={ handleChangeTitleLogoFile }
                        filePreviews={ filePreviews }
                    />
                </Grid>
            
                {/* Human Resources */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <HumanResourceFields 
                        comingSoonMovie={ comingSoonMovie }
                        handleChange={ handleChange }
                        handleSelectMultipleOptions={ handleSelectMultipleOptions }
                        saveButtonCallback={ saveButtonCallback }
                        handleClickCancel={ handleClickCancel }
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ComingSoonMovieInputFields