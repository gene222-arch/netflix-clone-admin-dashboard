import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/genres')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/genres/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/genres`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/genres/${ payload.id }`, payload)
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
         .put('/casts/genres', { ids })
         .then(response => response.data)
         .catch(error => Promise.reject(error.response.data));
}  

export const updateEnabledStatusAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/genres/${ id }/enabled`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteAsync = async (ids) => 
{
    return await axiosInstance()
        .delete(`/genres`, {
            data: { ids }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}