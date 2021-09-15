import React from 'react'
import MuiMenu from '@material-ui/core/Menu'

const Menu = ({ children, ...props }) => {
    return (
        <MuiMenu 
            PaperProps={{ 
                style: {  
                    width: '10rem',
                    height: '10rem'
                } 
            }}
            { ...props } 
        >
            { children }
        </MuiMenu>
    )
}

export default Menu
