import { useState } from "react"

export const Lista  = () =>{
    const [tarefa, setTarefa] = useState("")
    const [listaTarefa, setListaTarefa] = useState([])

    const onChangeTarefa = (event) =>{
        setTarefa(event.target.value);
    }

    const criarTarefa = (event) =>{
        event.preventDefault()
        console.log("Criando tarefa")
        const listaTarefaRenderizada = [...listaTarefa];
        listaTarefaRenderizada.push(tarefa);
        setListaTarefa(listaTarefaRenderizada)
    }

    return <>
        <h1>Lista</h1>
        <form onSubmit={criarTarefa}>
            <input onChange={onChangeTarefa} placeholder="Digite a tarefa" value={tarefa}></input>
            <button>Criar</button>
            <div>
                {listaTarefa}
            </div>
        </form>
    </>
}