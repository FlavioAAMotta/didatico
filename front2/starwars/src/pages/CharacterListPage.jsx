import React from "react";
import axios from "axios";
import styled from "styled-components";

const CharacterListPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CharacterListPageTitle = styled.h1`
  color: #ff0000;
`;

const CharacterListPageCharacter = styled.p`
  color: #0000ff;
  border: 1px solid #000000;
  width: 300px;
  padding: 10px;
  margin: 4px;
  cursor: pointer;
  &:hover {
    background-color: #96f155;
    color: #000000;
  }
`;

export class CharacterListPage extends React.Component {
  state = { characters: [] };

  getCharacters() {
    axios
      .get("https://swapi.py4e.com/api/people", {
        params: {
          page: 1,
        },
      })
      .then((response) => {
        this.setState({ characters: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCharacters();
  }

  render() {
    const renderedCharacters = this.state.characters.map((character) => {
      return (
        <div>
          <CharacterListPageCharacter
            key={character.name}
            onClick={() => this.props.goToDetailPage(character.url)}
          >
            {character.name}
          </CharacterListPageCharacter>
        </div>
      );
    });
    return (
      <CharacterListPageWrapper>
        <CharacterListPageTitle>CharacterListPage</CharacterListPageTitle>
        {renderedCharacters}
      </CharacterListPageWrapper>
    );
  }
}
