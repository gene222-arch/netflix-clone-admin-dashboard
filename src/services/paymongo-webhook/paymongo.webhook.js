import Axios from 'axios';

const config = {
    headers: {
        Authorization: `Basic ${ process.env.REACT_APP_TEST_PAYMONGO_USERNAME_BASE64 }`
    }
};

export const fetchAllAsync = async () => 
{
    return await Axios
        .get('https://api.paymongo.com/v1/webhooks', config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}

export const findByIdAsync = async (id) => 
{
    return await Axios
        .get(`https://api.paymongo.com/webhooks/${ id }`, config)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}