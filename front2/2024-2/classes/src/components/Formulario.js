import React from 'react';

export class Formulario extends React.Component{
    state ={
        nome: '',
        numero: "",
        cvv:""

    }
    
    onChangeNome = (event) =>{
        this.setState({nome: event.target.value})
    }
    onChangeNumero = (event) =>{
        this.setState({numero: event.target.value})
    }
    onChangeCVV = (event) =>{
        this.setState({cvv: event.target.value})
    }

    render(){
        return(
            <>
                <h2>Formulário!</h2>
                <p>Nome:</p><input name='nome' onChange={this.onChangeNome} value={this.state.nome} /><br />
                <p>Numero:</p><input name='numero' onChange={this.onChangeNumero} value={this.state.numero} /><br />
                <p>CVV:</p><input name='cvv' onChange={this.onChangeCVV} value={this.state.cvv} />

                <div>
                    <p>{this.state.nome}</p>
                    <p>{this.state.numero}</p>
                    <p>{this.state.cvv}</p>
                </div>
            </>
        )
    }
}