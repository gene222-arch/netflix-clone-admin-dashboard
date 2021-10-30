import axiosInstance from '../../utils/axiosInstance'

export const ePaymentAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/payment-methods/e-payment', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}