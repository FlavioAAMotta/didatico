import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangeSenha = (e) => {
    this.setState({ senha: e.target.value });
  };

  logar = () => {
    const body = {
      email: this.state.email,
      password: this.state.senha,
    };
    console.log(body);
    axios
      .post(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/user/login",
        body
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
      })
      .then(() => {
        this.props.onLogin();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <>
        <h1>Login</h1>
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
        <input
          name="senha"
          type="password"
          value={this.state.senha}
          onChange={this.onChangeSenha}
          placeholder="Senha"
        />
        <br />
        <button onClick={this.logar}>Login</button>
      </>
    );
  }
}

export default Login;
