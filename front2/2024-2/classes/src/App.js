import React from 'react';
import './App.css';
import { Contador } from './components/Contador';
import { Formulario } from './components/Formulario';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Contador</h1>
        {/* <Contador /> */}
        <Formulario />
      </>
    );
  }

}

export default App;
