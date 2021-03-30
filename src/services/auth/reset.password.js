import axiosInstance from '../../utils/axiosInstance'

export const resetPasswordAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/forgot-password/reset', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}