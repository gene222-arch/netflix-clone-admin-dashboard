import axiosInstance from './../utils/axiosInstance'

export const findPaymentAuthorizationsByUserIdAsync = async () => 
{
    return await axiosInstance()
        .get(`/notifications/payment-authorizations`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}