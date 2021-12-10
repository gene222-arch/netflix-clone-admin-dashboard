import axiosInstance from '../../utils/axiosInstance'
import * as FormDataHelper from './../../utils/formData'

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

export const fetchAllAsync = async (trashedOnly = false) => 
{
    return await axiosInstance()
        .get(`/movies?trashedOnly=${ trashedOnly }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/movies/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/movies`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/movies/${ payload.id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

/**
 * 
 * @param {array} ids 
 * @returns {Promise}
 */
export const restoreAsync = async (ids) => 
{
    return await axiosInstance()
        .put('/movies/restore', { ids })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadPosterAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/movies/upload/poster`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadWallpaperAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/movies/upload/wallpaper`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadTitleLogoAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/movies/upload/title-logo`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadVideoAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/movies/upload/video`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadVideoPreviewAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/movies/upload/video-preview`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteAsync = async (ids) => 
{
    return await axiosInstance()
        .delete(`/movies`, {
            data: { ids }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}