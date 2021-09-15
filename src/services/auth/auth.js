import axiosInstance from '../../utils/axiosInstance'

export const fetchAuthAsync = async () => 
{
    return await axiosInstance()
        .get('/auth')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const checkPasswordMatchAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/auth/check-password', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
