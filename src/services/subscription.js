import axiosInstance from './../utils/axiosInstance'

export const storeAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/subscriptions', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const cancelAsync = async () => 
{
    return await axiosInstance()
        .put('/subscriptions/cancel')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}