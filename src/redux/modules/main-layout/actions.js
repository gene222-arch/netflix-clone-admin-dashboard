import ACTION_TYPES from './action.types';


const { 
    TOGGLE_DRAWER, 
    TOGGLE_DROPDOWN, 
    DROPDOWN_OPEN_ITEM_ONE, 
    DROPDOWN_OPEN_ITEM_TWO,
    TOGGLE_SECOND_LIST_ITEM } = ACTION_TYPES;


export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER
});

export const toggleDropdown = () => ({
    type: TOGGLE_DROPDOWN
});

export const openDropdownItemOne = () => ({
    type: DROPDOWN_OPEN_ITEM_ONE
});

export const openDropdownItemTwo = () => ({
    type: DROPDOWN_OPEN_ITEM_TWO
});

export const toggleSecondListItem = () => ({
    type: TOGGLE_SECOND_LIST_ITEM
});
