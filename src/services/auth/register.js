import axiosInstance from '../../utils/axiosInstance'

export const registerAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/auth/register', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
