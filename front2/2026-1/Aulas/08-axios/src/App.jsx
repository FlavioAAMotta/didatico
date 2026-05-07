import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState([])

  const pegarPokemons = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response.data.results)
        setPokemon(response.data.results)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    pegarPokemons()
  }, [])

  const renderedPokemons = pokemon.map((pokemon) => {
    return (
      <p key={pokemon.name}>{pokemon.name}</p>
    )
  })

  return (
    <>
      {renderedPokemons}
    </>
  )
}

export default App
