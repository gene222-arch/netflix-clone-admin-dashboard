import axiosInstance from '../../utils/axiosInstance'

export const ePaymentAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/payment-methods/e-payment', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findPaymentIntentAsync = async (id) => 
{
    return await axiosInstance()
        .get(`/payment-methods/payment-intents/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const storePaymentIntentAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/payment-methods/payment-intents', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const attachPaymentMethodToIntentAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/payment-methods/payment-intents/attach-payment-method', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const cancelPaymentIntentAsync = async (id) => 
{
    return await axiosInstance()
        .put(`/payment-methods/payment-intents/${ id }/cancel`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}