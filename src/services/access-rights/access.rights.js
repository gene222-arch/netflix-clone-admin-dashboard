import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async () => 
{
    return await axiosInstance()
        .get('/access-rights')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const fetchAllPermissionsAsync = async () => 
{
    return await axiosInstance()
        .get('/access-rights/permissions')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIDAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/access-rights/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const assignRoleAsync = async ({ role_id, user_ids }) => 
{
    return await axiosInstance()
        .post(`/access-rights/${ role_id }/assign`, { user_ids })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const createAsync = async (payload) => 
{
    return await axiosInstance()
        .post(`/access-rights`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateAsync = async (payload) => 
{
    return await axiosInstance()
        .put(`/access-rights/${ payload.id }`, payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const deleteAsync = async (ids) => 
{
    return await axiosInstance()
        .delete(`/access-rights`, {data: { ids }})
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}