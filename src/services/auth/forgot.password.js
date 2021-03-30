import axiosInstance from '../../utils/axiosInstance'

export const forgotPasswordAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/forgot-password/email', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
