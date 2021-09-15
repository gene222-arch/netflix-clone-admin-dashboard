import React from 'react'
import { NavLink as NavLinkRouter } from 'react-router-dom';
import styledNavLinkUseStyles from './../../assets/js/material-ui/styledNavLinkUseStyles';


const StyledNavLink = ({ to, text, ...props }) => 
{
    const classes = styledNavLinkUseStyles();
    return <NavLinkRouter to={to} className={ classes.link } { ...props }>{ text }</NavLinkRouter>
}

export default StyledNavLink