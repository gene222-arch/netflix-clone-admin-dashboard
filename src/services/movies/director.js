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
        .get('/directors')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/directors/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/directors`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/directors/${ payload.id }`, payload)
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
         .put('/directors/restore', { ids })
         .then(response => response.data)
         .catch(error => Promise.reject(error.response.data));
 }


export const updateEnabledStatusAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/directors/${ id }/enabled`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadAvatarAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/directors/upload-avatar`, FormDataHelper.prepareToFormData(payload, 'POST'), config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteAsync = async (ids) => 
{
    return await axiosInstance()
        .delete(`/directors`, {
            data: { ids }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}