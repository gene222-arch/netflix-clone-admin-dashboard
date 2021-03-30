import React from 'react'
import CustomAlert from './CustomAlert';

const Error = ({ error }) => {
    return (
        <>
            {
                (typeof error === 'string' && error.length > 0) && (
                    <CustomAlert status={ 'error' } message={ error } />
                ) 
            }
        </>
    )
}

export default Error
