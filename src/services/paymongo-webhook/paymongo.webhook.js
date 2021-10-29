import Axios from 'axios';

export const fetchAllAsync = async (payload) => 
{
    return await Axios
        .get('https://api.paymongo.com/v1/webhooks', payload)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIdAsync = async (id) => 
{
    return await Axios
        .get(`https://api.paymongo.com/v1/webhooks/${ id }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}