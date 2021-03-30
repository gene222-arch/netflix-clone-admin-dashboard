import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import MailIcon from '@material-ui/icons/Mail';
import DropdownIcon from './../../../components/DropdownIcon';


const SecondListItem = ({ open, handleToggle, classes }) => {
    return (
        <>
            <ListItem button onClick={ handleToggle }>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={'Second list item'} />
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
                    <ListItem button >
                        <ListItemText primary="Item 1"/>
                    </ListItem>

                    {/* Item 2 */}
                    <ListItem button>
                        <ListItemText primary="Item 2"/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

export default SecondListItem
