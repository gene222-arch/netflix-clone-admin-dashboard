import ACTION_TYPES from './action.types';


const { 
    TOGGLE_DRAWER, 

    TOGGLE_DROPDOWN, 
    DROPDOWN_OPEN_ITEM_ONE,
    DROPDOWN_OPEN_ITEM_TWO,

    TOGGLE_SECOND_LIST_ITEM 
} = ACTION_TYPES;

const DEFAULT_STATE = {
    drawer: true,
    dropdown: false,
    dropdownItemOne: false,
    dropdownItemTwo: false,
    secondListItem: false,
};

const initialState = {
    drawer: false,
    dropdown: false,
    dropdownItemOne: false,
    dropdownItemTwo: false,
    secondListItem: false,

    currentSelectedItem: 'Dashboard',
    currentSelectedDropdown: '',
    currentSelectedDropdownItem: '',
};

export default (state = initialState, { type, payload }) => 
{
    const { 
        currentSelectedItem, 
        currentSelectedDropdown, 
        currentSelectedDropdownItem, 
        drawer, 
        dropdown, 
        dropdownItemOne,
        dropdownItemTwo, 
        secondListItem } = state;

    switch (type) 
    {
        case TOGGLE_DRAWER:
            return { 
                ...state,
                ...DEFAULT_STATE, 
                drawer: !drawer,
                /** History */
                currentSelectedItem, 
                [currentSelectedDropdown]: !drawer,
                [currentSelectedDropdownItem]: !drawer,
            };

        case TOGGLE_DROPDOWN: 
            return { 
                ...DEFAULT_STATE,
                dropdown: !dropdown,
                /** History */
                [currentSelectedDropdownItem]: !dropdown,
                currentSelectedItem,  
                currentSelectedDropdownItem,
                currentSelectedDropdown: 'dropdown'
            };

        case DROPDOWN_OPEN_ITEM_ONE: 
            return { 
                ...DEFAULT_STATE, 
                dropdown: true,
                dropdownItemOne: !dropdownItemOne, 
                /** History */
                currentSelectedItem: 'Dropdown item one',
                currentSelectedDropdownItem: 'dropdownItemOne',
                currentSelectedDropdown: 'dropdown',
            };

        case DROPDOWN_OPEN_ITEM_TWO: 
            return { 
                ...DEFAULT_STATE, 
                dropdown: true,
                dropdownItemTwo: !dropdownItemTwo, 
                /** History */
                currentSelectedItem: 'Dropdown item two',
                currentSelectedDropdownItem: 'dropdownItemTwo',
                currentSelectedDropdown: 'dropdown',
            };

        case TOGGLE_SECOND_LIST_ITEM: 
            return { 
                ...DEFAULT_STATE, 
                secondListItem: !secondListItem,
                /** History */
                currentSelectedItem,
                currentSelectedDropdown: 'secondListItem'
            };
        
        default:
            return state;
    }
}
