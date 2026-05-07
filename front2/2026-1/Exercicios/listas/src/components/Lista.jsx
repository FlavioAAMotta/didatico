import { useState } from "react"

export const Lista = () => {
    const [tarefa, setTarefa] = useState("")
    const [listaTarefa, setListaTarefa] = useState([])

    const onChangeTarefa = (event) => {
        setTarefa(event.target.value);
    }

    const criarTarefa = (event) => {
        event.preventDefault()
        const listaTarefaRenderizada = [...listaTarefa];
        listaTarefaRenderizada.push(tarefa);
        setListaTarefa(listaTarefaRenderizada)
    }

    const removerItem = (index) => {
        const listaTarefaRenderizada = [...listaTarefa];
        const listaFiltrada = listaTarefaRenderizada.filter((tarefaVetor, indice) => {
            return index != indice;
        })
        setListaTarefa(listaFiltrada)
    }

    return <>
        <h1>Lista</h1>
        <form onSubmit={criarTarefa}>
            <input onChange={onChangeTarefa} placeholder="Digite a tarefa" value={tarefa}></input>
            <button>Criar</button>
        </form>
        <div class="lista-container">
            {listaTarefa.map((tarefa, index) => {
                return <div key={index} className="item-container">
                    <p>{tarefa}</p>
                    <div className="remove" onClick={() => removerItem(index)}>X</div>
                </div>
            })}
        </div>
    </>
}