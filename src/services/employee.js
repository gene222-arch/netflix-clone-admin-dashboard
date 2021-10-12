import axiosInstance from './../utils/axiosInstance'
import * as FormDataHelper from './../utils/formData'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/employees', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/employees/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/employees`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/employees/${ payload.id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const uploadAvatarAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/employees/avatar', FormDataHelper.prepareToFormData(payload), {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const destroyAsync = async (ids) => 
{
    return await axiosInstance()
        .delete(`/employees`, {
            data: { ids }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const verifyAsync = async ({ id, hash }) => 
{
    return await axiosInstance()
        .put(`/employees/verify/email?id=${ id }&hash=${ hash }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}