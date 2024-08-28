import React from 'react';
import { MenuItem } from './MenuItem';
import { StyledNav } from './StyledNav';

export const Nav = () =>{
    return(
        <StyledNav>
            <MenuItem texto={'Início'} href={'https://www.google.com'} />
            <MenuItem texto={'Em alta'} href={'https://www.ead.faminas.edu.br'} />
            <MenuItem texto={'Inscrições'} href={'https://www.g1.com'} />
        </StyledNav>
    )
}