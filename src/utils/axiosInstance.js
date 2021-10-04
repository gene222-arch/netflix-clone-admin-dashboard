import Axios from 'axios'
import * as Cookie from './cookies'

export default () => 
{
    const headers = {};

    if (Cookie.has('email_verification_token')) {
        headers.Authorization = `Bearer ${ Cookie.get('email_verification_token') }`
    }
    
    if (Cookie.has('access_token')) {
        headers.Authorization = `Bearer ${ Cookie.get('access_token') }`
    }

    const axiosInstance = Axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers
    });

    axiosInstance.interceptors.response.use(
        response => Promise.resolve(response),
        error => {
            switch (error.response.status) {
                case 401:
                    console.log('Unauthorized access');
                    break;

                case 403:
                    Cookie.removeToken();
                    console.log('FORBIDDEN')
                    break;

                case 500:
                    alert('Something went wrong in the server');
                    break;            

                default:
                    break;
            }

            return Promise.reject(error);
        }
    )

    return axiosInstance;
}
