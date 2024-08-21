import React from 'react'

export class Inputs extends React.Component{
    state={
        nome:'',
        email:''
    }

    onChangeNome = (event) =>{
        this.setState({nome: event.target.value})
    }
    onChangeEmail = (event) =>{
        this.setState({email: event.target.value})
    }

    render(){
        return(
            <>
                <input type="text" onChange={this.onChangeNome} value={this.state.nome}></input>
                <input type="text" onChange={this.onChangeEmail} value={this.state.email}></input>
            </>
        )
    }
}