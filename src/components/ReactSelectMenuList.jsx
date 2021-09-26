import React from 'react'
import { components } from 'react-select'


const ReactSelectMenuList = ({ children, ...props }) => 
{
    if (!children.length) {
        return (<div className="myClassListName">{ children }</div>);
    }

    return (
        <components.MenuList { ...props }>
            {children.length && children.map((key, i) => {
                delete key.props.innerProps.onMouseMove; //FIX LAG!!
                // delete key.props.innerProps.onMouseOver;  //FIX LAG!!

                return (
                    <div className="myClassListName" key={ i } >{ key }</div>
                );
            })}
        </components.MenuList>
    );
}

export default ReactSelectMenuList
