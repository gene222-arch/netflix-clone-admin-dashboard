import axiosInstance from './../utils/axiosInstance'

export const findCurrentPaymentAuthorizationByUserIdAsync = async () => 
{
    return await axiosInstance()
        .get(`/notifications/payment-authorizations/current`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const fetchAllPaymentAuthorizationByUserIdAsync = async () => 
{
    return await axiosInstance()
        .get(`/notifications/payment-authorizations`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}