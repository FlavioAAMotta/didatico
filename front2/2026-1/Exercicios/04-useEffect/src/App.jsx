import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [select, setSelect] = useState(0)
  const [personagemSelecionado, setPersonagemSelecionado] = useState("")
  const personagens = [
    { nome: "Leia Organa", idade: 30 },
    { nome: "Chewbacca", idade: 200 },
    { nome: "Yoda", idade: 900 },
    { nome: "Jabba", idade: 604 },
  ]

  useEffect(() => {
    console.log("UseEffect Ativado")
  }, [])
  
  useEffect(() => {
    console.log(`${personagens[select].nome}`)
    setPersonagemSelecionado(personagens[select])
  }, [select])

  const changeSelect = (e) => {
    setSelect(Number(e.target.value))
  }

  return (
    <>
      <p>{personagemSelecionado.nome} - {personagemSelecionado.idade}</p>
      <select value={select} onChange={changeSelect}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </>
  )
}

export default App
