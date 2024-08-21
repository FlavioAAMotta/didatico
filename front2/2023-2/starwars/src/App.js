import { CharacterDetailPage } from "./pages/CharacterDetailPage";
import { CharacterListPage } from "./pages/CharacterListPage";
import React from "react";

export class App extends React.Component {
  state={
    currentPage: "list",
    url: ""
  };

  goToDetailPage = (url) =>{
    this.setState({currentPage: "detail", url});
  }

  goToListPage = () =>{
    this.setState({currentPage: "list"});
  }

  selectPage = () =>{
    switch(this.state.currentPage){
      case "list":
        return <CharacterListPage goToDetailPage={this.goToDetailPage}/>;
      case "detail":
        return <CharacterDetailPage url={this.state.url} goToListPage={this.goToListPage}/>;
      default:
        return <CharacterListPage goToDetailPage={this.goToDetailPage}/>;
    }
  }

  render() {
    return (
      <div>
        {this.selectPage()}
      </div>
    );
  }
}

export default App;
