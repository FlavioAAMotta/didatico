import React from 'react';

export const MenuItem = (props) =>{
    return(
        <a href={props.href}>{props.texto}</a>
    )
}