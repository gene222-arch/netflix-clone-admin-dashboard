import axiosInstance from '../../utils/axiosInstance'

export const fetchAllAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/users', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updateEmailAsync = async (payload) => 
{
    return await axiosInstance()
        .put('/users/email', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const updatePasswordAsync = async (payload) => 
{
    return await axiosInstance()
        .put('/users/password', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const sendChangeEmailVerificationCodeAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/users/email-verification-code', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}