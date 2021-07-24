import React from 'react'
import Select, { createFilter } from 'react-select';
import makeAnimated from 'react-select/animated';
import styledReactSelectStyles from './../../assets/js/material-ui/styledReactSelect';
import MenuList from './../ReactSelectMenuList';
import Colors from './../../constants/Colors';
import { FormHelperText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    errorText: {
        paddingLeft: '1rem'
    }
}));

const StyledReactSelect = ({ data = [], isMulti = false, defaultValue, value, error = false, helperText = '', ...props }) => 
{
    const classes = useStyles();
    const animatedComponents = makeAnimated();


    return (
        <>
            <Select
                menuPortalTarget={document.body}
                styles={{
                    ...styledReactSelectStyles,
                    control: (base, { isFocused }) =>({
                        ...base,
                        background: Colors.darkMode,
                        borderRadius: isFocused ? "3px 3px 0 0" : 3,
                        borderColor: error ? Colors.tomato : Colors.white,
                        boxShadow: isFocused ? null : null,
                        cursor: 'pointer',
                    })
                }}
                closeMenuOnSelect={ !isMulti }
                components={{
                    ...animatedComponents,
                    MenuList
                }}
                value={ value }
                isLoading={ !data.length }
                isMulti={ isMulti }
                options={ data }
                filterOption={createFilter({ignoreAccents: false})}
                { ...props }
            />
            {
                error && <FormHelperText error={ error } className={ classes.errorText } >{ helperText }</FormHelperText>
            }
        </>
    )
}

export default StyledReactSelect
