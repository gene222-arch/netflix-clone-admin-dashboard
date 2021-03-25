import Axios from 'axios'

export default () => 
{
    let headers = {
        Accept: 'application/json',
        ContentType: 'application/json',
    };

    const axiosInstance = Axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers
    });

    axiosInstance.interceptors.response.use(
        response => Promise.resolve(response),
        error => Promise.reject(error)
    )

    return axiosInstance;
}
