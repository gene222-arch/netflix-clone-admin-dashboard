import axiosInstance from './../utils/axiosInstance'

export const findPaymentAuthorizationsByUserIdAsync = async (userId) => 
{
    return await axiosInstance()
        .get(`/notifications/payment-authorizations?userId=${ userId }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}