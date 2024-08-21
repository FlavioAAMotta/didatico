import './App.css';

function App() {
  const clique = () => {
    alert("Clicado");
  }
  return (
    <div className="App">
      <h1>Aprenda React</h1>
      <img src='https://picsum.photos/200/300' alt='img random' />
      <div>
        <a href='www.google.com'>Clique aqui para aprender</a>
      </div>
      <button onClick={clique}>Clique aqui</button>
    </div>
  );
}

export default App;
