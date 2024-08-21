import React from 'react';

// Crie 3 inputs para inserir as informações
// de cartão de crédito(nome, número
// e código de segurança)

// Mostre na tela as informações digitadas pelo usuário


export class InputCartao extends React.Component {
    state={
        nome:'',
        numero:'',
        cvv:''
    }

    onChangeNome = (event) =>{
        this.setState({nome: event.target.value})
    }
    onChangeNumero = (event) =>{
        this.setState({numero: event.target.value})
    }
    onChangeCvv = (event) =>{
        this.setState({cvv: event.target.value})
    }

    // Crie um novo botão que, ao ser clicado,
    //  deve imprimir o valor dos inputs no 
    // console e limpar o valor de todos os 
    // campos

    botao = () =>{
        console.log(`
            nome: ${this.state.nome}
            numero: ${this.state.numero}
            cvv: ${this.state.cvv}
        `)

        this.setState({nome:''})
        this.setState({numero:''})
        this.setState({cvv:''})
    }

    render() {
        return (
            <>
                <input type='text' onChange={this.onChangeNome} value={this.state.nome}></input>
                <input type='text' onChange={this.onChangeNumero} value={this.state.numero}></input>
                <input type='text' onChange={this.onChangeCvv} value={this.state.cvv}></input>
                <p>{this.state.nome}</p>
                <h2>{this.state.numero}</h2>
                <h3>{this.state.cvv}</h3>
                <h3>{this.state.cvv}</h3>
                <button onClick={this.botao}>Botão</button>
            </>
        )
    }
}