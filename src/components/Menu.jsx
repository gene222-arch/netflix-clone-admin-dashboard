import React from 'react'
import MuiMenu from '@material-ui/core/Menu'

const Menu = ({ children, ...props }) => {
    return (
        <MuiMenu 
            { ...props } 
            PaperProps={{ 
                style: {  
                    width: '10rem',
                    height: '10rem'
                } 
            }} 
        >
            { children }
        </MuiMenu>
    )
}

export default Menu
