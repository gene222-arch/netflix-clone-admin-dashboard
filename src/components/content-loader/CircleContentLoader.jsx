import { Avatar } from '@material-ui/core';
import React from 'react'
import ContentLoader from 'react-content-loader'
import Colors from './../../constants/Colors';

const CircleContentLoader = ({ speed = 1.5, radius = 21 }) => {
    return (
        <Avatar>
            <ContentLoader 
                speed={ speed }
                backgroundColor={ Colors.darkMode }
                foregroundColor={ Colors.grey }
                style={{ width: '100%', height: '100%' }}
            >
                <circle cx="20" cy="20" r={ radius } style={{ width: '100%', height: '100%' }} />
            </ContentLoader>
        </Avatar>
    )
}

export default CircleContentLoader
