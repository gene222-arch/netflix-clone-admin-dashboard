import axiosInstance from '../../utils/axiosInstance'

export const fetchDashboardDataAsync = async (payload) => 
{
    return await axiosInstance()
        .get('/dashboard', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}