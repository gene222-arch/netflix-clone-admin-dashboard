import { Avatar } from '@material-ui/core';
import React from 'react'
import ContentLoader from 'react-content-loader'
import Colors from '../../constants/Colors';

const BoxContentLoader = ({ speed = 1.5, width, height }) => {
    return (
        <ContentLoader 
            speed={ speed }
            backgroundColor={ Colors.darkGrey }
            foregroundColor={ Colors.darkMode }
            style={{ width, height }}
        >
            <rect height={ height } style={{ width }} />
        </ContentLoader>
    )
}

export default BoxContentLoader
