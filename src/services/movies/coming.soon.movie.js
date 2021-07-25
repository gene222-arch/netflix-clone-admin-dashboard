import axiosInstance from '../../utils/axiosInstance'
import * as FormDataHelper from './../../utils/formData'

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/coming-soon-movies', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/coming-soon-movies/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/coming-soon-movies`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createTrailerAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/coming-soon-movies/${ payload.coming_soon_movie_id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/coming-soon-movies/${ payload.id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateStatusAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/coming-soon-movies/${ id }/status`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateTrailerAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/coming-soon-movies/${ payload.coming_soon_movie_id }/trailers/${ payload.trailer_id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadPosterAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/coming-soon-movies/upload/poster`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadWallpaperAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/coming-soon-movies/upload/wallpaper`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadTitleLogoAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/coming-soon-movies/upload/title-logo`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadVideoAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/coming-soon-movies/upload/video-trailer`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteAsync = async (ids) => 
{
    return await axiosInstance()
        .delete(`/coming-soon-movies`, {
            data: { ids }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteTrailersAsync = async (comingSoonMovieID, trailerIDs) => 
{
    return await axiosInstance()
        .delete(`/coming-soon-movies/${ comingSoonMovieID }`, {
            data: { trailer_ids: trailerIDs }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}