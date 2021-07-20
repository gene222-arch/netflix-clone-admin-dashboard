import React from 'react'
import ContentLoader from 'react-content-loader'
import Colors from './../../constants/Colors';
import Typography from '@material-ui/core/Typography'

const TextContentLoader = ({ variant = 'h1', speed = 1.5, height = 15 }) => {
    return (
        <Typography variant={ variant } color="initial">
            <ContentLoader 
                speed={ speed }
                height={ height }
                viewBox={ `0 0 300 ${ height }` }
                backgroundColor={ Colors.darkGrey }
                foregroundColor={ Colors.darkMode }
                style={{ width: '100%' }}
            >
                <rect x='0' y='0' rx='2' ry='2' height={ height } style={{ width: '100%' }} />
            </ContentLoader>
        </Typography>
    )
}

export default TextContentLoader
