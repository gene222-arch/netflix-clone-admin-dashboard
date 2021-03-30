import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import MailIcon from '@material-ui/icons/Mail';
import DropdownIcon from './../../../components/DropdownIcon';


const Dropdown = ({ open, handleToggle, itemOne, itemTwo, toggleDropdownItemOne, toggleDropdownItemTwo, classes }) => {
    return (
        <>
            <ListItem button onClick={ handleToggle }>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={'Dropdown'} />
                <DropdownIcon open={ open } />
            </ListItem>
            
            <Collapse 
                in={ open } 
                timeout="auto" 
                unmountOnExit 
                className={ classes }
            >
                <List component="div" disablePadding>
                    {/* Item 1 */}
                    <ListItem button selected={ itemOne } onClick={ toggleDropdownItemOne }>
                        <ListItemText primary="Item 1"/>
                    </ListItem>

                    {/* Item 2 */}
                    <ListItem button selected={ itemTwo } onClick={ toggleDropdownItemTwo }>
                        <ListItemText primary="Item 2"/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

export default Dropdown
