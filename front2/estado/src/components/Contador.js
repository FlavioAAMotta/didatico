import React from 'react';

export class Contador extends React.Component {
    state = {
        valorContador: 0
    }

    soma = () => {
        // Forma errada
        // this.state.valorContador = 1;

        const valorSomado = this.state.valorContador + 1;
        this.setState({ valorContador: valorSomado });
    }
    subtrai = () => {
        const valorSubtraido = this.state.valorContador - 1;
        this.setState({ valorContador: valorSubtraido });
    }

    render() {
        return (
            <div>
                <p>{this.state.valorContador}</p>
                <button onClick={this.soma}>Soma</button>
                <button onClick={this.subtrai}>Subtrai</button>
            </div>
        )
    }
}