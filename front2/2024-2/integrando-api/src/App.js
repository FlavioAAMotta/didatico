import axios from "axios";
import React from "react";
import {jwtDecode} from 'jwt-decode';


class App extends React.Component {
  state = {
    playlists: [],
    userId:'',
    songs:[],
    description:'',
    name:'',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxZTg2NzhlLWUyN2YtNDA0Zi1iM2FiLWI5YzJhYjk4ZWUzYiIsImlhdCI6MTcyNjcwMjM5OSwiZXhwIjoxNzI2NzA1OTM5fQ.r_yphJJvPUzG_-6_ojZeJEhxmQZib0WLjuMIH1dW9nw"
  };

  getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId; // Altere 'userId' para a chave correta dentro do seu payload
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  };

  componentDidMount() {
    axios
      .get(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist",
        {
          headers: {
            Authorization: this.state.token,
          },
        }
      )
      .then((res) => {
        this.setState({ playlists: res.data.playlists });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value});
  }

  onChangeDescription = (e) => {
    this.setState({description: e.target.value});
  }
  createPlaylist = () => {
    const userId = this.getUserIdFromToken(this.state.token);
    const body = {
      userId,
      songs: this.state.songs,
      description: this.state.description,
      name: this.state.name
    }

    axios.post(
      "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist",
      body,
      {
        headers: {
          Authorization: this.state.token
        }
      }
    ).then((resposta) => {
      console.log(resposta.data);
    })
    .catch((error) => {
      console.log(error.message);
    });

  }

  render() {
    const renderedList = this.state.playlists.map((playlist) => (
      <li key={playlist._id}>{playlist._name}</li>
    ));
    return (
      <>
        <h1>Playlists</h1>
        <input value={this.state.name} placeholder={"Nome"} name="name" onChange={this.onChangeName} />
        <input value={this.state.description} placeholder={"Descrição"} name="description" onChange={this.onChangeDescription} />
        <button onClick={this.createPlaylist}>Criar playlist</button>
        <ul>
          {renderedList}
        </ul>
      </>
    );
  }
}

export default App;
