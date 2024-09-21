import React from 'react';
import Playlists from './pages/Playlists';
import Login from './pages/Login';

class App extends React.Component {
  state = {
    isAuthenticaded: false
  }

  onLogin = () => {
    this.setState({ isAuthenticaded: true })
  }

  render() {
    return (
      <>
        <h1>Spoticry</h1>
        {
          this.state.isAuthenticaded ? <Playlists /> : < Login onLogin={this.onLogin} />
        }
      </>
    )
  }

}

export default App;
