import React from 'react';
import { StyledHeader } from './StyledHeader';

export default function Header() {
    return (
        <StyledHeader>
        <h1>OurTube</h1>
        <input type="text" placeholder="Busca" />
        </StyledHeader>
    );
    }