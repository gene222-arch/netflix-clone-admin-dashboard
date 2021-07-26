import React from 'react'
import ContentLoader from 'react-content-loader'
import Colors from './../../constants/Colors';
import Typography from '@material-ui/core/Typography'

const TextContentLoader = ({ speed = 1.5, height = 15 }) => {
    return (
        <ContentLoader 
            speed={ speed }
            height={ height }
            viewBox={ `0 0 300 ${ height }` }
            backgroundColor={ Colors.darkGrey }
            foregroundColor={ Colors.darkMode }
            width='100%'
            style={{ maxWidth: 'fit-content', width: '100%' }}
        >
            <rect x='0' y='0' rx='2' ry='2' height={ height } style={{ maxWidth: 'fit-content', width: '100%' }} />
        </ContentLoader>
    )
}

export default TextContentLoader
