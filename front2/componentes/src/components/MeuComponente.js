import React from 'react';
import styled from 'styled-components';

const TituloVermelho = styled.h1`
  color:red;
  border: 1px solid black;
  padding: 20px;
  background-color: green;
`

function MeuComponente(){
    return(
      <>
        <TituloVermelho>Olá</TituloVermelho>
        <TituloVermelho>Meu primeiro componente</TituloVermelho>
      </>
    )
  }

export default MeuComponente