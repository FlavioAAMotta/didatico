import React from 'react'
import MeuComponente from './components/MeuComponente';
import './App.css';

function App() {
const objeto1 = { nome: 'Maria', idade: 25 };
const objeto2 = { profissao: 'Engenheira', pais: 'Brasil' };

const objetoMesclado = { ...objeto1, ...objeto2 };
console.log(objetoMesclado); // Saída: { nome: 'Maria', idade: 25, profissao: 'Engenheira', pais: 'Brasil' }  
   

  return (
    <div>
      <MeuComponente />
      <MeuComponente />
    </div>
  );
}

export default App;
