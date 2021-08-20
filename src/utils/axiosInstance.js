import Axios from 'axios'
import * as Cookie from './cookies'

export default () => 
{
    const headers = {};

    if (Cookie.has('access_token')) {
        headers.Authorization = `Bearer ${ Cookie.get('access_token') }`
    }

    const axiosInstance = Axios.create({
<<<<<<< HEAD
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            Authorization: `Bearer ${ Cookie.get('access_token') }`
        }
=======
        baseURL: 'http://192.168.18.34:8000/api', // process.env.REACT_APP_API_BASE_URL
        headers
>>>>>>> 098d50810c074dbdaa58bbb6f528d3ceb4abf31d
    });

    axiosInstance.interceptors.response.use(
        response => Promise.resolve(response),
        error => {
            switch (error.response.status) {
                case 401:
                    alert('Unauthorized access');
                    break;

                case 403:
                    alert('Forbidden');
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
