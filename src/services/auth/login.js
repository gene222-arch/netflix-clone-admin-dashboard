import axiosInstance from '../../utils/axiosInstance'

export const loginAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/auth/login?withRoles=1&withPermissions=1', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}


export const logoutAsync = async () => 
{
    return await axiosInstance()
        .post('/logout')
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}