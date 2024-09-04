import React from 'react';
import { StyledHeader } from './StyledHeader';
import styled from 'styled-components';

const InputStyled = styled.input`
    height: 30px;
`

export const Header = () =>{
    return(
        <StyledHeader>
            <h1>OurTube</h1>
            <InputStyled placeholder='Buscar' />
        </StyledHeader>
    )
}