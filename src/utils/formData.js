/**
 * 
 * @param {object} object
 * @param {method} string
 */

export const prepareToFormData = (object = {}, method = null) =>
{
    let formData = new FormData;

    for (const key in object)
    {
        const data = object[key];
        
        if (object.hasOwnProperty(key)) {
            formData.append(key, data);
        }

    }

    if (method) {
        formData.append('_method', method);
    }

    return formData;
};