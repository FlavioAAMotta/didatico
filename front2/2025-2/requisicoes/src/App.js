import './App.css';
import React from 'react'
import axios from 'axios'

export class App extends React.Component {

  state = {
    title: "",
    body: "",
    userId: "",
    pokemons: []
  }

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value })
  }
  onChangeBody = (event) => {
    this.setState({ body: event.target.value })
  }
  onChangeUserId = (event) => {
    this.setState({ userId: event.target.value })
  }

  createPost = async () => {
    try {
      const body = this.state;
      console.log(body);
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        body
      })
      console.log("Post criado com sucesso: ", res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  carregarPokemons = async () => {
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon');
    this.setState({pokemons: pokemons.data.results})
    console.log(pokemons.data.results)
  }

  pokemonsCarregados = this.state.pokemons.map((pokemon)=>{
    return <p>pokemon.name</p>
  })

  render() {
    return (
      <>
        <input type='text' value={this.state.title} onChange={this.onChangeTitle}></input>
        <input type='text' value={this.state.body} onChange={this.onChangeBody}></input>
        <input type='text' value={this.state.userId} onChange={this.onChangeUserId}></input>
        <br />
        <button onClick={this.createPost}>Criar post</button>
        <button onClick={this.carregarPokemons}>Carregar</button>
        {this.pokemonsCarregados}
      </>
    );
  }
}
export default App;
