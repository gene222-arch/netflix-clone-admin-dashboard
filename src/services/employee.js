import axiosInstance from './../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/employees', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
