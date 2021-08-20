import axiosInstance from '../../utils/axiosInstance'

export const verifyEmailAsync = async ({ id, hash, expires, signature }) => 
{
    return await axiosInstance()
        .get(`/email/verify-email/${ id }/${ hash }?expires=${ expires }&signature=${ signature }`)
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
