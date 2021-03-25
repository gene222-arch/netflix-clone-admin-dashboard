import axiosInstance from '../../utils/axiosInstance'


/**
 * Fetching resources from posts api
 * 
 * @returns { object }
 */
export const indexAsync = async () => 
{
    return await axiosInstance()
        .get('/posts')
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}


/**
 * Create a new resource to posts api
 * 
 * @param { object } payload 
 * @returns { object }
 */
export const storeAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/posts', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}


/**
 * Delete a resource to posts api
 * 
 * @param { object } payload 
 * @returns { object }
 */
export const destroyAsync = async (payload) => 
{
    return await axiosInstance()
        .delete(`/posts/${payload.id}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}
