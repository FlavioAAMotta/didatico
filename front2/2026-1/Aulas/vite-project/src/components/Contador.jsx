import {useState} from 'react'

export function Contador(){
    const [contador, setContador] = useState(0)
    const [passo, setPasso] = useState(1);

    const incrementar = () =>{
        setContador(contador + Number(passo));
    }
    
    const decrementar = () =>{
        let novoValor = contador - Number(passo);
        novoValor = novoValor < 0 ? 0 : novoValor;
        setContador(novoValor);
    }

    const alterarPasso = (e) =>{
        setPasso(e.target.value)
    }

    return <>
        <h2>Contador</h2>
        <p>{contador}</p>
        <select value={passo} onChange={alterarPasso}>
            <option name="" id="">1</option>
            <option name="" id="">2</option>
            <option name="" id="">5</option>
        </select>
        <button onClick={incrementar}>+</button>
        <button onClick={decrementar}>-</button>
    </>
}