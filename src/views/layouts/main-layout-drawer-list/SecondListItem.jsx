import React from 'react'

/** Material UI Components */
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

/** Material UI Icons*/
import MailIcon from '@material-ui/icons/Mail';
import DropdownIcon from './../../../components/DropdownIcon';
import { useDispatch, connect } from 'react-redux';

import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import mainLayoutUseStyles from './../../../assets/js/material-ui/mainLayoutUseStyles';


const SecondListItem = ({ MAIN_LAYOUT }) => 
{
    const classes = mainLayoutUseStyles();
    const dispatch = useDispatch();

    const handleToggleSecondListItem = () => dispatch(MAIN_LAYOUT_ACTION.toggleSecondListItem());

    return (
        <>
            <ListItem button onClick={ handleToggleSecondListItem }>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary={'Second list item'} />
                <DropdownIcon open={ MAIN_LAYOUT.secondListItem } />
            </ListItem>
            
            <Collapse 
                in={ MAIN_LAYOUT.secondListItem } 
                timeout='auto' 
                unmountOnExit 
                className={ classes.collapseChildren }
            >
                <List component='div' disablePadding>
                    {/* Item 1 */}
                    <ListItem button >
                        <ListItemText primary='Item 1'/>
                    </ListItem>

                    {/* Item 2 */}
                    <ListItem button>
                        <ListItemText primary='Item 2'/>
                    </ListItem>
                </List>
            </Collapse>            
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(SecondListItem)
