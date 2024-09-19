import React from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

class Playlists extends React.Component {
  state = {
    playlists: [],
    playlistName: "",
    playlistDescription: "",
  };

  getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId; // Altere 'userId' para a chave correta dentro do seu payload
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };

  onChangePlaylistName = (e) => {
    this.setState({ playlistName: e.target.value });
  };

  onChangePlaylistDescription = (e) => {
    this.setState({ playlistDescription: e.target.value });
  };

  cadastrarPlaylist = () => {
    const token = localStorage.getItem("token");
    const userId = this.getUserIdFromToken(token);
    const body = {
      songs: [],
      name: this.state.playlistName,
      description: this.state.playlistDescription,
      userId: userId,
    };
    axios.post(
      "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist",
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    ).then(() => {
        alert(`Playlist cadastrada com sucesso`)
    }).catch((e)=>{
        console.log(e)
    })
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/playlist",
        {
          headers: {
            Authorization: token,
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

  render() {
    const renderedPlaylists = this.state.playlists.map((playlist) => {
      return (
        <div key={playlist._id}>
          <p>nome: {playlist._name}</p>
          <p>descrição: {playlist._description}</p>
        </div>
      );
    });

    return (
      <>
        <h1>Cadastre sua playlist</h1>
        <input
          name="playlistName"
          type="text"
          value={this.state.playlistName}
          onChange={this.onChangePlaylistName}
          placeholder="Nome da playlist"
        />
        <input
          name="playlistDescription"
          type="text"
          value={this.state.playlistDescription}
          onChange={this.onChangePlaylistDescription}
          placeholder="Descrição da playlist"
        />
        <button onClick={this.cadastrarPlaylist}>Cadastrar</button>
        <h1>Playlists</h1>
        {renderedPlaylists}
      </>
    );
  }
}

export default Playlists;
