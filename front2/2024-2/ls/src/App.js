import React from 'react';

class App extends React.Component {
  state = {
    name: "",
    email: "",
    idade: ""
  }

  onChangeName = (event) => {
    this.setState({ name: event.target.value })
  }
  onChangeEmail = (evento) => {
    this.setState({ email: evento.target.value })
  }
  onChangeIdade = (evento) => {
    this.setState({ idade: evento.target.value })
  }

  salvarLS = () =>{
    localStorage.setItem("name", this.state.name)
    localStorage.setItem("email", this.state.email)
    localStorage.setItem("idade", this.state.idade)
  }

  recuperarLS = () =>{
    let name = localStorage.getItem("name")
    let email = localStorage.getItem("email")
    let idade = localStorage.getItem("idade")
    this.setState({
      name: name,
      email: email,
      idade: idade
    })
  }

  render() {
    return (
      <div>
        <input name="name" value={this.state.name} onChange={this.onChangeName} placeholder='Digite seu nome' />
        <input name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder='Digite seu email' />
        <input name="idade" value={this.state.idade} onChange={this.onChangeIdade} placeholder='Digite sua idade' />

        <button onClick={this.salvarLS}>Salvar no LS</button>
        <button onClick={this.recuperarLS}>Recuperar do LS</button>
      </div>
    );
  }
}

export default App;
