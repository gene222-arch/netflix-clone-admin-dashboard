import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/user-profiles', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/user-profiles/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/user-profiles`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/user-profiles/${ payload.id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const manageProfileLockAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/user-profiles/${ payload.user_profile_id }/pin-code`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const disableAsync = async (profileIds) => 
{
    return await axiosInstance()
        .put(`/user-profiles/disable`, {
            ids: profileIds
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}


export const deleteAsync = async (id) => 
{
    return await axiosInstance()
        .delete(`/user-profiles/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}