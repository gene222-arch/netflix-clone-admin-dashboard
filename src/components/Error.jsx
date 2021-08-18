import React from 'react'
import CustomAlert from './CustomAlert';

const Error = ({ error }) => {

    const isErrorString = typeof error === 'string' && error;

    return (
        isErrorString && <CustomAlert status={ 'error' } message={ error } />
    )
}

export default Error
