import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    state = {
        email: "",
        senha: ""
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    onChangeSenha = (e) => {
        this.setState({ senha: e.target.value })
    }

    onClickLogin = () => {
        const body = {
            email: this.state.email,
            password: this.state.senha
        }
        axios.post('https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/user/login', body)
            .then((response) => {
                localStorage.setItem("token", response.data.token)
            }).then(()=>{
                this.props.onLogin();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                <input
                    name='email'
                    onChange={this.onChangeEmail}
                    value={this.state.email}
                    placeholder='Email'
                    type='email'
                />
                <input
                    name='senha'
                    onChange={this.onChangeSenha}
                    value={this.state.senha}
                    placeholder='Senha'
                    type='password'
                />
                <button onClick={this.onClickLogin}>Logar</button>
            </>
        )
    }
}

export default Login