import logo from './logo.svg';
import './App.css';
import { MeuComponente } from './components/MeuComponente';
import styled from 'styled-components';

const TituloVermelho = styled.h1`
  color:red;
  background-color: purple;
`

const DivEstilizada = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: green;
  color: yellow;
  height: 100vh;
  border: 1px dotted blue;
`

function App() {
  return (
    <DivEstilizada>
      <TituloVermelho>Título 1</TituloVermelho>
      <MeuComponente texto={"Texto 1"} />
      <MeuComponente texto={"Texto 2"} idade={2} />
    </DivEstilizada>
  );
}

export default App;
