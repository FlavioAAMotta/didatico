import { useState, useEffect } from 'react'
import './App.css'

const personagens = [
  {nome: "Leia Organa", idade: 30},
  {nome: "Jabba", idade: 600},
  {nome: "Yoda", idade: 900},
  {nome: "Chewbacca", idade: 200}
]

function App() {
  const [opcao, setOpcao] = useState(0)
  const [personagem, setPersonagem] = useState({})

  const onChangeOpcao = (event) =>{
    setOpcao(event.target.value)
  }

  useEffect(()=>{
    setPersonagem(personagens[opcao])
  },[opcao])

  return (
    <>
      <p>{personagem.nome} - {personagem.idade}</p>
      <select onChange={onChangeOpcao} value={opcao}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </>
  )
}

export default App
