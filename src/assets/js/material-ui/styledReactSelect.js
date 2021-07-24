
import Colors from './../../../constants/Colors';

const styledReactSelectStyles = ({
    option: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? "#999999" : null  
    }),
    menu: base => ({
        ...base,
        background: Colors.darkMode,
        borderRadius: 0,
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0,
        color: Colors.white,
        '&:hover': {
            background: Colors.darkMode
        }
    }),
    multiValue: base => ({ ...base, backgroundColor: 'gray' }),
    multiValueLabel: base => ({
        ...base, 
        background: Colors.darkMode, 
        fontWeight: 'bold', 
        color: 'white', 
        paddingRight: 6 
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        ':hover': {
            color: 'tomato',
            background: Colors.white, 
        },
    }),
    singleValue: base => ({ 
        ...base, 
        backgroundColor: 'transparent', 
        color: Colors.white,
    }),
    input: styles => ({ ...styles, color: Colors.white })
});

export default styledReactSelectStyles