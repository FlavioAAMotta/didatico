import React from "react";
import Playlists from "./pages/Playlists.js";
import Login from "./pages/Login.js";

class App extends React.Component {
  state = {
    authenticated: false,
  };

  login = () => {
    this.setState({ authenticated: true });
  };

  render() {
    return (
      <div>
        <h1>Spoticry</h1>
        {this.state.authenticated ? (
          <Playlists />
        ) : (
          <Login onLogin={this.login} />
        )}
      </div>
    );
  }
}

export default App;
