import React from 'react';

export const MeuComponente = (props) => {
    return(
        <>
            <p>{props.texto}</p>
            <p>{props.idade}</p>
        </>
    )
}