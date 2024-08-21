import React from "react";
import axios from "axios";

export class CharacterDetailPage extends React.Component {
  state = { character: {}, planet: "" };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.character !== prevState.character) {
      this.getPlanet();
    }
  }

  getCharacter = async () => {
    try {
      const response = await axios.get(this.props.url);
      this.setState({ character: response.data });
    } catch (error) {
      console.log(error.response);
    }
  };

  getPlanet = async () => {
    const delay = (duration) =>
      new Promise((resolve) => setTimeout(resolve, duration));
    try {
      const response = await axios.get(this.state.character.homeworld);
      await delay(2000);
      this.setState({ planet: response.data.name });
    } catch (error) {
      console.log(error.response);
    }
  };

  componentDidMount() {
    this.getCharacter();
  }

  render() {
    return (
      <div>
        <h1>CharacterDetailPage</h1>
        {this.state.character.name && this.state.planet ? (
          <div>
            <p>Nome: {this.state.character.name}</p>
            <p>Planeta: {this.state.planet}</p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <button onClick={this.props.goToListPage}>Voltar</button>
      </div>
    );
  }
}
