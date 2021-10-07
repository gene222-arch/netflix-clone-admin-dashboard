import React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { css } from '@emotion/react'
import Colors from './../constants/Colors';

const PageLoader = () => 
{
    const loaderStyled = css`
        position: fixed; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
    `;

	return <PacmanLoader css={ loaderStyled } size={ 40 } margin={ 2 } color={ Colors.netflixRed } />
}

export default PageLoader;