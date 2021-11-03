import axiosInstance from './../utils/axiosInstance'

export const storeAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/subscriptions', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const cancelAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/subscriptions/cancel', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}