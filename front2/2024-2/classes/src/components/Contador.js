import React from 'react';

export class Contador extends React.Component {
    state = {
        valorContador: 0,
        nomeUsuario: "Pedroca"
    }

    onClickSubtrai = () =>{
        this.setState({valorContador: this.state.valorContador-1})
    }

    onClickSoma = () =>{
        let valorAtual = this.state.valorContador;
        valorAtual++;
        this.setState({valorContador: valorAtual})
    }

    render() {
        return (
            <>
                <h2>Olá {this.state.nomeUsuario}</h2>
                <p>{this.state.valorContador}</p>
                <button onClick={this.onClickSoma}>+</button>
                <button onClick={this.onClickSubtrai}>-</button>
            </>
        )
    }
}