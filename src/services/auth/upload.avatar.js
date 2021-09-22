import axiosInstance from '../../utils/axiosInstance'
import * as FormDataHelper from './../../utils/formData'

export const uploadAvatarAsync = async (payload) => 
{
    return await axiosInstance()
        .post('/auth/upload-avatar', FormDataHelper.prepareToFormData(payload), {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data));
}
