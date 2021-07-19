import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/casts')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/casts/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/casts`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/casts/${ payload.id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateEnabledStatusAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/casts/${ id }/enabled`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteAsync = async (ids) => 
{
    return await axiosInstance()
        .delete(`/casts`, {
            data: { ids }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}